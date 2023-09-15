<template>
  <div class="circle-container">
    <div
      v-for="(circle, index) in circles"
      :key="index"
      class="circle"
      :style="circle.style"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const circles = ref<any>([]);

const createCircle = (x: number, y: number) => {
  const numCircles = 1; // Number of circles to create for the ripple effect
  const initialSize: number = 100;

  for (let i = 0; i < numCircles; i++) {
    const circle = {
      x,
      y,
      size: initialSize,
      style: {
        left: `${x}px`,
        top: `${y}px`,
        width: `${initialSize}px`,
        height: `${initialSize}px`,
        animationDelay: `${i * 0.18}s`, // Delay the animation of each circle
      },
    };
    circles.value.push(circle);

    const interval = setInterval(() => {
      circle.size += 1;
      circle.style.width = `${circle.size}px`;
      circle.style.height = `${circle.size}px`;
    }, 10 * (i + 1)); // Adjust the interval for each circle to create the ripple effect
  }
};

// Trigger the initial circle creation on mount
onMounted(() => {
  createCircle(window.innerWidth / 2, window.innerHeight / 2);
});
</script>

<style scoped>
.circle-container {
  position: fixed;
  width: 100%;
  height: 100vh;
  pointer-events: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  margin: auto;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid #644ae2;
  background-color: #644ae2;
  opacity: 0.1;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ripple 1s linear;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(20);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }
}
</style>
