import { Schema } from "mongoose";
import { IUser } from "../../../utils/common/interface";
import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { sendmail } from "../../../utils/email";


export const userSchema=new Schema<IUser>({

    
        firstName:{type:String,minLength:2,maxLength:20,required:true,trim:true},
        lastName:{type:String,minlength:2,maxLength:20,required:true,trim:true},
        email:{type:String,required:true,trim:true,lowercase:true,unique:true},
        password:{type:String,required:function(){
            if(this.userAgent==USER_AGENT.google){
                return false;
            }
            return true;

        },min:6},
        credentialUpdatedAt:Date,
        phonrNumber:String,
        role:{type:Number,enum:SYS_ROLE,default:SYS_ROLE.user},
        gender:{type:Number,enum:GENDER,default:GENDER.male},
        userAgent:{type:Number,enum:USER_AGENT,default:USER_AGENT.local},
        otp:{type:String},
        otpExpiryAt:{type:Date},
        isVerived:{type:Boolean,default:false},
        blockedUsers: [{ type: Schema.Types.ObjectId, ref: "User" }], 
        friends: [{ type: Schema.Types.ObjectId, ref: "User" }],      
        friendRequests: [{ type: Schema.Types.ObjectId, ref: "User" }] 

},
{timestamps:true,toJSON:{virtuals:true},toObject:{virtuals:true}});
userSchema.virtual("fullName").get(function(){
    return this.firstName +" "+ this.lastName;
}).set(function(value:string){
    const[fName,lName]=value.split(" ");
    this.firstName=fName as string;
    this.lastName=lName as string;

});
userSchema.pre("save",async function (next){
    if(this.userAgent!=USER_AGENT.google&&this.isNew==true){
    await sendmail({to:this.email,subject:"Verify your email",html:`<p>your Otp to verify your account is ${this.otp}</p>`});
}
})