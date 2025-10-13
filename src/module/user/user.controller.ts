import { Router } from "express";
import userService from "./user.service";
import { isAuthenticated } from "../../middleware/auth.middlewae";
const router =Router();
router.get("/:id",userService.getProfile);
router.patch("/update-password",isAuthenticated(),userService.UpdatePassword);
router.patch("/update-basic-info",isAuthenticated(),userService.UpdateBasicInfo);
router.patch("/update-email",isAuthenticated(),userService.UpdateEmail);

router.post("/block-user/:userIdToBlock",isAuthenticated(),userService.BlockUser);
router.post("/unfriend/:freindId",isAuthenticated(),userService.unFriend);
router.post("/send-friend-request/:targetUserId",isAuthenticated(),userService.sendFreindRequest);
router.post("/accept-friend-request/:requestId",isAuthenticated(),userService.acceptFriendRequest);
router.post("/delete-friend-request/:requestId",isAuthenticated(),userService.deleteFriendRequest);

export default router;