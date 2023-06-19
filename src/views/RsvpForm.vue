<script setup>
import { ref, reactive, provide, onBeforeMount, watch} from 'vue';
import { saveFormData, loadFormData } from '@/js/formUtils.js';
import Step1 from "@/components/Form/Step1.vue";
import Step2 from "@/components/Form/Step2.vue";
import Step3 from "@/components/Form/Step3.vue";
import FormButtons from "@/components/Form/FormButtons.vue";
import CustomHR from "@/components/CustomHR.vue";

// Define the number of maximum steps in the form
const maxSteps = 3;

// Reactive variables to store the current step and form data
const currentStep = ref(1);
const formData = reactive({
  attendance: '',
  name: '',
  phone: '',
  email: '',
  dietaryOptions: {
    vegetarian: false,
    vegan: false,
    glutenFree: false,
    nutFree: false,
    dairyFree: false,
    other: false,
    otherText: '',
    showOtherTextArea: false,
  },
  guestCount: 0,
  guests: [],
  // There are no errors when the form is initialized.
  errorFlag: false,
});

// Error Function Handling
// Provide the error flag to all child components.
provide('errorFlag', formData.errorFlag);
const errorHandler = (value) => {
  formData.errorFlag = value;
};


// Reactive variable to store the current guest index
const currentGuestIndex = ref(0)

// Load the form data from cache when the component is mounted
onBeforeMount(() => {
  const savedData = loadFormData();
  if (savedData) {
    Object.assign(formData, savedData);
  }
});

watch(formData, () => {
  saveFormData(formData);
}, { deep: true });

// Function to go to the next step
const nextStep = () => {
  if (formData.errorFlag === false) {
    if (currentStep.value === 1) {
      currentStep.value++;
    } else if (currentStep.value === 2) {
      currentStep.value++
    } else if (currentStep.value === 3) {
      if (currentGuestIndex.value === formData.guestCount) {
        submitForm();
      } else {
        currentGuestIndex.value++;
      }
    }
  }
};

// Function to go to the previous step
const previousStep = () => {
  if (currentStep.value === 2) {
    currentStep.value--;
  } else if (currentStep.value === 3) {
    if (currentGuestIndex.value === 0) {
      currentStep.value--;
    } else {
      currentGuestIndex.value--;
    }
  }
};

// Function to submit the form
const submitForm = () => {
  if (formData.errorFlag === false) {
    fetch('https://script.google.com/macros/s/AKfycbyLF83P5XTQx262Fxyn7MNrQF58qHRaRWGcQl0mBYDEfxv5fMpwTDAGvRQw-ITe-MdDdA/exec', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
        .then(response => response.json())
        .then(data => {
          console.log('Form submitted successfully', data);
          // Handle the success response
        })
        .catch(error => {
          console.error('Error submitting the form', error);
          // Handle the error
        });
  } else {
    console.log("Form validation errors exist, cannot proceed.");
  }
};

// Function to handle form data update from child components
const handleFormDataUpdate = (updatedFormData) => {
  Object.assign(formData, updatedFormData);
};

</script>

<template>
  <div class="rsvp-form border-bw">
    <div class="dome-spacer"></div>
    <h2 v-if="currentStep === 1">Step 1</h2>
    <h2 v-if="currentStep === 2">Step 2: Your Information</h2>
    <h2 v-if="currentStep === 3">Step 3: Additional Guests Information</h2>
    <p class="validation-info">Required fields are marked with an asterisk *</p>

    <CustomHR />

    <div class="container" v-if="currentStep === 1">
      <Step1
          :formData="formData"
          @hasErrors="errorHandler"
          @update="handleFormDataUpdate"
          @next="nextStep"
      />
    </div>
    <div class="container" v-else-if="currentStep === 2">
      <Step2
          :formData="formData"
          @hasErrors="errorHandler"
          @update="handleFormDataUpdate"
          @next="nextStep"
          @previous="previousStep" />
    </div>
    <div class="container" v-else-if="currentStep === 3">
      <Step3
          :formData="formData"
          :currentGuestIndex="currentGuestIndex"
          @hasErrors="errorHandler"
          @update="handleFormDataUpdate"
          @next="nextStep"
          @previous="previousStep" />
    </div>

    <FormButtons
        :currentStep="currentStep"
        :maxSteps="maxSteps"
        :currentGuestIndex="currentGuestIndex"
        :guests="formData.guests"
        @next="nextStep"
        @previous="previousStep"
        @submit="submitForm"
        :disabled="formData.errorFlag === true"
    />
  </div>
</template>

<style scoped>
  .rsvp-form {
    border-radius: 500px 500px 0 0;
    width: 90%;
    margin: 20px auto auto;
    padding: var(--sp-s);
    display: flex;
    flex-flow: column wrap;
    justify-content: center;
    color: var(--htext);
  }

  .dome-spacer {
    height: 200px;
    width: 100%;
  }

  .rsvp-form h2 {
    font-size: var(--type-h4);
    margin: 0;
  }

  .validation-info {
    font-size: var(--type-xs);
    line-height: 0.5em;
  }

  .container {
    margin-bottom: 30px;
  }
</style>