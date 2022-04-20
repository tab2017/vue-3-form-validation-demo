<template>
  <NavLinks />
  <main>
    <router-view />
  </main>
</template>

<script>
import NavLinks from "./components/NavLinks.vue";

export default {
  components: { NavLinks }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap");

* {
  margin: 0;
  padding: 0;
  border-width: 0;
  border-style: solid;
  box-sizing: border-box;
}

body {
  height: 100vh;
}

#app {
  padding: 60px;
  display: grid;
  row-gap: 60px;
  justify-items: center;
  grid-template-rows: auto 1fr;
  font-family: "Montserrat", sans-serif;
}

main {
  width: 100%;
  max-width: 700px;
  min-width: 540px;
}

button,
input,
select,
textarea {
  font-family: inherit;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
}
</style>