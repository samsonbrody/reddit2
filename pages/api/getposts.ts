import { post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const posts = await prisma.post.findMany();
  console.log(posts);
  res.status(200).json(posts);
}
