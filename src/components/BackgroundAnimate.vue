<template>
  <div class="animation-container">
    <div
      class="circle"
      :class="`circle-${currentImageIndex}`"
      @click="changeImage"
    ></div>
    <div class="background" :class="{ active: showBackground }"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const images = ["image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg"];
const currentImageIndex = ref(0);
const showBackground = ref(false);

const changeImage = () => {
  if (currentImageIndex.value === images.length - 1) {
    showBackground.value = true;
    setTimeout(() => {
      currentImageIndex.value = 0;
      showBackground.value = false;
    }, 1000);
  } else {
    currentImageIndex.value += 1;
  }
};
</script>

<style scoped>
.animation-container {
  position: relative;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  transition: transform 1s, opacity 0.5s;
}

.circle-0 {
  background-image: url("/path-to-your-image/image1.jpg");
}

.circle-1 {
  background-image: url("/path-to-your-image/image2.jpg");
  transform: scale(0);
}

.circle-2 {
  background-image: url("/path-to-your-image/image3.jpg");
  transform: rotate(10deg);
}

.circle-3 {
  background-image: url("/path-to-your-image/image4.jpg");
  transform: rotate(0deg);
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: purple;
  opacity: 0;
  transition: opacity 1s;
}

.background.active {
  opacity: 1;
}
</style>
