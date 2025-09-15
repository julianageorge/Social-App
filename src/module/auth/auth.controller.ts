import { isValid } from './../../middleware/validation.middleware';
import { Router } from "express";
import authService from "./auth.service";
import * as authValidation from "./auth.validation";
const router=Router();
router.post("/register",isValid(authValidation.RegisterSchema),authService.register);
router.post("/verify",authService.verify);
router.post("/login",isValid(authValidation.LoginSchema),authService.login);


export default router;