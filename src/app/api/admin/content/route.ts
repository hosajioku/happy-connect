import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const blocks = await prisma.contentBlock.findMany();
  const content: Record<string, string> = {};
  blocks.forEach((b) => { content[b.key] = b.content; });

  return NextResponse.json({ content });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const admin = await prisma.user.findUnique({ where: { email: session.user.email! } });
  if (admin?.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const { content } = body;

  if (!content || typeof content !== "object") {
    return NextResponse.json({ error: "Content object required" }, { status: 400 });
  }

  for (const [key, value] of Object.entries(content)) {
    await prisma.contentBlock.upsert({
      where: { page_key: { page: "home", key } },
      update: { content: value as string },
      create: { page: "home", key, content: value as string },
    });
  }

  return NextResponse.json({ message: "Content updated" });
}
