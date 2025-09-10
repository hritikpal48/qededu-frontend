export interface FaqDataType {
  question:string,
  answer:string,
  category:"about" | "how-to-trade";
  _id:string
}

export interface FaqData {
  _id: string;
  description: string;
  title: string;
  image: string;
  faq: FaqDataType[];
}

export interface ProcessData {
  _id: string;
  title: string;
  description: string;
  image: string;
  image2: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaData {
  _id: string;
  heading: string;
  title: string;
  description: string;
  image: string;

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
  description?: string;
  youtube?: string;
}


export interface HomeData {
  _id: string;
  heading1: string;
  subTitle1: string;
  youtube: string;
  sectionh2: string;
  sectionh2Title?: string;
  sectionh2Desc?: string;
  sectionh3?: string;
  image?: string;
  image2?: string;
  sectionh4?: string;
  sectionh4Title?: string;
  sectionh5?: string;
  sectionh5Title?: string;
  sectionh6?: string;
}

interface InvestorResourceFaq {
  _id:string
  question:string,
  answer:string,
}

export interface InvResData {
  _id: string;
  description: string;
  faq: InvestorResourceFaq[];

}

export interface InvRelData {
  _id: string;
  description: string;
}
export interface UnlistedData {
  _id: string;
  heading: string;
  title: string;
  image: string;
}
export interface InvestorData {
  _id: string;
  heading: string;
  description: string;
}
