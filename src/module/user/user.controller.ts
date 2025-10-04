import { Router } from "express";
import userService from "./user.service";
import { isAuthenticated } from "../../middleware/auth.middlewae";
const router =Router();
router.get("/:id",userService.getProfile);
router.patch("/update-password",isAuthenticated(),userService.UpdatePassword);
router.patch("/update-basic-info",isAuthenticated(),userService.UpdateBasicInfo);
router.patch("/update-email",isAuthenticated(),userService.UpdateEmail);

export default router;