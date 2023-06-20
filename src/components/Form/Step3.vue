<script setup>
import {computed, onMounted, ref, watch, defineProps, defineEmits} from 'vue';
import DietaryOptions from "@/components/FormFields/DietaryOptions.vue";
import { saveFormData, loadFormData } from '@/js/formUtils.js';
import InputBox from "@/components/FormFields/InputBox.vue";
import ErrorLabel from "@/components/FormFields/ErrorLabel.vue";

const props = defineProps(['formData', 'currentGuestIndex']);
const emits = defineEmits(['update', 'next', 'previous', 'submit', 'hasErrors']);

const currentGuestIndex = ref(props.currentGuestIndex);
const formData = ref(props.formData);

const guests = computed(() => props.formData.guests);
const currentGuest = computed(() => guests.value[props.currentGuestIndex]);

const updateGuestName = (name) => {
  currentGuest.value.name = name;
  saveGuestData(); // Save the guest data after updating the name
};

watch(currentGuest, () => {
  saveGuestData(); // Save the guest data whenever it changes
}, { deep: true });

const loadGuestData = () => {
  const savedData = loadFormData();
  if (savedData && savedData.guests && savedData.guests[currentGuestIndex.value]) {
    Object.assign(currentGuest.value, savedData.guests[currentGuestIndex.value]);
  }
};

const saveGuestData = () => {
  const savedData = loadFormData() || { guests: [] };
  savedData.guests[currentGuestIndex.value] = currentGuest.value;
  saveFormData(savedData);
};

onMounted(() => {
  loadGuestData(); // Load guest data when the component is mounted
});

const handleGuestUpdate = (updatedGuest) => {
  const updatedGuests = [...guests.value]; // Create a new array
  updatedGuests[currentGuestIndex.value] = updatedGuest;
  emits('update', { guests: updatedGuests });
  currentGuest.value = updatedGuest; // Update currentGuest object
};

// Validation Logic
const validateFormFields = () => {
  if (currentGuest.value.name.length < 2) {
    emits('hasErrors', true);
  } else {
    emits('hasErrors', false);
  }
}

</script>

<template>
  <div class="step-3">
    <h3>Guest {{ props.currentGuestIndex + 1 }}</h3>
    <InputBox
        label="Name"
        :value="currentGuest.name"
        @update:value="updateGuestName"
        @input="validateFormFields"
    />
    <ErrorLabel
        :show-error="currentGuest.name.length < 2"
        errorMessage="* Please enter a valid name (must be 2 characters or more)."
    />
    <div>
      <DietaryOptions
          :guest="currentGuest"
          @update:dietaryOptions="handleGuestUpdate"
      />
    </div>
  </div>
</template>
<style scoped>
h3 {
  line-height: 1;
  margin: 0;
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .step-3 {
  font-size: 0.75em;
  }
}
</style>