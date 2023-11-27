<template>
  <!-- :class="shortNote ? 'lg:h-auto lg:mt-10' : 'lg:h-screen lg:mt-auto'" -->
  <div
    class="w-full h-full mt-8 relative flex flex-col items-center place-content-center m-auto bg-white overflow-hidden lg:h-auto lg:mt-10 1xl:h-screen 1xl:mt-0"
  >
    <div class="container">
      <router-link to="/">
        <img class="mx-auto mb-3 w-auto relative z-[9999]" src="/img/logo.svg" alt="logo"
      /></router-link>
      <div class="p-0.5 relative z-[9999]">
        <div
          class="flex flex-col items-center place-content-center m-auto bg-secBg shadow-xl rounded-3xl py-8 px-5 md:w-[488px] drop-shadow"
        >
          <div class="w-full">
            <div class="text-center flex flex-col gap-2 my-4">
              <img class="mx-auto" src="/img/home-mark.svg" alt="home mark" />
              <h1 class="text-xl font-semibold leading-7 text-priBlack">
                Unboxed and finished! Rate us
              </h1>
            </div>
            <div class="grid grid-cols-1 gap-3">
              <div class="grid grid-cols-1 gap-2">
                <p class="text-sm leading-5 font-medium text-priGray">
                  How Satisfied are you with LoveBox?
                </p>
                <div class="grid grid-cols-5 gap-2">
                  <div
                    v-for="(count, index) in rate"
                    :key="index"
                    class="h-[48px] lg:h-[60px] rounded-lg text-center flex items-center justify-center font-medium text-xl cursor-pointer"
                    :class="
                      count.isActive ? 'bg-main text-white' : 'bg-[#E9E6FA] text-main'
                    "
                    @click="submitRating(count)"
                  >
                    {{ count.rate }}
                  </div>
                </div>
                <div class="flex justify-between items-center text-priGray text-[12px]">
                  <p>Not Satisfied</p>
                  <p>Very Satisfied</p>
                </div>
                <div class="mt-3">
                  <div class="flex justify-between items-center font-medium">
                    <p class="text-sm leading-5">Write a short review</p>
                    <p
                      class="text-[12px] leading-5"
                      :class="{
                        'text-red-600': err || characterCount >= 50,
                      }"
                    >
                      {{ characterCount }}/50 Characters
                    </p>
                  </div>
                  <textarea
                    v-model="reviewText"
                    type="text"
                    class="bg-[#F3F2F5] rounded-lg h-20 w-full px-4 py-2 outline-none mt-2 text-[#989898]"
                    placeholder="Placeholder"
                    @input="updateCharacterCount"
                    :class="{
                      'border-[1px] border-red-600': err || characterCount >= 50,
                    }"
                  />
                </div>
              </div>
              <!-- v-if="shortNote" -->
              <button
                @click="handleSubmit"
                class="btn bg-main border-[1px] border-main text-white md:text-lg leading-7 font-semibold w-full rounded-3xl capitalize h-[48px]"
              >
                <span
                  v-if="isLoading === true"
                  class="mdi mdi-loading animate-spin"
                ></span>
                <span v-else>Submit</span>
              </button>
              <button
                @click="handleCancelSubmit"
                class="btn bg-white border-[1px] border-main text-main md:text-lg leading-7 font-semibold w-full rounded-3xl capitalize h-[48px]"
              >
                No, Close
              </button>
              <p class="leading-6 font-medium py-3 text-base text-center">
                Tell the world about Love Box! click
                <!-- <ShareNetwork
                  network="whatsapp"
                  :url="`http://localhost:3334/shipment?id=${$route.query.id}`"
                  title="Say hi to Vite! A brand new, extremely fast development setup for Vue."
                  description="This week, I'd like to introduce you to 'Vite', which means 'Fast'. It's a brand new development setup created by Evan You."
                  quote="The hot reload is so fast it\'s near instant. - Evan You"
                  hashtags="vuejs,vite"
                >
                  <span class="text-main underline font-bold cursor-pointer">here.</span>
                </ShareNetwork> -->
              </p>
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
  </div>
</template>
<script setup lang="ts">
// send review from store
const { postReviews, getOrderDetails, data, isLoading } = useStore();
const id = computed(() => {
  return data.value?.id;
});

// home rating
const router = useRouter();
const route = useRoute();
const characterCount = ref(0);
const reviewText = ref<string>("");
const err = ref<boolean>(false);

const updateCharacterCount = () => {
  characterCount.value = reviewText.value.length;

  // Limit the text to 50 characters
  if (characterCount.value > 50) {
    reviewText.value = reviewText.value.slice(0, 50);
    characterCount.value = 50;
  }

  // Check if reviewText is empty and update err accordingly
  err.value = reviewText.value.trim() === "";
};

// short note
const shortNote = ref(false);
// rating
const rate = ref([
  { id: 1, rate: 1, isActive: false },
  { id: 2, rate: 2, isActive: false },
  { id: 3, rate: 3, isActive: false },
  { id: 4, rate: 4, isActive: false },
  { id: 5, rate: 5, isActive: false },
]);
const submitRating = (count: any) => {
  // Iterate through the rate array and update isActive property
  rate.value.forEach((item) => {
    if (item.id === count.id) {
      item.isActive = !item.isActive;
    } else {
      item.isActive = false;
    }
  });

  shortNote.value = count.isActive;
  // submit rating to router
  router.push({
    query: {
      id: route.query.id,
      rating: count.rate,
    },
  });
};

const handleSubmit = () => {
  if (reviewText.value === "") {
    err.value = true;
  } else {
    interface review {
      orderID: any;
      review: string;
      actor: string;
      rating: number;
    }
    const rating = Number(route.query.rating);
    const payload = ref<review>({
      orderID: id.value,
      review: reviewText.value,
      actor: "beneficiary",
      rating: isNaN(rating) ? 0 : rating,
    });
    postReviews(payload.value);
  }
};

const handleCancelSubmit = () => {
  router.push({
    path: "/thanks",
    query: {
      id: route.query.id,
    },
  });
};

const progress = ref(100);

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
.box {
}
</style>
