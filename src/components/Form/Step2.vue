<template>
  <div>
    <InputBox
      label="Name"
      :value="formData.name"
      @update:value="updateFormData('name', $event)"
      @input="validateFormFields"
    />
    <ErrorLabel
      :show-error="formData.name.length < 2"
      errorMessage="* Please enter a valid name (must be 2 characters or more)."
    />

    <InputBox
      label="Phone Number"
      :value="formData.phone"
      @update:value="updateFormData('phone', $event)"
      @input="validateFormFields"
    />
    <ErrorLabel
      :show-error="!isValidPhoneNumber(formData.phone)"
      errorMessage="* Please enter a valid phone number, e.g. 0400 001 002."
    />

    <InputBox
      label="Email"
      :value="formData.email"
      @update:value="updateFormData('email', $event)"
      @input="validateFormFields"
    />
    <ErrorLabel
      :show-error="!isValidEmail(formData.email)"
      errorMessage="* Please enter a valid email, e.g. hello@gmail.com."
    />

    <div class="dietary-options">
      <h3>Dietary Requirements</h3>
      <label>
        <input type="checkbox" v-model="userDiet.vegetarian" /> Vegetarian
      </label>
      <label> <input type="checkbox" v-model="userDiet.vegan" /> Vegan </label>
      <label>
        <input type="checkbox" v-model="userDiet.glutenFree" /> Gluten-Free
      </label>
      <label>
        <input type="checkbox" v-model="userDiet.nutFree" /> Nut-Free
      </label>
      <label>
        <input type="checkbox" v-model="userDiet.dairyFree" /> Dairy Free
      </label>
      <label>
        <input type="checkbox" v-model="userDiet.other" @change="toggleOther" />
        Other
      </label>
      <textarea
        v-if="userDiet.other"
        v-model="userDiet.otherText"
        placeholder="Please specify"
      ></textarea>
    </div>

    <div class="guest-counter">
      <h3>Additional Guests:</h3>
      <p>Who is coming along with you?</p>
      <div class="guest-stepper">
        <button class="minus" @click="decrementGuestCount">-</button>
        <input
          class="border-bw"
          type="number"
          :value="guestCount"
          min="0"
          :max="7"
        />
        <button class="plus" @click="incrementGuestCount">+</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { saveFormData } from "@/js/formUtils.js";
import InputBox from "@/components/FormFields/InputBox.vue";
import ErrorLabel from "@/components/FormFields/ErrorLabel.vue";

const props = defineProps(["formData", "showOtherTextArea"]);
const emits = defineEmits(["update", "hasErrors"]);

const formData = ref(props.formData);
const guestCount = ref(props.formData.guestCount);
const guestList = ref(props.formData.guests);
const userDiet = ref(props.formData.dietaryOptions);

watch(formData, (newFormData) => {
  emits("update", newFormData);
  saveFormData(newFormData);
});

watch(guestCount, (newGuest) => {
  emits("update", { guestCount: newGuest, guests: guestList.value });
  saveFormData(props.formData);
});

watch(userDiet, (newDietaryOptions) => {
  emits("update", { dietaryOptions: newDietaryOptions });
  saveFormData(props.formData);
});

const decrementGuestCount = () => {
  if (guestCount.value > 0) {
    guestCount.value--;
    guestList.value.pop();
  }
};

const incrementGuestCount = () => {
  if (guestCount.value < 7) {
    guestCount.value++;
    guestList.value.push({
      guestNum: guestCount.value,
      name: "",
      dietaryOptions: {
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        nutFree: false,
        dairyFree: false,
        other: false,
        otherText: "",
        showOtherTextArea: false,
      },
    });
  }
};

const toggleOther = () => {
  userDiet.showOtherTextArea = !userDiet.showOtherTextArea;
};

const isValidPhoneNumber = (phone) => {
  const phoneNumberPattern = /^(?:\d{4}[\s-]?\d{3}[\s-]?\d{3}|\d{2}[\s-]?\d{4}[\s-]?\d{4}|\d{8}|\d{10})$/;
  return phone.match(phoneNumberPattern) !== null;
};

const isValidEmail = (email) => {
  return email.includes("@");
};

const validateFormFields = () => {
  if (formData.value.name.length < 2) {
    emits("hasErrors", true);
  }
  if (!isValidEmail(formData.value.email)) {
    emits("hasErrors", true);
  }
  if (!isValidPhoneNumber(formData.value.phone)) {
    emits("hasErrors", true);
  } else if (
    formData.value.name.length > 2 &&
    isValidEmail(formData.value.email) &&
    isValidPhoneNumber(formData.value.phone)
  ) {
    emits("hasErrors", false);
  }
};

const updateFormData = (field, value) => {
  formData.value[field] = value;
};
</script>

<style scoped>
.dietary-options {
  display: flex;
  flex-flow: column nowrap;
  gap: 20px;
  margin: var(--sp-s) 0;
}

.dietary-options label {
  font-size: var(--type-body);
}

input[type="checkbox"] {
  width: 30px;
  height: 30px;
  vertical-align: middle;
  margin-top: -5px;
}

.guest-counter {
  margin: 30px 0;
  width: 100%;
}

.guest-counter h3 {
  margin-bottom: var(--sp-xxs);
}

.guest-counter p {
  margin-top: 0;
}

.guest-counter label {
  font-size: var(--type-body);
}

.guest-stepper {
  display: flex;
  justify-content: end;
  align-items: center;
  height: 50px;
}

.guest-stepper button {
  width: 40%;
  height: 100%;
}

.plus {
  border-radius: 0 10px 10px 0;
}

.minus {
  border-radius: 10px 0 0 10px;
}

.guest-stepper input {
  width: 60%;
  height: 90%;
  text-align: center;
  font-size: var(--type-body);
  -webkit-appearance: none;
  -moz-appearance: textfield;
}
</style>