<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: `${progress}%` }"></div>
  </div>
  <div v-if="showBlackBackground" class="black-overlay"></div>
  <div v-if="showPurpleBackground" class="purple-overlay"></div>
  <div class="circle-container" v-if="ripple === true">
    <RippleCircle />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const progress = ref<number>(0);

const ripple = ref<boolean>(false);

// Simulate progress increment for demonstration
const simulateProgress = () => {
  const interval = setInterval(() => {
    progress.value += 1;
    if (progress.value >= 50) {
      clearInterval(interval);
    }
  }, 100);
};

const showBlackBackground = ref<boolean>(false);
const showPurpleBackground = ref<boolean>(false);

watch(progress, (newProgress) => {
  if (newProgress === 40) {
    ripple.value = true;
  } else if (newProgress === 50) {
    showBlackBackground.value = true;
    setTimeout(() => {
      showBlackBackground.value = false;
      showPurpleBackground.value = true;
      setTimeout(() => {
        showPurpleBackground.value = false;
        router.push({ name: "home-unboxed" });
      }, 2000); // Set duration to 2 seconds
    }, 2000); // Set duration to 2 seconds
  } else {
    showBlackBackground.value = false;
  }
});

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

.black-background {
  @apply bg-black overflow-hidden;
}

.black-overlay {
  @apply fixed top-0 left-0 w-full h-screen bg-[url('/img/animate-logo-1.svg')] bg-no-repeat bg-center bg-black bg-bgMobile md:bg-auto transition-[background_2s] z-[9999];
}

.purple-overlay {
  @apply fixed top-0 left-0 w-full h-screen bg-[url('/img/animate-logo-2.svg')] bg-no-repeat bg-center bg-[#644ae2]    bg-bgMobile md:bg-auto transition-[background_2s] z-[9999];
}

.circle-container {
  @apply fixed w-full h-screen pointer-events-none flex justify-between place-items-center flex-col m-auto;
}
</style>
