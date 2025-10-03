import { Router } from "express";
import { isAuthenticated } from "../../middleware/auth.middlewae";
import commentService from "./comment.service";
const router=Router({mergeParams:true});
router.post("{/:id}",isAuthenticated(),commentService.create);
router.get("/:id",isAuthenticated(),commentService.getSpcific);
router.delete("/:id",isAuthenticated(),commentService.deleteComment);
export default router;