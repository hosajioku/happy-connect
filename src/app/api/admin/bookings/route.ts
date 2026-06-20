import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return NextResponse.json({ bookings });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { bookingId, status, meetingLink } = body;

  if (!bookingId) return NextResponse.json({ error: "Booking ID required" }, { status: 400 });

  const updateData: any = { status };
  if (meetingLink) updateData.meetingLink = meetingLink;

  const booking = await prisma.booking.update({
    where: { id: bookingId },
    data: updateData,
  });

  if (status === "CONFIRMED" && meetingLink) {
    const userBooking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true },
    });
    if (userBooking) {
      await prisma.notification.create({
        data: {
          userId: userBooking.userId,
          message: `Your matchmaking session has been confirmed! Join here: ${meetingLink}`,
          type: "BOOKING",
          link: meetingLink,
        },
      });
    }
  }

  return NextResponse.json({ booking, message: `Booking ${status.toLowerCase()}` });
}
