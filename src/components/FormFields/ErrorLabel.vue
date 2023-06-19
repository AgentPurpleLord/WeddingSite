<template>
  <p class="error-label" v-if="showError">{{ errorMessage }}</p>
</template>

<script setup>
const props = defineProps ({
  showError: { type: Boolean, required: true },
  errorMessage: { type: String, required: true },
});

</script>

<style scoped>
  .error-label {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
</style>