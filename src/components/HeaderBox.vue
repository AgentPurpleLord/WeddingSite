<script setup>
</script>

<template>
  <div class="splash-header border-coloured radius-arch">
    <div class="top-flowers">
      <img src = "../assets/topflowers.png" alt="A group of flowers." />
    </div>
    <div class="header-card">
      <div class="header-text">
        <p class= "pre-title">Celebrate the wedding of</p>
        <h1>Mollie & Nathan</h1>
        <h2>5th of October 2023</h2>
      </div>
    </div>
    <div class="bottom-flowers">
      <img src = "../assets/bottomflowers.png" alt="A group of flowers." />
    </div>
    <div class="button-container">
      <button class="radius-small rsvp-button">RSVP</button>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/rouge-script");
.splash-header {
  background-color: var(--background);
  margin: var(--sp-xl) var(--sp-s) var(--sp-m) var(--sp-s);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 0 0;
}

.header-card {
  display: flex;
  align-items: center;
  justify-content: right;
  grid-area: 1 / 1 / 3 / 3;
  margin-top: 40vw;
  padding-right: var(--sp-s);
  padding-top: var(--sp-xl);
  padding-bottom: var(--sp-xl);
}

.header-text {
  text-align: right;
}

.pre-title, h2 {
  font-size: var(--type-h4);
  color: var(--atext);
}

.header-text h1 {
  font-family: 'Rouge Script', sans-serif;
  font-size: var(--type-h1);
  color: var(--htext);
}

.top-flowers img {
  width: 110%;
  transform: translate(-13%, -10%);
}

.top-flowers {
  grid-area: 1 / 1 / 2 / 3;
  align-self: stretch;
  justify-self: stretch;
  position: absolute;
}

.bottom-flowers img {
  width: 100%;
  transform: translate(20%, 25%);
}

.bottom-flowers {
  grid-area: 3 / 2 / 3 / 3;
  align-self: stretch;
  justify-self: stretch;
}

.button-container {
  grid-area: 3 / 1 / 3 / 3;
  align-self: start;
  justify-self: center;
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .splash-header {
    margin: var(--sp-xl) auto;
    width: 66%;
  }
  .top-flowers img {
    width: 100%;
    transform: translate(-13%, -10%);
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .splash-header {
    margin: 100pt auto;
    width: 40%;
  }
  .top-flowers img {
    width: 70%;
    transform: translate(-13%, -10%);
  }

  .pre-title, h2 {
    font-size: var(--type-sm);
    line-height: var(--sp-s);
  }

  .header-text h1 {
    font-family: 'Rouge Script', sans-serif;
    font-size: var(--type-h2);
  }
  .header-card {
     margin-top: 20vw;
   }
}

/* Large devices (laptops/desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .splash-header {
    width: 30%;
  }

  .top-flowers img {
    width: 55%;
    transform: translate(-15%, -10%);
  }
  .header-card {
    margin-top: 13vw;
  }
}

</style>