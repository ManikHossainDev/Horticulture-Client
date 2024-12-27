export interface ICompanyLocation {
  latitude: number;
  longitude: number;
}

export interface ICompanyInformation {
  companyDescription?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
}

export interface IAuthorId {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  image: string;
  phoneNumber?: string;
}

export interface ICompany {
  _id: string;
  companyName: string;
  companyLocation: ICompanyLocation;
  companyInformation: ICompanyInformation;
  authorId: IAuthorId;
  companyAbout: string;
  companyImages: string[];
  avgRating: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
