<template>
  <div
    v-if="data"
    class="w-full h-screen mt-auto relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden"
  >
    <div class="container">
      <router-link :to="`/order/${id}`">
        <img class="mx-auto mb-3 w-auto relative z-[9999]" src="/img/logo.svg" alt="logo"
      /></router-link>
      <div class="p-0.5">
        <div
          class="flex flex-col items-center place-content-center m-auto bg-secBg shadow-xl rounded-3xl py-8 px-5 md:w-[488px] drop-shadow relative z-[9999]"
        >
          <div class="text-center flex flex-col gap-2 my-4">
            <img class="mx-auto" src="/img/note.svg" alt="note" />
          </div>
          <p class="text-center text-base flex flex-col gap-2 md:w-[360px]">
            {{ notes !== null ? notes : "No Note is available 😊" }}
          </p>
          <div class="text-center pt-4">
            <p class="font-meowScript text-2xl" v-if="isAnonymous === false">
              {{ senderName }}
            </p>
            <p
              class="text-main underline font-bold pt-2 leading-6 cursor-pointer"
              @click="back"
            >
              Back
            </p>
          </div>
        </div>
      </div>
    </div>
    <animate-circle-bg />
  </div>
</template>
<script setup lang="ts">
import { ResponseData } from "../../../types/ResponseData";

const props = defineProps<{
  id: string;
  data: ResponseData | undefined;
}>();

const emits = defineEmits(["gotoShipment"]);

const notes = computed(() => {
  return props.data?.notes;
});
const isAnonymous = computed(() => {
  return props.data?.isAnonymous;
});
const senderName = computed(() => {
  return props.data?.senderName;
});

const back = () => {
  emits("gotoShipment");
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
</style>
