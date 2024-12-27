export interface ISubscription {
  _id: string;
  name: string;
  duration: number;
  price: number;
  maxListings: number;
  benefits: string[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
