<template>
  <div class="circle-container">
    <div class="circle" :class="{ animate: animateCircle }"></div>
  </div>
</template>

<script>
const animateCircle = ref(false);

onMounted(() => {
  // Start the animation when the component is mounted
  animateCircle.value = true;
});
</script>

<style>
.circle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.circle {
  width: 200px;
  height: 200px;
  background-color: blue;
  border-radius: 50%;
  transform: scale(1);
  transition: transform 0.5s ease-in-out;
}

.animate {
  transform: scale(0);
}
</style>
