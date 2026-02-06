import { withAuth } from "@/app/lib/auth-middleware";
import { PostService } from "@/modules/post/post.service";
import { success } from "@/app/lib/response";

// handler INTERNAL (nama bebas)
async function handleGET() {
  const posts = await PostService.getAll();
  return success(posts);
}

async function handlePOST(req: Request) {
  const body = await req.json();
  const post = await PostService.create(body);
  return success(post, 201);
}

// export WAJIB pakai GET / POST
export const GET = withAuth(handleGET);
export const POST = withAuth(handlePOST);
