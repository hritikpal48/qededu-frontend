export interface KycResponse {
  message: string;
  statusCode: number;
  data: KycData;
}

export interface AadharDetails {
  fullName: string;
  aadharNo: string;
  gender: string;
  dob: string; // 'YYYY-MM-DD' format
  address: string;
  pincode: string;
  country: string;
  aadharFrontImage: string;
  aadharBackImage: string;
}
export interface BankDetails {
  name: string;
  accountNo: string;
  ifsc: string;
  bankName: string;
  branch: string;
  phone: string;
  address: string;
  district: string;
  country: string;
  bankImage: string;
}
export interface PanDetails {
  name: string;
  panNo: string;
  panImage: string;
}

export interface KycData {
  _id: string;
  userId: string;
  aadharDetails: AadharDetails;
  bankDetails: BankDetails;
  panDetails: PanDetails;
  status: number;
  createdAt: string;
  updatedAt: string;
}


export enum KYC_STATUS {
  APPROVED = 1,
  PENDING = 2,
  REJECTED = 3,
  SUBMITTED = 4,
  INPROGRESS = 5
}