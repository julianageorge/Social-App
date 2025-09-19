
import { UserRepository } from "../../../DB";
import { BadRequestException, NotFoundException } from "../../../utils";
import { VerifyDto } from "../auth.dto";

export const authProvider={
    async checkOtp(verifydto:VerifyDto){
        const userRepository=new UserRepository();
        const user=await userRepository.exist({email:verifydto.email});
                if(!user){
                    throw new NotFoundException("User Not Found!");
                }
             if(user.isVerived){
                    throw new BadRequestException("User already verified")
                }
                 if (user.otp !== verifydto.otp) {
              throw new BadRequestException("Invalid OTP");
            }
        
            if ( user.otpExpiryAt! < new Date()) {
              throw new BadRequestException("OTP expired");
            }
    }

}