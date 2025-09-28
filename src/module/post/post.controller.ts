import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middlewae";
import postService from "./post.service";
import { CommentRouter } from "..";
const router=Router();
router.use("/:postId/comment",CommentRouter);
router.post("/",isAuthenticated(),postService.create);
router.patch("/:id",isAuthenticated(),postService.addReaction);
router.get("/:id",isAuthenticated(),postService.getSpcificPost);

export default router;