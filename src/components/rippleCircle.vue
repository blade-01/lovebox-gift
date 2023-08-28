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
  const size: number = 10; // Initial size of the circle
  const maxDistance = Math.max(window.innerWidth, window.innerHeight);
  const circle = {
    x,
    y,
    size,
    style: {
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
    },
  };
  circles.value.push(circle);

  const interval = setInterval(() => {
    circle.size += 1; // Adjust the rate of expansion by changing this value
    circle.style.width = `${circle.size}px`;
    circle.style.height = `${circle.size}px`;

    if (circle.size >= maxDistance) {
      clearInterval(interval);
      circles.value.splice(circles.value.indexOf(circle), 1);
    }
  }, 10); // Adjust the interval to control the smoothness of the animation
};

// Trigger the initial circle creation on mount
onMounted(() => {
  createCircle(window.innerWidth / 2, window.innerHeight / 2);
});

// Listen for mouse click events and create circles at those points
window.addEventListener("click", (event) => {
  createCircle(event.clientX, event.clientY);
});
</script>

<style scoped>
.circle-container {
  position: fixed;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.5);
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>
