<template>
  <div class="text-lg leading-7 text-center w-[280px]">
    <p class="text-black">{{ currentText }}</p>
  </div>
</template>

<script>
import { ref, onMounted, watchEffect } from "vue";

const text = [
  "Your Package Adventure Begins: Time to Unwrap!",
  "Your Package Adventure Begins: Time to Unwrap!",
  "A Gentle Reminder: Patience is Key",
  "Preparing Your Package: Let's Get Started!",
  "End in Sight: Finalizing the Process",
];
const currentIndex = ref(0);
const currentText = ref(text[currentIndex.value]);

const changeText = () => {
  currentIndex.value = (currentIndex.value + 1) % text.length;
  currentText.value = text[currentIndex.value];
};

// Automatically change text every 10 seconds
const intervalId = setInterval(changeText, 10000);

// Cleanup when component is unmounted
onMounted(() => {
  watchEffect(() => {
    return () => clearInterval(intervalId);
  });
});
</script>
