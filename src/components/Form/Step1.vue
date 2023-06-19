<template>
  <div class="attending-radios">
    <h2>Will you be able to attend? *</h2>
    <ErrorLabel
        :show-error="formData.attendance === ''"
        errorMessage="* Please choose one of the attendance options."
    />

    <label for="yes">
      <input type="radio" id="yes" value="yes" v-model="formData.attendance" @input="validateForm" />
      Attending
    </label>

    <label for="no">
      <input type="radio" id="no" value="no" v-model="formData.attendance" @input="validateForm" />
      Not Attending
    </label>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import ErrorLabel from '@/components/FormFields/ErrorLabel.vue';

const props = defineProps(['formData']);
const emits = defineEmits(['update', 'hasErrors']);

const formData = ref(props.formData);

const validateForm = () => {
  if (props.formData.attendance === '') {
    emits('hasErrors', true);
  } else {
    emits('hasErrors', false);
  }
};

watch(() => formData.value.attendance, () => {
  emits('update', { attendance: formData.value.attendance });
  validateForm();
});

onMounted(() => {
  validateForm();
});
</script>

<style scoped>
  h2 {
    font-size: var(--type-body);
  }

  .attending-radios {
    display: flex;
    flex-flow: column nowrap;
  }

  .attending-radios label {
    padding-top: var(--sp-xs);
    padding-bottom: var(--sp-xs);
    font-size: var(--type-body);
  }
  input[type="radio"] {
    width: 30px;
    height: 30px;
    transition: 250ms ease-in-out;
    vertical-align: middle;
    margin-top: -5px;
    margin-right: var(--sp-xs);
  }
</style>
