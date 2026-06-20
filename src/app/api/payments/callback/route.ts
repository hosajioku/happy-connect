import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");
  const status = searchParams.get("status");

  if (!reference) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/upgrade?error=no_reference`);

  if (status === "success" || status === "completed") {
    const payment = await prisma.payment.findUnique({ where: { reference } });
    if (payment && payment.status === "PENDING") {
      await prisma.payment.update({
        where: { reference },
        data: { status: "APPROVED" },
      });
      await prisma.membership.upsert({
        where: { userId: payment.userId },
        update: { plan: "PREMIUM", status: "ACTIVE" },
        create: { userId: payment.userId, plan: "PREMIUM", status: "ACTIVE" },
      });
    }
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/dashboard?upgrade=success`);
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/upgrade?error=failed`);
}

export async function POST(req: Request) {
  const body = await req.json();
  const reference = body.data?.reference;
  const paystackStatus = body.data?.status;

  if (paystackStatus === "success" && reference) {
    const payment = await prisma.payment.findUnique({ where: { reference } });
    if (payment && payment.status === "PENDING") {
      await prisma.payment.update({
        where: { reference },
        data: { status: "APPROVED" },
      });
      await prisma.membership.upsert({
        where: { userId: payment.userId },
        update: { plan: "PREMIUM", status: "ACTIVE" },
        create: { userId: payment.userId, plan: "PREMIUM", status: "ACTIVE" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
