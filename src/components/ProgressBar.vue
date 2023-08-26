<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: `${progress}%` }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const progress = ref<number>(0);

// Simulate progress increment for demonstration
const simulateProgress = () => {
  const interval = setInterval(() => {
    progress.value += 1;
    if (progress.value >= 100) {
      clearInterval(interval);
    }
  }, 100);
};

onMounted(() => {
  simulateProgress();
});
</script>

<style scoped>
.progress-bar {
  @apply h-1 bg-white border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] mt-[50px] mb-[40px];
}
.progress {
  @apply h-full bg-[#644AE2];
}
</style>
