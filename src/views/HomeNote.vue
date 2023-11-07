<template>
  <div
    class="w-full h-screen mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
  >
    <div class="container">
      <router-link :to="{ name: 'home' }">
        <img
          class="mx-auto mb-3 w-auto relative z-[9999]"
          src="/img/logo.svg"
          alt="logo"
      /></router-link>
      <div class="p-0.5">
        <div
          class="flex flex-col items-center place-content-center m-auto bg-secBg shadow-xl rounded-3xl py-8 px-5 md:w-[488px] drop-shadow relative z-[9999]"
        >
          <div class="text-center flex flex-col gap-2 my-4">
            <img class="mx-auto" src="/img/note.svg" alt="note" />
          </div>
          <p class="text-center text-base flex flex-col gap-2 md:w-[360px]">
            Happy birthday Collins! You mean a whole lot to me and I have sent
            this token to you to really tell you how much I value your immense
            contribution towards my life and well-being. You are truly a
            wonderful brother and indeed, more than a brother. Accept this with
            Love
          </p>
          <div class="text-center pt-4">
            <p class="font-meowScript text-2xl">{{ $route.query.name }}</p>
            <p
              class="text-main underline font-bold pt-2 leading-6 cursor-pointer"
              @click="back"
            >
              Back
            </p>
          </div>
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

// router
const router = useRouter();
const route = useRoute();

const back = () => {
  router.go(-1);
};

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
  @apply h-1  bg-primary border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] mx-auto my-[20px];
}
.progress {
  @apply h-full bg-[#644AE2];
}
</style>
