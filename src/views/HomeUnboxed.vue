<template>
  <div
    class="w-full h-full xl:h-screen mt-10 xl:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
  >
    <div class="container">
      <router-link :to="{ name: 'home' }">
        <img
          class="mx-auto mb-4 w-[144px] h-[36px] relative z-[9999]"
          src="/img/logo.svg"
          alt="logo"
      /></router-link>
      <div class="p-0.5">
        <div
          class="flex flex-col items-center place-content-center m-auto bg-secBg shadow-xl rounded-3xl py-8 px-5 md:w-[488px] relative z-[9999] drop-shadow"
        >
          <div class="w-full">
            <div class="progress-bar">
              <div class="progress" :style="{ width: `${progress}%` }"></div>
            </div>
            <h1 class="font-semibold text-center text-2xl text-priBlack">
              Lovebox unboxed!
            </h1>
            <img
              class="w-auto md:w-[391.13px] md:h-[359.69px]"
              src="/img/love-unboxed.svg"
              alt="love-unboxed"
            />
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
        <div class="text-center pt-4">
          <a
            href="www.lovebox.com"
            class="text-main font-bold text-sm underline"
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
    <close-circle />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

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
  currentAnimateIndex.value =
    (currentAnimateIndex.value + 1) % animateCircle.length;
};

// Automatically change image every 3 second
const intervalidCircle = setInterval(changeImage, 3000);

// Cleanup when component is unmounted
onMounted(() => {
  watchEffect(() => {
    return () => clearInterval(intervalidCircle);
  });
});

// progress bar
const progress = ref(30);

const incrementProgress = () => {
  progress.value = Math.min(progress.value + 30, 100);
};
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
</style>
