<template>
  <div class="square-container">
    <div
      v-for="(square, index) in squares"
      :key="index"
      class="square"
      :style="square.style"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const squares = ref<any>([]);

const createSquare = (x: number, y: number) => {
  const numSquare = 3; // Number of squares to create for the ripple effect
  const initialSize: number = 400;

  for (let i = 0; i < numSquare; i++) {
    const square = {
      x,
      y,
      size: initialSize,
      style: {
        left: `${x}px`,
        top: `${y}px`,
        width: `${initialSize}px`,
        height: `${initialSize}px`,
        animationDelay: `${i * 0.2}s`, // Delay the animation of each square
      },
    };
    squares.value.push(square);

    const interval = setInterval(() => {
      square.size += 1;
      square.style.width = `${square.size}px`;
      square.style.height = `${square.size}px`;
    }, 10 * (i + 1)); // Adjust the interval for each square to create the ripple effect
  }
};

// Trigger the initial square creation on mount
onMounted(() => {
  createSquare(window.innerWidth / 2, window.innerHeight / 2);
});
</script>

<style scoped>
.square-container {
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

.square {
  position: absolute;
  height: 300px;
  width: 200px;
  border: 1px solid #644ae2;
  transform: translate(-50%, -50%);
  pointer-events: none;
  animation: ripple 2s linear infinite;
}

@keyframes ripple {
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(8);
    opacity: 0;
  }
}
</style>
