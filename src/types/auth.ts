export type SignupPayload = {
    fname: string,
    lname: string,
    email: string,
    country: string,
    phoneNumber: string,
    otp: string
};

export type LoginPayload = {
    email: string,
    password: string
};

export interface UserData {
    _id: string;
    fname: string;
    lname: string;
    role: number;
    email: string;
    countryCode: string;
    phoneNumber: string;
    isBlocked: boolean;
    isEmailVerified: boolean;
    status: number;
    createdAt: string;
    updatedAt: string;
    accessToken: string;
}
