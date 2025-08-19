export interface UserProfile {
  _id: string;
  fname: string;
  lname: string;
  role: number;
  email: string;
  dob:string;
  countryCode: string;
  phoneNumber: string;
  isBlocked: boolean;
  isEmailVerified: boolean;
  status: number;
  createdAt: string;
  updatedAt: string;
  expiresIn: string;
  otp: string;
  avatar?: string;
  name?: string;
  kycStatus?: number;
}

export interface UpdateAvatarPayload {
  avatar: File; // rename this property from 'image' to 'avatar'
}


export type updateUserProfileData ={
    fname: string;
  lname: string;
  email: string;
  dob:string;
}
