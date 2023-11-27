<template>
  <div
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
          <div class="progress-bar">
            <div class="progress" :style="{ width: `${progress}%` }"></div>
          </div>
          <div class="text-center flex flex-col gap-2 my-4">
            <img
              class="mx-auto"
              src="/img/lovebox-sender.svg"
              alt="lovebox-sender"
            />
            <h1 class="text-2xl font-semibold leading-8 text-priBlack">
              Thank you!
            </h1>
            <p class="text-priGray text-base leading-6 max-w-[327px] py-4">
              We hope you enjoyed your experience with Lovebox. We would love
              for you to join our customer family.
            </p>
          </div>
          <div class="text-center flex flex-col gap-4 md:w-[300px]">
            <a
              href="https://www.lovebox.africa/wait"
              target="_blank"
              class="btn bg-main text-white md:text-lg leading-7 font-semibold w-full rounded-3xl capitalize h-12"
            >
              Join our waitlist
            </a>
            <a
              href="https://www.lovebox.africa"
              target="_blank"
              class="btn bg-white border-[1px] border-main text-main md:text-lg leading-7 font-semibold w-full rounded-3xl capitalize h-12"
            >
              View our website
            </a>
            <p class="leading-6 font-medium py-3 text-base">
              Tell the world about Love Box! click
              <ShareNetwork
                network="whatsapp"
                :url="`http://localhost:3334/shipment?id=${$route.query.id}`"
                title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                description="This week, I’d like to introduce you to 'Vite', which means 'Fast'. It’s a brand new development setup created by Evan You."
                quote="The hot reload is so fast it\'s near instant. - Evan You"
                hashtags="vuejs,vite"
              >
                <span class="text-main underline font-bold cursor-pointer"
                  >here.</span
                >
              </ShareNetwork>
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
// router
const router = useRouter();
const route = useRoute();
const progress = ref(100);

// rating
const handleRating = () => {
  router.push({
    path: "/rating",
    query: {
      id: route.query.id,
    },
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
</style>
