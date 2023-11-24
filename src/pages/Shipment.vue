<template>
  <div>
    <div v-if="isLoading === true">
      <loader />
    </div>
    <div
      class="w-full h-full lg:h-screen mt-8 lg:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
    >
      <div class="container">
        <router-link to="/">
          <img
            class="mx-auto mb-3 w-auto relative z-[9999]"
            src="/img/logo.svg"
            alt="logo"
        /></router-link>
        <div class="p-0.5 relative z-[9999]">
          <div
            class="flex flex-col items-center place-content-center m-auto bg-secBg shadow-xl rounded-3xl py-8 px-5 md:w-[488px] drop-shadow"
          >
            <div class="w-full">
              <div class="progress-bar">
                <div class="progress" :style="{ width: `${progress}%` }"></div>
              </div>
              <h1
                class="font-semibold text-center text-lg md:text-4xl text-black tracking-wide"
              >
                Lovebox Details
              </h1>
              <div class="text-center flex flex-col gap-2 my-10">
                <img
                  class="mx-auto"
                  src="/img/lovebox-sender.svg"
                  alt="lovebox-sender"
                />
                <div
                  v-if="isAnonymous === false"
                  class="text-center flex flex-col gap-2"
                >
                  <h1 class="text-2xl font-semibold leading-8 text-priBlack">
                    Correct! Thoughtfully sent by
                  </h1>
                  <p class="text-priGray text-lg leading-6 capitalize">
                    “{{ senderName }}”
                  </p>
                </div>
                <p
                  class="font-medium text-base leading-5"
                  v-if="notes !== null"
                >
                  You've got a note from the sender,
                  <span
                    class="text-main underline cursor-pointer"
                    @click="viewNote"
                    >view</span
                  >
                </p>
              </div>
              <div class="grid grid-cols-1 gap-3">
                <div class="flex justify-between items-center">
                  <p class="text-priBlack text-sm font-bold">
                    What is in your package.
                  </p>
                  <div
                    v-if="productDetails !== null"
                    class="flex gap-1 items-center"
                  >
                    <img src="/img/trash.svg" alt="trash" />
                    <p class="text-priGray text-sm font-medium">
                      {{ productDetails?.length }} Packages
                    </p>
                  </div>
                </div>
                <div
                  class="grid grid-cols-3 place-items-center border-[1px] border-priGray rounded-lg py-2 px-4 md:py-3 md:px-6"
                  v-for="(product, index) in productDetails"
                  :key="index"
                >
                  <div class="text-center mr-auto pr-2 md:pr-0 py-2">
                    <p class="text-sm text-priBlack font-semibold capitalize">
                      {{ product?.type }}
                    </p>
                    <!-- <p class="text-[12px] text-priGray capitalize">Dummy Text</p> -->
                  </div>
                  <div
                    class="text-center border-x-[1px] border-priGray px-2 md:px-5 py-2"
                  >
                    <p class="text-sm text-priBlack font-semibold uppercase">
                      {{ formatNumber(product?.price) }} NGN
                    </p>
                    <!-- <p class="text-[12px] text-priGray capitalize">Any Store</p> -->
                  </div>
                  <div class="text-center ml-auto pl-2 md:pl-0 py-2">
                    <p class="text-sm text-priBlack font-semibold">
                      {{ product?.name }}
                    </p>
                    <!-- <p class="text-[12px] text-priGray capitalize">Dummy Text</p> -->
                  </div>
                </div>
                <div
                  class="grid grid-cols-3 place-items-center border-[1px] border-priGray rounded-lg py-2 px-4 md:py-3 md:px-6"
                >
                  <div class="text-center mr-auto pr-2 md:pr-0 py-2">
                    <p class="text-sm text-priBlack font-semibold capitalize">
                      {{ billDetails?.group }}
                    </p>
                    <!-- <p class="text-[12px] text-priGray capitalize">Dummy Text</p> -->
                  </div>
                  <div
                    class="text-center border-x-[1px] border-priGray px-2 md:px-5 py-2"
                  >
                    <p class="text-sm text-priBlack font-semibold uppercase">
                      {{ billDetails?.amount }} NGN
                    </p>
                    <!-- <p class="text-[12px] text-priGray capitalize">Any Store</p> -->
                  </div>
                  <div class="text-center ml-auto pl-2 md:pl-0 py-2">
                    <p class="text-sm text-priBlack font-semibold">
                      {{ billDetails?.type }}
                    </p>
                    <!-- <p class="text-[12px] text-priGray capitalize">Dummy Text</p> -->
                  </div>
                </div>
                <div
                  v-if="status === 'completed'"
                  class="btn border-[1px] border-main flex gap-1 items-center bg-white rounded-3xl h-[45px] mt-3 w-[95%] mx-auto hover:bg-main text-main hover:text-white"
                  @click="handleRatings"
                >
                  <p class="font-semibold text-center text-lg capitalize">
                    Rate us
                  </p>
                  <img src="/img/star.svg" alt="star" />
                </div>
                <div v-else class="pt-6 text-center">
                  <p class="leading-6 font-medium text-base text-center">
                    To track your package click
                    <router-link
                      :to="{
                        path: '/details',
                        query: { id: $route.query.id },
                      }"
                      class="text-main underline font-bold cursor-pointer"
                      >here.</router-link
                    >
                  </p>
                  <p class="text-base" v-if="hasDelivery === true">
                    Tracking Number:
                    <span class="font-bold text-[#2A3538]">N/A</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="text-center pt-4">
            <a
              href="https://www.lovebox.africa"
              target="_blank"
              class="text-main font-bold text-sm underline cursor-pointer"
            >
              www.lovebox.africa
            </a>
          </div>
        </div>
      </div>
      <animate-circle-bg />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../composables/useStore";
import { useFormatter } from "../composables/useFormatter";

// use formatter for number
const { formatNumber, formatCurrency } = useFormatter();
// get order details and data from store
const { getOrderDetails, data, isLoading } = useStore();
const isAnonymous = computed(() => {
  return data.value?.isAnonymous;
});
const senderName = computed(() => {
  return data.value?.senderName;
});
const productDetails = computed(() => {
  return data.value?.productDetails;
});
const notes = computed(() => {
  return data.value?.notes;
});
const hasDelivery = computed(() => {
  return data.value?.hasDelivery;
});
const status = computed(() => {
  return data.value?.status;
});
const billDetails = computed(() => {
  return data.value?.billDetails;
});

// home rating
const route = useRoute();
const router = useRouter();
const handleDetails = () => {
  router.push({
    path: "/details",
    query: {
      id: route.query.id,
    },
  });
};
const handleRatings = () => {
  router.push({
    path: "/rating",
    query: {
      id: route.query.id,
    },
  });
};
// navigate to note route
const viewNote = () => {
  router.push({
    path: "/note",
  });
};

const progress = ref(100);

// Cleanup when component is unmounted
onMounted(() => {
  getOrderDetails(route.query.id);
});
</script>

<style scoped>
.animation-container {
  @apply absolute w-[600px] md:w-[1000px] h-[600px] md:h-[900px] flex items-center place-content-center;
}
.circle {
  @apply w-full h-full rounded-[50%] bg-cover transition-[backgroud-image_1s];
}

.progress-bar {
  @apply h-1  bg-primary border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] mx-auto my-[20px];
}
.progress {
  @apply h-full bg-[#644AE2];
}
.box {
}
</style>
