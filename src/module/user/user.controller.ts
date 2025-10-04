import { Router } from "express";
import userService from "./user.service";
import { isAuthenticated } from "../../middleware/auth.middlewae";
const router =Router();
router.get("/:id",userService.getProfile);
router.patch("/update-password",isAuthenticated(),userService.UpdatePassword);

export default router;