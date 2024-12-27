export interface ISize {
  _id: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
  price: number;
  colors: string[];
}

// Interface for the Product
export interface IProduct {
  _id: string;
  productName: string;
  productDescription: string;
  productImages: string[];
  sizes: ISize[];
  category: string;
  avgReview: number;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
