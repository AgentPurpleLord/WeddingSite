<script setup>
import {ref, computed, provide, onMounted} from 'vue'
import Home from "@/views/Home.vue";
import RsvpForm from "@/views/RsvpForm.vue";

const routes = {
  '/': Home,
  '/rsvp_form': RsvpForm
}

const currentPath = ref(window.location.hash);

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed( () => {
  return routes[currentPath.value.slice(1) || '/']
});

const scrollSchedule = () => {
  const scheduleSection = document.getElementById('schedule');
  scheduleSection.scrollIntoView({ behavior: 'smooth' });
};


</script>

<template>
  <div id="app">
    <nav>
      <div class="nav-hr">
        <hr>
      </div>
      <ul>
        <li><a href="#/">Home</a></li>
        <li>
          <a v-if="currentView === RsvpForm" href="#/">Schedule</a>
          <a v-else @click.prevent="scrollSchedule" href="#">Schedule</a>
        </li>
        <li><a href="#/rsvp_form">RSVP</a></li>
      </ul>
    </nav>
    <component :is="currentView" />
  </div>
</template>

<style scoped>
nav {
  background: var(--background-alt);
  display: grid;
  grid-template: ". hr ul" 1fr / 1.5fr 1fr auto;
  padding: var(--sp-s) var(--sp-xs) 0 0;
  align-items: start;
}

.nav-hr {
  grid-area: hr;
  justify-self: stretch;
  padding-right: var(--sp-xs);
  align-self: center;
}

.nav-hr hr {
  width: 100%;
  border: 1px solid var(--Caramel600);
  margin: 0;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  grid-area: ul;
}

nav li {
  float: left;
  font-size: var(--type-body);
}

nav a {
  text-decoration: none;
  text-decoration-color: transparent;
  padding: var(--sp-xs);
  transition: 250ms;
  color: var(--Caramel600);
}

nav a:hover {
  text-decoration: underline;
  transition: 250ms;
}


/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {
  nav li {
    font-size: var(--type-sm);
  }

  nav a {
    padding: var(--sp-s);
  }

  .nav-hr {
    padding-right: var(--sp-s);
  }
}

@media only screen and (min-width: 1200px) {
  nav {
    padding: var(--sp-s) 5% 0 0;
  }
}


</style>
