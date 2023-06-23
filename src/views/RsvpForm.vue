<script setup>
import { ref, reactive, provide } from 'vue';
import Step1 from "@/components/Form/Step1.vue";
import Step2 from "@/components/Form/Step2.vue";
import Step3 from "@/components/Form/Step3.vue";
import FormButtons from "@/components/Form/FormButtons.vue";
import CustomHR from "@/components/CustomHR.vue";
import FormSuccess from "@/components/Form/FormSuccess.vue";

// Define the number of maximum steps in the form
const maxSteps = 4;

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
const errorFlag = ref(formData.errorFlag);
const errorHandler = (value) => {
  formData.errorFlag = value;
};
provide('errorFlag', errorFlag.value);


// Reactive variable to store the current guest index
const currentGuestIndex = ref(0)

// Function to go to the next step
const nextStep = () => {
  console.log(formData.guests.length);
  if (formData.errorFlag === false) {
    if (currentStep.value === 1) {
      currentStep.value = 2;
    }

    else if (currentStep.value === 2 && formData.guests.length > 0) {
      currentStep.value = 3;
    }

    else if (currentStep.value === 2 && formData.guests.length === 0) {
      currentStep.value = 4;
      currentGuestIndex.value = 0;
    }

    else if (currentStep.value === 3) {
      if (currentGuestIndex.value >= formData.guests.length) {
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
    currentStep.value = 1;
  }

  else if (currentStep.value === 3) {
    if (currentGuestIndex.value === 0) {
      currentStep.value = 2;
    }
    else {
      currentGuestIndex.value--;
    }
  }

  else if (currentStep.value === 4) {
    if (formData.guests.length === 0) {
      currentStep.value = 2;
    }
    else if (formData.guests.length > 0) {
      currentStep.value--;
    }
  }
};

// Function to submit the form
const submitForm = () => {
  if (formData.errorFlag === false) {
    currentStep.value = 4;
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


</script>

<template>
  <div class="rsvp-form border-bw">
    <div class="dome-spacer"></div>
    <h2 v-if="currentStep === 1">Step 1</h2>
    <h2 v-if="currentStep === 2">Step 2: Your Information</h2>
    <h2 v-if="currentStep === 3">Step 3: Additional Guests Information</h2>
    <p class="validation-info" v-if="currentStep < 3">Required fields are marked with an asterisk *</p>

    <CustomHR />

    <div class="container" v-if="currentStep === 1">
      <Step1
          :formData="formData"
          @hasErrors="errorHandler"
          @next="nextStep"
      />
    </div>
    <div class="container" v-else-if="currentStep === 2">
      <Step2
          :formData="formData"
          @hasErrors="errorHandler"
          @next="nextStep"
          @previous="previousStep" />
    </div>
    <div class="container" v-else-if="currentStep === 3">
      <Step3
          :formData="formData"
          :currentGuestIndex="currentGuestIndex"
          @hasErrors="errorHandler"
          @next="nextStep"
          @previous="previousStep" />
    </div>
    <div class="container" v-else-if="currentStep === 4">
      <FormSuccess />
    </div>

    <FormButtons
        :currentStep="currentStep"
        :maxSteps="maxSteps"
        :currentGuestIndex="currentGuestIndex"
        :guests="formData.guests"
        :formData="formData"
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
    height: 40vw;
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

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    .rsvp-form {
      border-radius: 1000px 1000px 0 0;
      width: 30%;
      font-size: 0.6em;
      padding: var(--sp-m) var(--sp-xxl);
    }

    .dome-spacer {
      height: 10vw;
    }
  }
</style>