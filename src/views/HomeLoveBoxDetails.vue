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
        <div class="flex flex-col gap-4">
          <h1
            class="font-bold text-center text-lg md:text-4xl text-black tracking-wide"
          >
            Unveil the sender:
          </h1>
          <p
            class="font-bold text-center text-lg md:text-4xl text-black tracking-wide"
          >
            Can you guess?
          </p>
        </div>
        <form
          autocomplete="off"
          @submit.prevent
          class="flex flex-col gap-4 my-4 md:w-[300px]"
        >
          <div class="flex justify-between items-center flex-wrap gap-2">
            <p class="text-sm font-medium">Gifted from who?</p>
            <p class="text-sm font-medium">1/3 trials</p>
          </div>
          <input
            class="w-full h-12 bg-gray-100 p-2 rounded-lg"
            type="text"
            placeholder="Placeholder"
          />
          <p class="text-sm font-medium">You have three windows to guess</p>
        </form>
        <div class="text-center flex flex-col gap-5 md:w-[300px]">
          <button class="btn bg-main w-full rounded-3xl capitalize">
            Submit
          </button>
          <button
            class="btn w-full bg-white border-[1px] border-main text-main rounded-3xl capitalize"
          >
            Skip
          </button>
        </div>
        <p class="text-sm font-medium pt-4">
          Not to worry, we will not notify the sender on wrong guesses
        </p>
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
const progress = ref(70);

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
