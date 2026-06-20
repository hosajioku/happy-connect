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

  const matchScores = await prisma.matchScore.findMany({
    where: { userId: user.id },
    orderBy: { score: "desc" },
    take: 20,
    include: {
      matchedUser: {
        select: {
          id: true,
          name: true,
          photo: true,
          dateOfBirth: true,
          country: true,
          state: true,
          occupation: true,
          about: true,
          hobbies: true,
          religion: true,
          lookingFor: true,
          gender: true,
        },
      },
    },
  });

  const matches = matchScores.map((m) => {
    const matchedUser = m.matchedUser;
    let age: number | undefined;
    if (matchedUser.dateOfBirth) {
      const birth = new Date(matchedUser.dateOfBirth);
      const today = new Date();
      age = today.getFullYear() - birth.getFullYear();
      const monthDiff = today.getMonth() - birth.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age--;
    }

    return {
      id: m.id,
      score: m.score,
      factors: JSON.parse(m.factors || "{}"),
      matchedUser: {
        ...matchedUser,
        age: age || undefined,
      },
    };
  });

  return NextResponse.json({ matches });
}
