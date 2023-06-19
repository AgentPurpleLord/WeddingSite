<script setup>

</script>

<template>
  <div class="divider">
    <div class="box"></div>
    <div class="line"></div>
  </div>
</template>

<style scoped>
.divider {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;
  padding: var(--sp-xs);
  margin: var(--sp-xs);
}
.box {
  border: 2pt solid var(--Caramel400);
  background: var(--background-alt);
  width: 50%;
  height: 25px;
  grid-area: 1 / 1 / 2 / 2;
  z-index: 1;
  border-radius: 500px;
}
.line {
  grid-area: 1 / 1 / 2 / 2;
  width: 100%;
  border: 1pt solid var(--Caramel400);
  z-index: -1;
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 1200px)  {
  .divider {
    padding: var(--sp-l);
    margin: var(--sp-l);
  }
}
</style>