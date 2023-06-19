<script setup>
import { ref } from 'vue';

const pick = ref('');
</script>

<template>
  <div>Selection: {{ pick }}</div>
  <input type="radio" id="yes" v-model="pick" value="yes" />
  <label for="yes">I am attending</label>
  <input type="radio" v-model="pick" value="no" />
  <label for="no">I can't make it</label>
</template>
