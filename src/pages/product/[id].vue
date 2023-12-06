<template>
  <div>
    <div v-if="currentStep === 'unboxed'">
      <Unboxed
        :data="data"
        :id="(id as string)"
        @goto-shipment="changeStep('shipment')"
        @goto-gift="changeStep('gift')"
      />
    </div>

    <div v-if="currentStep === 'gift'">
      <Gift
        :data="data"
        :id="(id as string)"
        @goto-shipment="changeStep('shipment')"
        @goto-details="changeStep('details')"
      />
    </div>

    <div v-if="currentStep === 'shipment'">
      <Shipment
        :data="data"
        :id="(id as string)"
        @goto-details="changeStep('details')"
        @goto-note="changeStep('note')"
        @goto-rating="changeStep('rating')"
      />
    </div>

    <div v-if="currentStep === 'details'">
      <Details
        :data="data"
        :id="(id as string)"
        @goto-shipment="changeStep('shipment')"
      />
    </div>

    <div v-if="currentStep === 'note'">
      <Note :data="data" :id="(id as string)" @goto-shipment="changeStep('shipment')" />
    </div>

    <div v-if="currentStep === 'rating'">
      <Rating
        :data="data"
        :id="(id as string)"
        @goto-shipment="changeStep('shipment')"
        @goto-thanks="changeStep('thanks')"
      />
    </div>

    <div v-if="currentStep === 'thanks'">
      <Thanks :id="(id as string)" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { getOrderDetails, data } = useStore();
const { id } = useRoute().params;
type types = "unboxed" | "gift" | "shipment" | "details" | "note" | "rating" | "thanks";
const currentStep = ref("unboxed");
const router = useRouter();
const changeStep = (type: any) => {
  router.push({
    query: {
      type: type,
    },
  });
  switch (type) {
    case "shipment":
      currentStep.value = "shipment";
      break;
    case "details":
      currentStep.value = "details";
      break;
    case "rating":
      currentStep.value = "rating";
      break;
    case "gift":
      currentStep.value = "gift";
      break;
    case "note":
      currentStep.value = "note";
      break;
    case "thanks":
      currentStep.value = "thanks";
      break;
    default:
      break;
  }
};

// Update current step based on query param
watchEffect(() => {
  const type = router.currentRoute.value.query.type as types;
  currentStep.value = type;
});

onMounted(() => {
  getOrderDetails(id);
});
</script>
