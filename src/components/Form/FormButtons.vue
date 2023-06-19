<script setup>
import {defineProps, defineEmits, computed, inject } from 'vue';

const props = defineProps(['currentStep', 'maxSteps', 'currentGuestIndex', 'guests']);
const emits = defineEmits(['next', 'previous', 'submit']);
const errorFlag = inject('errorFlag');


const showBackButton = computed(() => {
  return props.currentStep > 1 || (props.currentStep === 1 && props.currentGuestIndex > 0);
});

const showNextButton = computed(() => {
  return (
      props.currentStep < props.maxSteps ||
      (props.currentStep === props.maxSteps && props.currentGuestIndex < props.guests.length - 1)
  );
});

const showSubmitButton = computed(() => {
  return props.currentStep === props.maxSteps && props.currentGuestIndex === props.guests.length - 1;
});


</script>

<template>
  <div class="navigation-buttons">
    <button class="radius-small" v-if="showBackButton" @click="$emit('previous')">Back</button>
    <button class="radius-small" v-if="showNextButton" @click="$emit('next')" :disabled="errorFlag === true">Next</button>
    <button class="radius-small" v-if="showSubmitButton" @click="$emit('submit')" :disabled="errorFlag === true">Submit</button>
  </div>
</template>

<style scoped>
.navigation-buttons {
  display: flex;
  justify-content: space-around;
}
</style>