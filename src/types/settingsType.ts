export interface FaqData {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProcessData {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaData {
  _id: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingData {
  _id: string;
  logo: string | null;
  phoneNo: string;
  email: string;
  address: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  telegram?: string;
  instagram?: string;
}
