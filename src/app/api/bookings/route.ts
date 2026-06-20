import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const bookings = await prisma.booking.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ bookings });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: { membership: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.membership?.plan !== "PREMIUM" || user.membership.status !== "ACTIVE") {
    return NextResponse.json({ error: "Premium membership required" }, { status: 403 });
  }

  const body = await req.json();
  const { preferredDate, preferredTime, notes } = body;

  if (!preferredDate || !preferredTime) {
    return NextResponse.json({ error: "Date and time are required" }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      userId: user.id,
      preferredDate,
      preferredTime,
      notes,
    },
  });

  return NextResponse.json({ booking, message: "Booking request submitted" });
}
