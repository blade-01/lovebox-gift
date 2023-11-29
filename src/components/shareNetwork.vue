<template>
  <div class="w-full p-2 lg:px-4 flex flex-col gap-8">
    <div class="flex justify-between items-center">
      <h1 class="font-semibold leading-8 text-2xl capitalize">share</h1>
      <span
        @click="$emit('openModal', false)"
        class="mdi mdi-close-circle-outline text-2xl cursor-pointer"
      ></span>
    </div>
    <div class="flex justify-between items-center gap-4">
      <div
        v-for="(link, index) in links"
        :key="index"
        @click="switchLinks(link)"
      >
        <ShareNetwork
          :network="link.social"
          url="https://www.lovebox.africa"
          title="Lovebox Africa"
          description="Lovebox aims to revolutionize how you spread love through gifts, subscription payments, and timely reminders for special occasions! Peer into the lives of your friends, family, and loved ones and make them feel cherished with a tap of a button."
        >
          <div
            class="rounded-full bg-gray-300 w-[80px] lg:w-[100px] xl:w-[120px] h-[80px] lg:h-[100px] xl:h-[120px] text-center flex justify-center items-center hover:bg-main hover:text-white text-main cursor-pointer"
          >
            <span :class="`mdi mdi-${link.social} text-4xl xl:text-5xl`"></span>
          </div>
        </ShareNetwork>
      </div>
    </div>
    <div class="flex flex-col gap-3 text-left">
      <p class="capitalize font-medium text-lg">Page link</p>
      <div v-if="isSupported">
        <div class="flex justify-between bg-secBg rounded-xl p-4">
          <p class="text-priGray text-lg">
            <code>{{ text || "https://lovebox.africa" }}</code>
          </p>
          <span
            class="mdi mdi-content-copy text-xl cursor-pointer transition-all ease-in-out duration-100 hover:scale-90"
            @click="copy(source)"
          ></span>
        </div>
      </div>
      <p v-else>Your browser does not support Clipboard API</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useClipboard } from "@vueuse/core";
const source = ref("https://lovebox.africa");
const { text, copy, isSupported } = useClipboard({ source });

const links = ref<any>([
  {
    id: 1,
    social: "whatsapp",
    active: false,
  },
  {
    id: 2,
    social: "twitter",
    active: false,
  },
  {
    id: 3,
    social: "facebook",
    active: false,
  },
]);

// switch links
const switchLinks = (item: any) => {
  const index = links.value.findIndex((element: any) => {
    return element.id === item.id;
  });

  links.value.forEach((element: any, i: any) => {
    if (i !== index) {
      element.active = false;
    }
  });
};
</script>

<style scoped></style>
