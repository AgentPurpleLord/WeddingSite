<script setup>
</script>

<template>
  <h2>Schedule</h2>

  <div class="timeline">

    <div class="shadow-small border-coloured radius-medium container c-left">
      <div class="content">
        <h3 class="timeline-heading">2:30pm</h3>
        <p class="timeline-content">Guests begin to arrive.</p>
      </div>
    </div>

    <div class="shadow-small border-coloured radius-medium container c-right">
      <div class="content">
        <h3 class="timeline-heading">3:00pm</h3>
        <p class="timeline-content">Ceremony begins</p>
      </div>
    </div>

    <div class="shadow-small border-coloured radius-medium container c-left">
      <div class="content">
        <h3 class="timeline-heading">3:30pm</h3>
        <p class="timeline-content">Ceremony concludes, reception area available</p>
      </div>
    </div>

  </div>
</template>

<style scoped>
.container {
  margin: var(--sp-s);
  background: var(--background-alt);
}
.content {
  margin: var(--sp-s);
}
p {
  font-size: var(--type-body);
  font-weight: normal;
  color: var(--atext);
}
h2 {
  text-align: center;
  font-size: var(--type-h2);
  color: var(--htext);
}
h3 {
  font-size: var(--type-h4);
  color: var(--htext);
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {
  .container {
    width: 50%;
    position: relative;
    margin: 0;
  }

  .c-left {
    left: -25px;
  }

  .c-right {
    left: 50%;
    margin-left: 24px;
  }

  .timeline {
    padding: var(--sp-m);
    position: relative;
    margin: 0 auto;
  }

  .timeline:after {
    content: '';
    position: absolute;
    width: 1pt;
    background-color: var(--Caramel300);
    top: 0;
    bottom: 0;
    left: 50%;
  }

  .c-left::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    right: -38px;
    background-color: inherit;
    border: 1pt solid var(--Caramel300);
    top: 40%;
    border-radius: 50%;
    z-index: 1;
  }

  .c-right::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    left: -38px;
    background-color: inherit;
    border: 1pt solid var(--Caramel300);
    top: 40%;
    border-radius: 50%;
    z-index: 1;
    margin-right: 10%;
  }

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {
  .timeline {
    width: 50%;
  }
  p {
    font-size: var(--type-sm);
  }
  h2 {
    text-align: center;
    font-size: var(--type-h4);
  }
  h3 {
    font-size: var(--type-sm);
  }
}

}

</style>