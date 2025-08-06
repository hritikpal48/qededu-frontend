export type SignupPayload = {
    fname: string,
    lname: string,
    email: string,
    password: string,
    phoneNumber: string,
    countryCode: string,
    term_and_conditions: boolean
};

export type LoginPayload = {
    email: string,
    password: string
};

export type VerifyOtpPayload = {
    email: string,
    otp: string
}

export type ResendOtpPayload = {
    email: string,
    type: 1 | 2 | 3,
    resend: boolean
}

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
