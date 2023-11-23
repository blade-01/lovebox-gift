import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

interface responseData {
  // Define the structure of your order details here
  id: string;
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
  notes: string | null;
  hasDelivery: boolean;
  // ... other properties
}

export function useStore() {
  const data = ref<responseData>(); // Specify the type of data
  // router
  const router = useRouter();
  const isLoading = ref<boolean>(false);

  const getOrderDetails = async () => {
    try {
      isLoading.value = true;
      const response = await axios.get(
        "https://core-api-katg.onrender.com/api/v1/orders/205e1ce3-52b7-442f-910b-6c7f0d79b05f"
      );
      data.value = response.data.data;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
    }
  };

  const postReviews = async (review: object) => {
    try {
      isLoading.value = true;
      const response = await axios.post(
        "https://core-api-katg.onrender.com/api/v1/review-order",
        review
      );
    } catch (error) {
      return Promise.reject(error);
    } finally {
      isLoading.value = false;
      router.push({
        path: "/thanks"
      });
    }
  };

  return {
    getOrderDetails,
    postReviews,
    isLoading,
    data
  };
}
