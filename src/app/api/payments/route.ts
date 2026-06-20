import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_PUBLIC = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { plan } = body;

  if (plan !== "PREMIUM") {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    include: { membership: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user.membership?.plan === "PREMIUM" && user.membership.status === "ACTIVE") {
    return NextResponse.json({ error: "Already a premium member" }, { status: 400 });
  }

  const amount = 9999;
  const reference = `HC-${Date.now()}-${user.id.slice(0, 8)}`;

  await prisma.payment.create({
    data: {
      userId: user.id,
      amount,
      reference,
      plan: "PREMIUM",
      status: "PENDING",
      gateway: "PAYSTACK",
    },
  });

  if (!PAYSTACK_SECRET || PAYSTACK_SECRET === "sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx") {
    await prisma.payment.update({
      where: { reference },
      data: { status: "APPROVED" },
    });
    await prisma.membership.upsert({
      where: { userId: user.id },
      update: { plan: "PREMIUM", status: "ACTIVE", startDate: new Date() },
      create: { userId: user.id, plan: "PREMIUM", status: "ACTIVE", startDate: new Date() },
    });
    return NextResponse.json({ message: "Mock payment successful (no Paystack key configured)" });
  }

  try {
    const paystackRes = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        amount: amount * 100,
        reference,
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/payments/callback`,
        metadata: {
          userId: user.id,
          plan: "PREMIUM",
        },
      }),
    });

    const data = await paystackRes.json();
    if (!data.status) throw new Error(data.message || "Paystack error");

    return NextResponse.json({ authorization_url: data.data.authorization_url, reference });
  } catch (error) {
    console.error("Paystack error:", error);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
