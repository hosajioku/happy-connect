import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateCompatibility } from "@/lib/matching";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { membership: { select: { plan: true } } },
  });

  return NextResponse.json({ users: users.map((u) => ({ ...u, password: undefined })) });
}

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const users = await prisma.user.findMany();

  let count = 0;
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const userA = users[i];
      const userB = users[j];

      const { score, factors } = calculateCompatibility(userA, userB);

      await prisma.matchScore.upsert({
        where: {
          userId_matchedUserId: {
            userId: userA.id,
            matchedUserId: userB.id,
          },
        },
        update: { score, factors: JSON.stringify(factors) },
        create: {
          userId: userA.id,
          matchedUserId: userB.id,
          score,
          factors: JSON.stringify(factors),
        },
      });

      await prisma.matchScore.upsert({
        where: {
          userId_matchedUserId: {
            userId: userB.id,
            matchedUserId: userA.id,
          },
        },
        update: { score, factors: JSON.stringify(factors) },
        create: {
          userId: userB.id,
          matchedUserId: userA.id,
          score,
          factors: JSON.stringify(factors),
        },
      });

      count++;
    }
  }

  return NextResponse.json({ message: `Generated ${count} match scores for all users` });
}
