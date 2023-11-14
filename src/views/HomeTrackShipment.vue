<template>
  <div
    class="w-full h-full 2xl:h-screen mt-8 2xl:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
  >
    <div class="container">
      <router-link :to="{ name: 'home' }">
        <img class="mx-auto mb-3 w-auto relative z-[9999]" src="/img/logo.svg" alt="logo"
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
              <div v-if="isAnonymous === false" class="text-center flex flex-col gap-2">
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
                <p class="text-priBlack text-sm font-bold">Sample HTML text</p>
                <div class="flex gap-1 items-center">
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
                <div class="text-center mr-auto pr-2 md:pr-0">
                  <p class="text-sm text-priBlack font-semibold capitalize">
                    {{ product?.type }}
                  </p>
                  <p class="text-[12px] text-priGray capitalize">Dummy Text</p>
                </div>
                <div class="text-center border-x-[1px] border-priGray px-2 md:px-5">
                  <p class="text-sm text-priBlack font-semibold uppercase">
                    {{ formatNumber(product?.price) }} NGN
                  </p>
                  <p class="text-[12px] text-priGray capitalize">Any Store</p>
                </div>
                <div class="text-center ml-auto pl-2 md:pl-0">
                  <p class="text-sm text-priBlack font-semibold">
                    {{ product?.name }}
                  </p>
                  <p class="text-[12px] text-priGray capitalize">Dummy Text</p>
                </div>
              </div>
              <div class="pt-6 text-center">
                <p class="leading-6 font-medium text-base text-center">
                  Tell the world about Love Box! click
                  <span
                    class="text-main underline font-bold cursor-pointer"
                    @click="handleRating"
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
            href="www.lovebox.com"
            class="text-main font-bold text-sm underline cursor-pointer"
          >
            www.lovebox.com
          </a>
        </div>
      </div>
    </div>
    <div class="animation-container">
      <div
        class="circle"
        :style="{
          backgroundImage: `url(${animateCircle[currentAnimateIndex]})`,
        }"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../composables/useStore";
import { useFormatter } from "../composables/useFormatter";

// use formatter for number
const { formatNumber } = useFormatter();
// get order details and data from store
const { getOrderDetails, data } = useStore();
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

// home rating
const route = useRoute();
const router = useRouter();
const handleRating = () => {
  router.push({
    name: "home-rating",
  });
};
// navigate to note route
const viewNote = () => {
  router.push({
    name: "home-note",
  });
};

const progress = ref(100);

const animateCircle: string[] = [
  "/img/circle-1.svg",
  "/img/circle-2.svg",
  "/img/circle-3.svg",
  "/img/circle-4.svg",
  "/img/circle-1.svg",
  "/img/circle-2.svg",
  "/img/circle-3.svg",
  "/img/circle-4.svg",
];

const currentAnimateIndex = ref(0);

const changeImage = () => {
  currentAnimateIndex.value = (currentAnimateIndex.value + 1) % animateCircle.length;
};

// Automatically change image every 3 second
const intervalidCircle = setInterval(changeImage, 3000);

// Cleanup when component is unmounted
onMounted(() => {
  watchEffect(() => {
    return () => clearInterval(intervalidCircle);
  });
  getOrderDetails();
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
