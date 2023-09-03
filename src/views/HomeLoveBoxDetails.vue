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
        <h1
          class="font-bold text-center text-lg md:text-4xl text-black tracking-wide"
        >
          Lovebox Details
        </h1>
        <div class="text-center flex flex-col gap-2 my-5">
          <img
            class="mx-auto"
            src="/img/lovebox-sender.svg"
            alt="lovebox-sender"
          />
          <h1 class="text-2xl font-semibold leading-8">
            <span v-if="$route.query.name">Correct!</span> Thoughtfully sent by
          </h1>
          <p>“Moboluwaduro Peters”</p>
        </div>
        <div
          :class="$route.query.name ? 'gap-2' : 'gap-5'"
          class="text-center flex flex-col md:w-[300px]"
        >
          <p class="font-medium leading-6">Your Package Number</p>
          <button
            class="btn bg-white border-[1px] border-main text-main md:text-lg leading-7 font-semibold w-full rounded-3xl capitalize"
          >
            5871630601
          </button>
          <p class="leading-6 font-medium py-1">
            To track your shipment, click
            <span class="text-main underline font-bold">here.</span>
          </p>
          <p v-if="$route.query.name" class="leading-6 font-medium py-3">
            Tell the world about Love Box! click
            <span class="text-main underline font-bold">here.</span>
          </p>
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
// progress bar
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
