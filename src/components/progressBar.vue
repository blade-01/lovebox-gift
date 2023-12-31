<template>
  <div class="progress-bar">
    <div class="progress" :style="{ width: `${progress}%` }"></div>
  </div>
  <div v-if="showBlackBackground" class="black-overlay"></div>
  <div v-if="showPurpleBackground" class="purple-overlay"></div>
  <!-- <div class="circle-container" v-if="ripple === true">
    <RippleCircle />
    <RippleSquare />
  </div> -->
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>
<script setup lang="ts">
const props = defineProps<{
  id: any;
}>();

const router = useRouter();

const progress = ref<number>(0);

const ripple = ref<boolean>(false);

// get order details and data from store
const { getOrderDetails, isLoading, data } = useStore();

// Simulate progress increment for demonstration
const simulateProgress = async () => {
  const interval = setInterval(() => {
    progress.value += 1;
    if (progress.value >= 50) {
      clearInterval(interval);
    }
  }, 100);
};

const showBlackBackground = ref<boolean>(false);
const showPurpleBackground = ref<boolean>(false);
const response = computed(() => data.value);

watch(progress, async (newProgress) => {
  if (newProgress === 40) {
    ripple.value = true;
  } else if (newProgress === 50) {
    await getOrderDetails(props.id);
    showBlackBackground.value = true;
    setTimeout(() => {
      showBlackBackground.value = false;
      showPurpleBackground.value = true;
      setTimeout(() => {
        showPurpleBackground.value = false;
        router.push({
          // USING SEPARATE ROUTES FOR PRODUCT AND BILL
          // path: response.value?.productDetails ? "/unboxed" : "/shipment",
          // query: {
          //   id: props.id,
          // },
          // USING SAME ROUTE FOR PRODUCT AND BILL
          name: "product-id",
          params: {
            id: props.id,
          },
          query: {
            type: response.value?.productDetails ? "unboxed" : "shipment",
          },
        });
      }, 2000); // Set duration to 2 seconds
    }, 2000); // Set duration to 2 seconds
  } else {
    showBlackBackground.value = false;
  }
});

onMounted(async () => {
  await simulateProgress();
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
