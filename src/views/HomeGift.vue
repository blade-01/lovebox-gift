<template>
  <div
    class="w-full h-full xl:h-screen mt-8 xl:mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
  >
    <div class="container">
      <router-link :to="{ name: 'home' }">
        <img
          class="mx-auto mb-3 w-auto relative z-[9999]"
          src="/img/logo.svg"
          alt="logo"
      /></router-link>
      <div
        class="flex flex-col items-center place-content-center m-auto bg-white shadow-xl rounded-3xl py-10 px-6 xl:py-6 xl:px-2 md:w-[488px] relative z-[9999]"
      >
        <div class="progress-bar">
          <div class="progress" :style="{ width: `${progress}%` }"></div>
        </div>
        <div class="flex flex-col gap-4">
          <h1
            class="font-bold text-center text-lg md:text-4xl text-black tracking-wide"
          >
            Unveil the sender:
          </h1>
          <p
            class="font-bold text-center text-lg md:text-4xl text-black tracking-wide"
          >
            Can you guess?
          </p>
        </div>
        <form
          autocomplete="off"
          @submit.prevent
          class="flex flex-col gap-4 my-4 md:w-[300px]"
          v-if="form"
        >
          <div class="flex justify-between items-center flex-wrap gap-2">
            <p class="text-sm font-medium">Gifted from who?</p>
            <p class="text-sm font-medium">{{ trialCount }}/3 trials</p>
          </div>
          <small
            class="font-medium leading-6 text-black flex items-center"
            :class="{ 'err-message': v$.name.$error }"
            v-if="v$.name.$error"
          >
            <span
              class="mdi mdi-alert-circle text-red-500 text-2xl pr-2"
            ></span>
            Your guess is wrong, give it 2 more shot!</small
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
            Submit
          </button>
          <router-link :to="{ name: 'home-lovebox-details' }">
            <button
              class="btn w-full bg-white border-[1px] border-main text-main rounded-3xl capitalize"
            >
              Skip
            </button>
          </router-link>
        </form>
        <div v-if="formProceed" class="flex flex-col gap-7 my-4 md:w-[300px]">
          <small class="font-medium leading-6 text-black flex items-center">
            <span
              class="mdi mdi-alert-circle text-red-500 text-2xl pr-2"
            ></span>
            Limit exceeded! Proceed to view sender</small
          >
          <router-link :to="{ name: 'home-lovebox-details' }">
            <button class="btn bg-main w-full rounded-3xl capitalize">
              Proceed
            </button>
          </router-link>
        </div>
        <p class="text-sm font-medium pt-4">
          Not to worry, we will not notify the sender on wrong guesses
        </p>
      </div>
    </div>
    <div class="animation-container">
      <div
        class="circle"
        :style="{
          backgroundImage: `url(${animateCircle[currentAnimateIndex]})`,
        }"
      ></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { useRouter } from "vue-router";

// router
const router = useRouter();
// progress bar
const progress = ref<number>(70);

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

const currentAnimateIndex = ref<number>(0);

const changeImage = () => {
  currentAnimateIndex.value =
    (currentAnimateIndex.value + 1) % animateCircle.length;
};

// Automatically change image every 3 second
const intervalidCircle = setInterval(changeImage, 3000);

// Cleanup when component is unmounted
onMounted(() => {
  watchEffect(() => {
    return () => clearInterval(intervalidCircle);
  });
});

// trial count
const trialCount = ref<number>(1);
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

const handleSubmit = () => {
  if (v$.value.$invalid) {
    v$.value.$validate();
    scrollTo({ top: 0 });
    trialCount.value += 1;
    if (trialCount.value >= 3) {
      form.value = false;
      formProceed.value = true;
    }
  } else {
    console.log(placeholder.value);
    router.push({
      name: "home-lovebox-details",
      query: {
        name: placeholder.value.name,
      },
    });
  }
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
  @apply h-1 bg-primary border-[1px] border-[#644AE2] rounded-lg overflow-hidden w-[250px] md:w-[280px] m-[20px];
}
.progress {
  @apply h-full bg-[#644AE2];
}
</style>
