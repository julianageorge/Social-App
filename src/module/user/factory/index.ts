import { encryption } from "../../../utils/crypto";
import { User } from "../../auth/entity";
import { UpdateBasicInfoDto } from "../user.dto";


export class UserFactory {
  UpdateBasicInfo(updateBasicInfoDto: UpdateBasicInfoDto) {
    const user = new User();

    if (updateBasicInfoDto.fullName) 
    {
      user.fullName = updateBasicInfoDto.fullName;
    }
    if (updateBasicInfoDto.gender ) {
      user.gender = updateBasicInfoDto.gender;
    }
   
    if (updateBasicInfoDto.phoneNumber) {
      user.phonrNumber = encryption(updateBasicInfoDto.phoneNumber,process.env.SECRET_KEY as string);
    }

   
    if (updateBasicInfoDto.email) {
        user.email = updateBasicInfoDto.email;
    }

    return user;
  }
}
