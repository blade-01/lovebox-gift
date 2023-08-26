<template>
  <div
    class="w-full h-screen flex items-center place-content-center m-auto bg-white"
  >
    <div class="container">
      <div class="flex flex-col items-center place-content-center m-auto">
        <img src="/img/logo.svg" alt="logo" />
        <ProgressBar />
        <p class="text-black">{{ currentText.header }}</p>
        <p class="text-black">{{ currentText.content }}</p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
interface textItem {
  header: string;
  content: string;
}

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
const currentIndex = ref(0);
const currentText = ref(text[currentIndex.value]);

const changeText = () => {
  currentIndex.value = (currentIndex.value + 1) % text.length;
  currentText.value = text[currentIndex.value];
};

// Automatically change text every 1 seconds
const intervalId = setInterval(changeText, 1000);

// Cleanup when component is unmounted
onMounted(() => {
  watchEffect(() => {
    return () => clearInterval(intervalId);
  });
});
</script>
<style scoped></style>
