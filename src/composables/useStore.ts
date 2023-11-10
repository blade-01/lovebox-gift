import axios from "axios";
import { ref } from "vue";

interface responseData {
  // Define the structure of your order details here
  isAnonymous: boolean;
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
  }[];
  // ... other properties
}

export function useStore() {
  const data = ref<responseData>(); // Specify the type of data

  const getOrderDetails = async () => {
    try {
      const response = await axios.get(
        "https://core-api-katg.onrender.com/api/v1/orders/205e1ce3-52b7-442f-910b-6c7f0d79b05f"
      );
      data.value = response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const postReviews = async () => {
    try {
      const response = await axios.post(
        "https://core-api-katg.onrender.com/api/v1/review-order"
      );
      data.value = response.data.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    getOrderDetails,
    postReviews,
    data,
  };
}
