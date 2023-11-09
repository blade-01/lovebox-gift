import axios from "axios";
import { ref } from "vue";
export function useGetter() {
  const data = ref("");
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
