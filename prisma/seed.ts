import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "happy@happyconnect.com";
  const existing = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!existing) {
    const hashedPassword = await bcrypt.hash("Admin123!", 12);
    const admin = await prisma.user.create({
      data: {
        name: "Happy Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
        emailVerified: true,
        onboardingComplete: true,
        gender: "Female",
        country: "Nigeria",
        relationshipGoal: "Marriage",
      },
    });

    await prisma.membership.create({
      data: {
        userId: admin.id,
        plan: "PREMIUM",
        status: "ACTIVE",
      },
    });

    await prisma.contentBlock.createMany({
      data: [
        { page: "home", key: "home-hero-title", content: "Find Your Perfect Match" },
        { page: "home", key: "home-hero-subtitle", content: "Connecting Serious Singles for Meaningful Relationships" },
        { page: "home", key: "pricing-free-desc", content: "Get started with basic features" },
        { page: "home", key: "pricing-premium-desc", content: "Unlock premium matchmaking" },
        { page: "home", key: "about-mission", content: "To provide a trusted platform where serious singles can find compatible partners." },
        { page: "home", key: "about-vision", content: "To become Africa's most trusted matchmaking platform." },
        { page: "home", key: "announcement", content: "Welcome to Happy Connect!" },
      ],
    });

    console.log("Admin user and content created!");
  } else {
    console.log("Admin user already exists.");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
