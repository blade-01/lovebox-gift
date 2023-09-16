<template>
  <div
    class="w-full h-full xl:h-screen mt-8 xl:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
  >
    <div class="container">
      <router-link :to="{ name: 'home' }">
        <img
          class="mx-auto mb-3 w-auto relative z-[9999]"
          src="/img/logo.svg"
          alt="logo"
      /></router-link>
      <div
        class="flex flex-col items-center place-content-center m-auto bg-white shadow-xl rounded-3xl py-10 px-6 xl:py-6 xl:px-2 md:w-[488px] relative z-[9999]"
      >
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${progress}%` }"></div>
        </div>
        <h1 class="font-semibold text-center text-lg md:text-2xl text-black">
          Lovebox unboxed!
        </h1>
        <img
          class="w-auto md:w-[250px] md:h-[250px]"
          src="/img/love-unboxed.svg"
          alt="love-unboxed"
        />
        <div class="text-center flex flex-col gap-5">
          <p>Want to guess the sender of this Lovebox?</p>
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
  @apply h-1 bg-primary border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] m-[20px];
}
.progress {
  @apply h-full bg-[#644AE2];
}
</style>
