<template>
  <div class="animation-container">
    <div
      class="circle"
      :style="{
        backgroundImage: `url(${animateCircle[currentAnimateIndex]})`,
      }"
    ></div>
  </div>
</template>
<script setup lang="ts">
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
  currentAnimateIndex.value = (currentAnimateIndex.value + 1) % animateCircle.length;
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
  @apply fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] flex items-center justify-center;
}

.circle {
  @apply w-full h-full lg:w-[800px] lg:h-[800px] rounded-[50%] bg-cover transition-[backgroud-image_1s];
}
</style>
