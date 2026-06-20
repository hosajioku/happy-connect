import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const updated = await prisma.user.update({
    where: { email: session.user.email! },
    data: {
      name: body.name,
      phone: body.phone,
      gender: body.gender,
      dateOfBirth: body.dateOfBirth,
      country: body.country,
      state: body.state,
      city: body.city,
      occupation: body.occupation,
      about: body.about,
      lookingFor: body.lookingFor,
      hobbies: body.hobbies,
      religion: body.religion,
      willingToRelocate: body.willingToRelocate,
      preferredAgeMin: body.preferredAgeMin ? parseInt(body.preferredAgeMin) : null,
      preferredAgeMax: body.preferredAgeMax ? parseInt(body.preferredAgeMax) : null,
      preferredLocation: body.preferredLocation,
      relationshipGoal: body.relationshipGoal,
      photo: body.photo,
      onboardingComplete: true,
    },
  });

  return NextResponse.json({ message: "Profile updated", user: { id: updated.id, name: updated.name } });
}
