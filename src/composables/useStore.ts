import { ResponseData } from "./../../types/ResponseData.d";
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

export function useStore() {
  const baseURL = "https://sandbox-api.lovebox.africa/api/v1";
  const data = ref<ResponseData>(); // Specify the type of data
  // router
  const router = useRouter();
  const isLoading = ref<boolean>(false);

  const getOrderDetails = async (id: any) => {
    try {
      isLoading.value = true;
      const response = await axios.get(`${baseURL}/orders/${id}`);
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
      const response = await axios.post(`${baseURL}/review-order`, review);
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
