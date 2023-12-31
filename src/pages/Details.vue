<template>
  <div>
    <div v-if="isLoading === true">
      <loader />
    </div>
    <div
      v-else
      class="w-full h-full md:h-screen mt-8 md:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
    >
      <div class="container">
        <router-link to="/">
          <img
            class="mx-auto mb-3 w-auto relative z-[9999]"
            src="/img/logo.svg"
            alt="logo"
        /></router-link>
        <div class="p-0.5 relative z-[9999]">
          <div
            class="flex flex-col items-center place-content-center m-auto bg-secBg shadow-xl rounded-3xl py-8 px-5 md:w-[488px] drop-shadow"
          >
            <div class="progress-bar">
              <div class="progress" :style="{ width: `${progress}%` }"></div>
            </div>
            <h1
              class="font-semibold text-center text-lg md:text-4xl text-black tracking-wide"
            >
              Lovebox Details
            </h1>
            <div class="text-center flex flex-col gap-2 my-4">
              <img class="mx-auto" src="/img/lovebox-sender.svg" alt="lovebox-sender" />
              <div v-if="isAnonymous === false" class="text-center flex flex-col gap-2">
                <h1 class="text-2xl font-semibold leading-8 text-priBlack">
                  Correct! Thoughtfully sent by
                </h1>
                <p class="text-priGray text-lg leading-6">“{{ senderName }}”</p>
              </div>
            </div>
            <div class="text-center flex flex-col gap-2 md:w-[300px]">
              <p class="font-medium leading-6 text-priBlack text-[15px]">
                Your Package Number
              </p>
              <button
                class="btn bg-white border-[1px] border-main text-main md:text-lg leading-7 font-semibold w-full rounded-3xl capitalize"
              >
                N/A
              </button>
              <button
                class="btn bg-main border-[1px] border-main text-white md:text-lg leading-7 font-semibold w-full rounded-3xl capitalize mt-2"
                @click="$router.back()"
              >
                Go Back
              </button>
              <p class="leading-6 font-medium py-3 text-base">
                Tell the world about Love Box! click
                <span
                  @click="openModal(true)"
                  class="text-main underline font-bold cursor-pointer"
                  >here.</span
                >
              </p>
            </div>
          </div>
          <div class="text-center pt-4">
            <a
              href="https://www.lovebox.africa"
              target="_blank"
              class="text-main font-bold text-sm underline cursor-pointer"
            >
              www.lovebox.africa
            </a>
          </div>
        </div>
      </div>
      <animate-circle-bg />
      <BaseModal :isActive="isActive" @openModal="openModal">
        <ShareNetwork :isActive="isActive" @openModal="openModal" />
      </BaseModal>
    </div>
  </div>
</template>
<script setup lang="ts">
import useModal from "../composables/useModal";
// use modal
const { isActive, openModal } = useModal();
// get order details and data from store
const { getOrderDetails, data, isLoading } = useStore();
const isAnonymous = computed(() => {
  return data.value?.isAnonymous;
});
const senderName = computed(() => {
  return data.value?.senderName;
});

// router
const router = useRouter();
const route = useRoute();
const progress = ref(100);

// Track shipment
const trackShipment = () => {
  router.push({
    path: "/shipment",
    query: {
      id: route.query.id,
    },
  });
};

// rating
const handleRating = () => {
  router.push({
    path: "/rating",
    query: {
      id: route.query.id,
    },
  });
};

// Cleanup when component is unmounted
onMounted(() => {
  getOrderDetails(route.query.id);
});
</script>

<style scoped>
.animation-container {
  @apply absolute w-[600px] md:w-[1000px] h-[600px] md:h-[900px] flex items-center place-content-center;
}
.circle {
  @apply w-full h-full rounded-[50%] bg-cover transition-[backgroud-image_1s];
}

.progress-bar {
  @apply h-1  bg-primary border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] mx-auto my-[20px];
}
.progress {
  @apply h-full bg-[#644AE2];
}
</style>
