<template>
  <div
    class="w-full h-screen relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
  >
    <div class="container">
      <div class="flex flex-col items-center place-content-center m-auto">
        <img src="/img/logo.svg" alt="logo" />
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${progress}%` }"></div>
        </div>
        <p class="text-black font-bold">{{ currentText.header }}</p>
        <p class="text-black font-bold">{{ currentText.content }}</p>
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
import { ref, onMounted, watchEffect } from "vue";
interface textItem {
  header: string;
  content: string;
}
const progress = ref<number>(0);

const text: textItem[] = [
  {
    header: "Your Package Adventure Begins:",
    content: "Time to Unwrap!",
  },
  {
    header: "Your Package Adventure Begins:",
    content: "Time to Unwrap!",
  },
  {
    header: "A Gentle Reminder:",
    content: "Patience is Key",
  },
  {
    header: "Preparing Your Package:",
    content: "Let's Get Started!",
  },
  {
    header: "End in Sight",
    content: "Finalizing the Process",
  },
];
// Simulate progress increment for demonstration
const simulateProgress = () => {
  const interval = setInterval(() => {
    progress.value += 1;
    if (progress.value >= 100) {
      clearInterval(interval);
    }
  }, 50);
};

const currentIndex = ref<number>(0);
const currentText = ref(text[currentIndex.value]);

const changeText = () => {
  currentIndex.value = (currentIndex.value + 1) % text.length;
  currentText.value = text[currentIndex.value];
};

// Automatically change text every 1 seconds
const intervalId = setInterval(changeText, 1100);

// Cleanup when component is unmounted
onMounted(() => {
  watchEffect(() => {
    return () => clearInterval(intervalId);
  });
  simulateProgress();
});

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
const intervalidCircle = setInterval(changeImage, 2000);

// Cleanup when component is unmounted
onMounted(() => {
  watchEffect(() => {
    return () => clearInterval(intervalidCircle);
  });
});
</script>
<style scoped>
.animation-container {
  @apply absolute w-[600px] md:w-[800px] h-[600px] md:h-[800px] flex items-center place-content-center;
}

.circle {
  @apply w-full h-full rounded-[50%] bg-cover transition-[backgroud-image_1s];
}

.progress-bar {
  @apply h-1 bg-white border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] mt-[50px] mb-[40px];
}
.progress {
  @apply h-full bg-[#644AE2];
}
</style>
