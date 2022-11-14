<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
};
</script>

<style lang="scss">
@import "./css/global.scss";

@font-face {
  font-family: "Revue";
  src: local("Revue"), url(./assets/revue.ttf) format("truetype");
}

#app {
  font-family: "Roboto", sans-serif;
  background: $white;
}
</style>
