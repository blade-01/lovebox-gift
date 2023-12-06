<template>
  <div>
    <div v-if="isLoading === true">
      <loader />
    </div>
    <div
      v-else
      class="w-full h-full md:h-screen mt-10 lg:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
    >
      <div class="container">
        <router-link to="/">
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
            <h1 class="font-semibold text-center text-2xl text-priBlack">
              Lovebox unboxed!
            </h1>
            <div class="my-6" v-if="slideImages?.length === 1">
              <img
                v-for="(slide, index) in slideImages"
                :key="index"
                class="w-auto md:w-[391.13px] md:h-[359.69px]"
                :src="`${slide?.src}`"
                :alt="`${slide?.alt}`"
              />
            </div>
            <div v-else class="max-w-[300px] mx-auto my-6">
              <carousel :items-to-show="1.5" :autoplay="2000" :wrap-around="true">
                <slide v-for="(slide, index) in slideImages" :key="index">
                  <div class="carousel__item">
                    <img
                      class="w-[90%] h-[250px] rounded-lg object-cover"
                      :src="`${slide?.src}`"
                      :alt="`${slide?.alt}`"
                    />
                  </div>
                </slide>
                <template #addons>
                  <pagination />
                </template>
              </carousel>
            </div>
            <div class="text-center w-full flex flex-col gap-4">
              <div
                v-if="isAnonymous === true"
                @click="
                  $router.push({
                    path: '/shipment',
                    query: { id: $route.query.id },
                  })
                "
                class="btn w-full lg:w-[360px] mx-auto bg-main text-white rounded-3xl capitalize"
              >
                Proceed
              </div>
              <div class="flex flex-col gap-4" v-if="isAnonymous === false">
                <p class="text-priBlack font-semibold text-base">
                  Want to guess the sender of this Lovebox?
                </p>
                <router-link to="/gift">
                  <button class="btn bg-main w-full rounded-3xl capitalize">Yes</button>
                </router-link>
                <router-link to="/details">
                  <button
                    class="btn w-full bg-white border-[1px] border-main text-main rounded-3xl capitalize"
                  >
                    No, Proceed
                  </button>
                </router-link>
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
      <close-circle />
      <animate-circle-bg />
    </div>
  </div>
</template>
<script setup lang="ts">
import "vue3-carousel/dist/carousel.css";
import { Carousel, Slide, Pagination } from "vue3-carousel";
// get order details and data from store
const { getOrderDetails, isLoading, data } = useStore();
const isAnonymous = computed(() => {
  return data.value?.isAnonymous;
});

const slideImages: any = computed(() => {
  return data.value?.productDetails.flatMap((element: any) =>
    element?.images.map((image: any) => ({
      src: image.src,
      alt: image.alt,
    }))
  );
});

// route for id
const route = useRoute();

onMounted(() => {
  getOrderDetails(route.query.id);
});

// progress bar
const progress = ref(30);

const incrementProgress = () => {
  progress.value = Math.min(progress.value + 30, 100);
};
</script>

<style scoped>
.progress-bar {
  @apply h-1  bg-primary border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] mx-auto my-[20px];
}
.progress {
  @apply h-full bg-[#644AE2];
}

.drop-shadow {
  box-shadow: 0px 0.7499999403953552px 2.249999761581421px 0.7499999403953552px #00000026;
}
:deep(.carousel__pagination) {
  @apply !flex !gap-2 !justify-center !mt-4;
}
:deep(.carousel__pagination-button) {
  @apply !w-3 !h-3 !bg-[#DEE8F8] !rounded-full after:hidden transition-all ease-in-out duration-200;
}

:deep(.carousel__pagination-button--active) {
  @apply !w-6 !h-3 !rounded-lg !bg-main;
}
</style>
