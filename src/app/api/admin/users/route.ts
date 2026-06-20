import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      membership: { select: { plan: true, status: true } },
    },
  });

  const stats = {
    totalUsers: users.length,
    premiumUsers: users.filter((u) => u.membership?.plan === "PREMIUM").length,
    totalMatches: await prisma.matchScore.count(),
    pendingBookings: await prisma.booking.count({ where: { status: "PENDING" } }),
  };

  return NextResponse.json({
    users: users.map((u) => ({ ...u, password: undefined })),
    stats,
  });
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "User ID required" }, { status: 400 });

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ message: "User deleted" });
}
