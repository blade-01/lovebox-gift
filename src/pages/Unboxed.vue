<template>
  <div>
    <div v-if="isLoading === true">
      <loader />
    </div>
    <div
      v-else
      class="w-full h-full 1xl:h-screen mt-10 1xl:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
    >
      <div class="container">
        <router-link to="/">
          <img
            class="mx-auto mb-4 w-[144px] h-[36px] relative z-[9999]"
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
            <h1 class="font-semibold text-center text-2xl text-priBlack">
              Lovebox unboxed!
            </h1>
            <img
              class="w-auto md:w-[391.13px] md:h-[359.69px]"
              src="/img/love-unboxed.svg"
              alt="love-unboxed"
            />
            <div class="text-center w-full flex flex-col gap-4 mt-6">
              <div v-if="isAnonymous === true">
                <router-link
                  to="/details"
                  class="btn w-full lg:w-[360px] mx-auto bg-main text-white rounded-3xl capitalize"
                >
                  Proceed
                </router-link>
              </div>
              <div class="flex flex-col gap-4" v-if="isAnonymous === false">
                <p class="text-priBlack font-semibold text-base">
                  Want to guess the sender of this Lovebox?
                </p>
                <router-link :to="{ name: 'home-gift' }">
                  <button class="btn bg-main w-full rounded-3xl capitalize">
                    Yes
                  </button>
                </router-link>
                <router-link to="/details">
                  <button
                    class="btn w-full bg-white border-[1px] border-main text-main rounded-3xl capitalize"
                  >
                    No, Proceed
                  </button>
                </router-link>
              </div>
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
      <close-circle />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import { useStore } from "../composables/useStore";

// get order details and data from store
const { getOrderDetails, isLoading, data } = useStore();
const isAnonymous = computed(() => {
  return data.value?.isAnonymous;
});

onMounted(() => {
  getOrderDetails();
});

// progress bar
const progress = ref(30);

const incrementProgress = () => {
  progress.value = Math.min(progress.value + 30, 100);
};
</script>

<style scoped>
.progress-bar {
  @apply h-1  bg-primary border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] mx-auto my-[20px];
}
.progress {
  @apply h-full bg-[#644AE2];
}

.drop-shadow {
  box-shadow: 0px 0.7499999403953552px 2.249999761581421px 0.7499999403953552px
    #00000026;
}
</style>