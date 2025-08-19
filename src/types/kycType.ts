export interface KycResponse {
  message: string;
  statusCode: number;
  data: KycData;
}

// export interface KycData {
//   fullName: string;
//   aadharNo: string;
//   gender: string;
//   dob: string;
//   _id: string;
//   userId: string;
//   aadharDetails: AadharDetails;
//   bankDetails: BankDetails;
//   panDetails: PanDetails;
//   status: number;
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
//   __v: number;
//   address: string;
//   pincode: string;
//   country: string;
//   aadharFrontImage: string;
//   aadharBackImage: string;
// }
export interface KycData {
  fullName: string;
  aadharNo: string;
  gender: string;
  dob: string;
  address: string;
  pincode: string;
  country: string;
  state: string; // add this
  panNo: string;
  panName: string; // add this
  bankName: string;
  accountNo: string;
  ifsc: string;
  branch: string;
  bankAddress: string;
  phone: string;
  district: string;
  bankCountry: string;
  bankState: string; // add this
  frontImage?: string;
  backImage?: string;
  panImage?: string;
  bankProof?: string;
  aadharFrontImage: string;
  aadharBackImage: string;
}

export interface AadharDetails {
  fullName: string;
  aadharNo: string;
  gender: string;
  dob: string; // 'YYYY-MM-DD' format
  address: string;
  pincode: string;
  country: string;
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
}

export interface AadharDetails {
  fullName: string;
  aadharNo: string;
  gender: string;
  dob: string;
  address: string;
  state?: string;
  pincode: string;
  country: string;
  aadharFrontImage?: string;
  aadharBackImage?: string;
}

export interface BankDetails {
  name: string;
  accountNo: string;
  ifsc: string;
  bankName: string;
  branch: string;
  address: string;
  phone: string;
  district: string;
  country: string;
  state?: string;
}

export interface PanDetails {
  name: string;
  panNo: string;
  panImage?: string;
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
