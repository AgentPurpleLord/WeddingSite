<script setup>
import {ref, computed, watch } from 'vue';

const props = defineProps({
  label: String,
  value: String,
});

const emits = defineEmits(['update:value']);

const inputValue = ref(props.value);

const updateValue = (newValue) => {
  inputValue.value = newValue;
  emits('update:value', newValue);
};

const computedValue = computed({
  get: () => inputValue.value,
  set: (newValue) => updateValue(newValue)
});

// Watch for changes in the prop value
watch(() => props.value, (newValue) => {
  inputValue.value = newValue;
});


</script>

<template>
  <div class="input-box">
    <label>{{ label }} *</label>
    <input class="radius-xs border-coloured" type="text" v-model="computedValue" />
  </div>
</template>

<style scoped>
  .input-box {
    padding: var(--sp-xs) 0;
  }

  .input-box input, .input-box label {
    display: flex;
    flex-flow: column nowrap;
    column-gap: 20px;
  }

  .input-box input {
    font-size: var(--type-body);
    height: var(--sp-m);
    vertical-align: middle;
  }

  .input-box label {
    font-size: var(--type-sm);
  }

  .error-detected {
    border: 1px solid red !important;
    background-color: hsl(10, 100%, 93%);
  }
</style>