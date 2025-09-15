import CryptoJS from "crypto-js";
export const encryption=(phone:string,secreKey:string)=>{
    return CryptoJS.AES.encrypt(phone,secreKey).toString();
}
export const decryptPhone=(encryptedPhone:string,secretKey:string)=> {
 return CryptoJS.AES.decrypt(encryptedPhone,secretKey);

}
