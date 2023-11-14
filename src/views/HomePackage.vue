<template>
  <div v-if="isLoading === true">
    <loader />
  </div>
  <div
    v-else
    class="w-full h-full 1xl:h-screen mt-10 1xl:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
  >
    <div class="container">
      <router-link :to="{ name: 'home' }">
        <img
          class="mx-auto mb-4 w-[144px] h-[36px] relative z-[9999]"
          src="/img/logo.svg"
          alt="logo"
      /></router-link>
      <div class="p-0.5 relative z-[9999]">
        <div
          class="flex flex-col items-center place-content-center m-auto bg-secBg shadow-xl rounded-3xl py-8 px-5 md:w-[488px] drop-shadow"
        >
          <div class="progress-bar">
            <div class="progress" :style="{ width: `${progress}%` }"></div>
          </div>
          <h1
            class="font-semibold text-center text-2xl lg:text-4xl text-priBlack"
          >
            Your Package
          </h1>
          <div class="relative mt-5">
            <img
              class="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              src="/img/p-bg.png"
              alt="package"
            />
            <div class="max-w-[300px] m-auto">
              <carousel
                :items-to-show="1.5"
                :autoplay="2000"
                :wrap-around="true"
              >
                <slide v-for="(slide, index) in slideImg" :key="index">
                  <img
                    class="w-[90%] h-[250px] rounded-lg"
                    :src="`/img/${slide}`"
                    :alt="`${slide}`"
                  />
                </slide>
                <template #addons>
                  <!-- <navigation /> -->
                  <pagination />
                </template>
              </carousel>
            </div>
          </div>
          <div class="text-center flex flex-col gap-4">
            <p class="text-priBlack font-semibold text-base">
              Want to guess the sender of this Lovebox?
            </p>
            <router-link :to="{ name: 'home-gift' }">
              <button class="btn bg-main w-full rounded-3xl capitalize">
                Yes
              </button>
            </router-link>
            <router-link :to="{ name: 'home-lovebox-details' }">
              <button
                class="btn w-full bg-white border-[1px] border-main text-main rounded-3xl capitalize"
              >
                No, Proceed
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <animate-circle-bg />
    <close-circle />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination, Navigation } from "vue3-carousel";
// get order details and data from store
const { getOrderDetails, isLoading, data } = useStore();

const slideImg: string[] = [
  "slide-01.png",
  "slide-02.png",
  "slide-03.png",
  "slide-04.png",
];

// progress bar
const progress = ref(30);

const incrementProgress = () => {
  progress.value = Math.min(progress.value + 30, 100);
};

onMounted(() => {
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

.drop-shadow {
  box-shadow: 0px 0.7499999403953552px 2.249999761581421px 0.7499999403953552px
    #00000026;
}
.carousel {
  @apply mt-[2rem];
}
.carousel__pagination {
  @apply my-[2rem] mx-auto;
}
</style>
