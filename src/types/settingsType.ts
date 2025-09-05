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

export interface AboutResponse {
  _id: string;
  description: string;
  history: string;
  history2?: string;
  summary: string;
  summary2?: string;
  summary3?: string;
  image1?: string;
  image2?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SettingData {
  _id: string;
  logo: string;
  phoneNo: string;
  email: string;
  address: string;
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  telegram?: string;
  instagram?: string;
}
