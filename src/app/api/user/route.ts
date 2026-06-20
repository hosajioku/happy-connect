import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: {
      membership: { select: { plan: true, status: true } },
      _count: {
        select: {
          matchScores: true,
          notifications: { where: { read: false } },
          bookings: true,
        },
      },
    },
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json({
    ...user,
    password: undefined,
    matchesCount: user._count.matchScores,
    notificationsCount: user._count.notifications,
    bookingsCount: user._count.bookings,
    membership: user.membership?.plan || "FREE",
  });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (body.currentPassword && body.newPassword) {
    const isValid = await bcrypt.compare(body.currentPassword, user.password);
    if (!isValid) return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
    const hashed = await bcrypt.hash(body.newPassword, 12);
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashed },
    });
    return NextResponse.json({ message: "Password updated" });
  }

  return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
}
