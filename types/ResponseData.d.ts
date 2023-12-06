export interface ResponseData {
  // Define the structure of your order details here
  id: string;
  isAnonymous: boolean;
  billDetails: {
    type: string;
    amount: number;
    group: string;
  };
  senderName: string;
  productDetails: {
    id: string;
    name: string;
    slug: string;
    tags: {
      id: number;
      name: string;
      slug: string;
    }[];
    type: string;
    price: string;
    images: {
      alt: string;
      src: string;
    }[];
  }[];
  status: string;
  notes: string | null;
  hasDelivery: boolean;
  // ... other properties
}
