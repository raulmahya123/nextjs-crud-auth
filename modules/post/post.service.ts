import { PostRepository } from "./post.repository";

export class PostService {
  static getAll() {
    return PostRepository.findAll();
  }

  static async create(payload: any) {
    if (!payload.title || !payload.userId) {
      throw new Error("Invalid payload");
    }
    return PostRepository.create(payload);
  }

  static update(id: string, payload: any) {
    return PostRepository.update(id, payload);
  }

  static delete(id: string) {
    return PostRepository.delete(id);
  }
}
