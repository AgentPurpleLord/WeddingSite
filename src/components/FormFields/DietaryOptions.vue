<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps(['guest']);
const emits = defineEmits(['update:guest']);

const updateValue = (key, value) => {
  emits('update:guest', { ...props.guest, dietaryOptions: { ...props.guest.dietaryOptions, [key]: value } });
};
</script>

<template>
  <div class="dietary-options">
    <h3>Dietary Requirements</h3>
    <label>
      <input type="checkbox" v-model="props.guest.dietaryOptions.vegetarian" @change="updateValue('vegetarian', props.guest.dietaryOptions.vegetarian)" /> Vegetarian
    </label>
    <label>
      <input type="checkbox" v-model="props.guest.dietaryOptions.vegan" @change="updateValue('vegan', props.guest.dietaryOptions.vegan)" /> Vegan
    </label>
    <label>
      <input type="checkbox" v-model="props.guest.dietaryOptions.glutenFree" @change="updateValue('glutenFree', props.guest.dietaryOptions.glutenFree)" /> Gluten-Free
    </label>
    <label>
      <input type="checkbox" v-model="props.guest.dietaryOptions.nutFree" @change="updateValue('nutFree', props.guest.dietaryOptions.nutFree)" /> Nut-Free
    </label>
    <label>
      <input type="checkbox" v-model="props.guest.dietaryOptions.dairyFree" @change="updateValue('dairyFree', props.guest.dietaryOptions.dairyFree)" /> Dairy Free
    </label>
    <label>
      <input type="checkbox" v-model="props.guest.dietaryOptions.other" @change="updateValue('other', props.guest.dietaryOptions.other)" /> Other
    </label>
    <label class="other-diet-label" v-if="props.guest.dietaryOptions.other">Please specify what we missed</label>
    <textarea class="other-diet border-bw" v-if="props.guest.dietaryOptions.other" v-model="props.guest.dietaryOptions.otherText" @input="updateValue('otherText', props.guest.dietaryOptions.otherText)"></textarea>
  </div>
</template>

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

.other-diet {
  height: 200px;
  font-size: var(--type-sm);
}

.other-diet-label {
  font-size: var(--type-sm) !important;
}
</style>