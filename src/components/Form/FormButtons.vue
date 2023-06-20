<script setup>
import { defineProps, defineEmits, computed, inject } from 'vue';

const props = defineProps(['currentStep', 'maxSteps', 'currentGuestIndex', 'guests', 'formData']);
const emits = defineEmits(['next', 'previous', 'submit']);
const errorFlag = inject('errorFlag');

const showBackButton = computed(() => {
  if (props.currentStep === 1) {
    return false
  }

  else if (props.currentStep === 2) {
    return true
  }

  else if (props.currentStep === 3) {
    return true
  }

  else if (props.currentStep === 4) {
    return false
  }
});

const showNextButton = computed(() => {
  if (props.currentStep === 1) {
    return true;
  }

  else if (props.currentStep === 2) {
    if (props.formData.guestCount === 0) {
      return false;
    }
    else {
      return true;
    }
  }

  else if (props.currentStep === 3) {
    return props.currentGuestIndex < props.guests.length - 1;
  }
});

const showSubmitButton = computed(() => {
  if (props.currentStep === 2 && (props.formData.guestCount === 0)){
    return true
  }

  else if (props.currentStep === 3 && props.currentGuestIndex === props.guests.length -1) {
    return true;
  }

  else {
    return false
  }
});

</script>

<template>
  <div class="navigation-buttons">
    <button class="radius-small" v-if="showBackButton" @click="$emit('previous')">Back</button>
    <button class="radius-small" v-if="showNextButton" @click="$emit('next')" :disabled="errorFlag">Next</button>
    <button class="radius-small" v-if="showSubmitButton" @click="$emit('submit')" :disabled="errorFlag">Submit</button>
  </div>
</template>

<style scoped>
.navigation-buttons {
  display: flex;
  justify-content: space-around;
}
</style>
