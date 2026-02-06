import { prisma } from "@/app/lib/prisma";

export class PostRepository {
  static findAll() {
    return prisma.post.findMany({
      include: { user: true },
    });
  }

  static findById(id: string) {
    return prisma.post.findUnique({ where: { id } });
  }

  static create(data: {
    title: string;
    content: string;
    userId: string;
  }) {
    return prisma.post.create({ data });
  }

  static update(
    id: string,
    data: { title?: string; content?: string }
  ) {
    return prisma.post.update({
      where: { id },
      data,
    });
  }

  static delete(id: string) {
    return prisma.post.delete({ where: { id } });
  }
}
