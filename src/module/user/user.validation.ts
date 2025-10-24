import { z } from "zod";
import { GENDER } from "../../utils";

export const updateBasicInfoSchema = z.object({
    fullName: z.string().min(2, "Full name too short").optional(),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().optional(),
    gender: z.nativeEnum(GENDER),
  });


  export type UpdateBasicInfoDto = z.infer<typeof updateBasicInfoSchema>;

