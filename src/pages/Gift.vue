<template>
  <div v-if="isLoading === true">
    <loader />
  </div>
  <div
    v-else
    class="w-full h-full xl:h-screen mt-8 xl:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
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
          <div class="w-full">
            <div class="progress-bar">
              <div class="progress" :style="{ width: `${progress}%` }"></div>
            </div>
            <div
              class="flex flex-col gap-4 text-priBlack text-[22px] text-center font-semibold tracking-wide"
            >
              <p class="leading-9">
                Unveil the sender: <br />
                <span>Can you guess?</span>
              </p>
            </div>
            <form
              autocomplete="off"
              @submit.prevent
              class="flex flex-col gap-4 my-4"
              v-if="form"
            >
              <div
                class="flex justify-between items-center flex-wrap gap-2 text-priBlack"
              >
                <p class="text-sm font-medium">Gifted from who?</p>
                <p class="text-sm font-medium">{{ trialCount }}/3 trials</p>
              </div>
              <small
                class="font-medium leading-6 text-black flex items-center"
                :class="{ 'err-message': v$.name.$error }"
                v-if="v$.name.$error || errorValidate()"
              >
                <span
                  class="mdi mdi-alert-circle text-red-500 text-2xl pr-2"
                ></span>
                Your guess is wrong, give it {{ guessCount }} more shot!</small
              >
              <input
                class="w-full h-12 bg-gray-100 p-2 rounded-lg outline-none"
                type="text"
                v-model="placeholder.name"
                placeholder="Placeholder"
              />
              <p class="text-sm font-medium">You have three windows to guess</p>

              <button
                @click="handleSubmit"
                class="btn bg-main w-full rounded-3xl capitalize"
              >
                Yes
              </button>
              <button
                @click="handleDetails"
                class="btn w-full bg-white border-[1px] border-main text-main rounded-3xl capitalize"
              >
                No, Proceed
              </button>
            </form>
            <div v-if="formProceed" class="flex flex-col gap-7 my-4">
              <small class="font-medium leading-6 text-black flex items-center">
                <span
                  class="mdi mdi-alert-circle text-red-500 text-2xl pr-2"
                ></span>
                Limit exceeded! Proceed to view sender</small
              >
              <button
                @click="handleDetails"
                class="btn bg-main w-full rounded-3xl capitalize"
              >
                Proceed
              </button>
            </div>
            <p class="text-sm font-medium pt-4">
              Not to worry, we will not notify the sender on wrong guesses
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
  </div>
</template>
<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../composables/useStore";

// get order details and data from store
const { getOrderDetails, data, isLoading } = useStore();

const senderName = computed(() => {
  return data.value?.senderName;
});

// router
const router = useRouter();
const route = useRoute();

// progress bar
const progress = ref<number>(70);

// Cleanup when component is unmounted
onMounted(() => {
  getOrderDetails(route.query.id);
});

// trial count
const trialCount = ref<number>(1);
const guessCount = ref<number>(3);
interface name {
  name: string;
}
const form = ref<boolean>(true);
const formProceed = ref<boolean>(false);
const placeholder = ref<name>({
  name: "",
});
// Form Validation
const rules = {
  name: { required },
};
const v$ = useVuelidate(rules, placeholder);
const errorValidate = (): boolean => {
  if (placeholder.value.name !== "") {
    return placeholder.value.name !== senderName.value;
  }
  return false;
};

const handleSubmit = () => {
  if (v$.value.$invalid || placeholder.value.name !== senderName.value) {
    v$.value.$validate();
    scrollTo({ top: 0 });
    trialCount.value += 1;
    guessCount.value = 4 - trialCount.value;
    if (trialCount.value >= 4) {
      form.value = false;
      formProceed.value = true;
    }
  } else {
    console.log(senderName.value);
    router.push({
      path: "/details",
      query: {
        id: route.query.id,
      },
    });
  }
};

const handleDetails = () => {
  router.push({
    path: "/details",
    query: { id: route.query.id },
  });
};
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

.drop-shadow {
  box-shadow: 0px 0.7499999403953552px 2.249999761581421px 0.7499999403953552px
    #00000026;
}
</style>
