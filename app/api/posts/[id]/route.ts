import { withAuth } from "@/app/lib/auth-middleware";
import { PostService } from "@/modules/post/post.service";
import { success } from "@/app/lib/response";

// handler INTERNAL (nama bebas)
async function handlePUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const post = await PostService.update(params.id, body);
  return success(post);
}

async function handleDELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  await PostService.delete(params.id);
  return success(true);
}

// export HARUS pakai PUT / DELETE
export const PUT = withAuth(handlePUT);
export const DELETE = withAuth(handleDELETE);
