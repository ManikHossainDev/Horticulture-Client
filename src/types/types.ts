export interface LocateBusinessData {
  name: string;
  contactName: string;
  location: string;
  rating: number;
  photos: string[];
  buttons: string[];
}
export interface ISearchSectionProps {
  search: string;
  zipCode?: string;
  state?: string;
  name?: string;
}

export interface IErrorResponse {
  data: {
    statusCode: number;
    success: boolean;
    message: string;
    error: Array<{
      path: string;
      message: string;
    }>;
  };
}
