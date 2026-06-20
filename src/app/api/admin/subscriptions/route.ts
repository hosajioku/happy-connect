import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const payments = await prisma.payment.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return NextResponse.json({ payments });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { paymentId, status } = body;

  if (!paymentId) return NextResponse.json({ error: "Payment ID required" }, { status: 400 });

  const payment = await prisma.payment.findUnique({ where: { id: paymentId } });
  if (!payment) return NextResponse.json({ error: "Payment not found" }, { status: 404 });

  if (status === "APPROVED") {
    await prisma.payment.update({ where: { id: paymentId }, data: { status: "APPROVED" } });
    await prisma.membership.upsert({
      where: { userId: payment.userId },
      update: { plan: "PREMIUM", status: "ACTIVE" },
      create: { userId: payment.userId, plan: "PREMIUM", status: "ACTIVE" },
    });
  }

  return NextResponse.json({ message: `Payment ${status.toLowerCase()}` });
}
