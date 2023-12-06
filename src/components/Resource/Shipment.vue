<template>
  <div v-if="data">
    <div
      class="w-full h-full md:h-screen mt-8 md:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
    >
      <div class="container">
        <router-link :to="`/order/${id}`">
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
                <img class="mx-auto" src="/img/lovebox-sender.svg" alt="lovebox-sender" />
                <!-- v-if="isAnonymous === false" -->
                <div class="text-center flex flex-col gap-2">
                  <h1 class="text-2xl font-semibold leading-8 text-priBlack">
                    Correct! Thoughtfully sent by
                  </h1>
                  <p class="text-priGray text-lg leading-6 capitalize">
                    “{{ senderName }}”
                  </p>
                </div>
                <p class="font-medium text-base leading-5" v-if="notes !== null">
                  You've got a note from the sender,
                  <span class="text-main underline cursor-pointer" @click="viewNote"
                    >view</span
                  >
                </p>
              </div>
              <div class="grid grid-cols-1 gap-3">
                <div class="flex justify-between items-center">
                  <p class="text-priBlack text-sm font-bold">What is in your package.</p>
                  <div v-if="productDetails !== null" class="flex gap-1 items-center">
                    <img src="/img/trash.svg" alt="trash" />
                    <p class="text-priGray text-sm font-medium">
                      {{ productDetails?.length }} Packages
                    </p>
                  </div>
                </div>
                <div v-if="productDetails !== null">
                  <div
                    class="flex justify-between items-center border-[1px] border-priGray rounded-lg py-2"
                    v-for="(product, index) in productDetails"
                    :key="index"
                  >
                    <div class="basis-[50%]">
                      <p
                        class="text-sm text-center text-priBlack font-semibold capitalize"
                      >
                        <span class="lg:hidden">
                          {{ truncateText(product?.name, 15) }}
                        </span>
                        <span class="hidden lg:block">{{
                          truncateText(product?.name, 20)
                        }}</span>
                      </p>
                    </div>
                    <div class="text-center border-l-[1px] border-priGray basis-[50%]">
                      <p class="text-sm text-priBlack font-semibold uppercase">
                        {{ formatNumber(product?.price) }} NGN
                      </p>
                    </div>
                  </div>
                </div>
                <div
                  v-if="billDetails !== null"
                  class="flex justify-between items-center border-[1px] border-priGray rounded-lg py-2"
                >
                  <div class="basis-[33.33%]">
                    <p class="text-sm text-center text-priBlack font-semibold capitalize">
                      {{ billDetails?.group }}
                    </p>
                  </div>
                  <div class="text-center border-x-[1px] border-priGray basis-[33.33%]">
                    <p class="text-sm text-priBlack font-semibold uppercase">
                      {{ billDetails?.amount }} NGN
                    </p>
                  </div>
                  <div class="basis-[33.33%]">
                    <p class="text-sm text-center text-priBlack font-semibold capitalize">
                      {{ billDetails?.type }}
                    </p>
                  </div>
                </div>
                <div
                  v-if="status === 'completed'"
                  class="btn border-[1px] border-main flex gap-1 items-center bg-white rounded-3xl h-[45px] mt-3 w-[95%] mx-auto hover:bg-main text-main hover:text-white"
                  @click="handleRatings"
                >
                  <p class="font-semibold text-center text-lg capitalize">Rate us</p>
                  <img src="/img/star.svg" alt="star" />
                </div>
                <div v-else class="pt-6 text-center">
                  <p class="leading-6 font-medium text-base text-center">
                    To track your package click
                    <span
                      @click="$emit('gotoDetails')"
                      class="text-main underline font-bold cursor-pointer"
                      >here.</span
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
import { ResponseData } from "../../../types/ResponseData";

const props = defineProps<{
  id: string;
  data: ResponseData | undefined;
}>();

const emits = defineEmits(["gotoDetails", "gotoRating", "gotoNote"]);

// use truncattor
const { truncateText } = useTruncate();
// use formatter for number
const { formatNumber } = useFormatter();
// get order details and data from store
const isAnonymous = computed(() => {
  return props.data?.isAnonymous;
});
const senderName = computed(() => {
  return props.data?.senderName;
});
const productDetails = computed(() => {
  return props.data?.productDetails;
});
const notes = computed(() => {
  return props.data?.notes;
});
const hasDelivery = computed(() => {
  return props.data?.hasDelivery;
});
const status = computed(() => {
  return props.data?.status;
});
const billDetails = computed(() => {
  return props.data?.billDetails;
});

// Navigate
const handleRatings = () => {
  emits("gotoRating");
};
const viewNote = () => {
  emits("gotoNote");
};

const progress = ref(100);
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
