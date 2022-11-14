<template>
  <div class="start-page-container">
    <button class="start-button" @click="goToOrderPage">Start</button>
  </div>
</template>

<script>
export default {
  name: "start",
  methods: {
    goToOrderPage() {
      this.$router.push({ path: "order" });
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.start-page-container {
  text-align: center;
  height: 100vh;
}

.start-button {
  margin-top: 20%;
  padding: 2% 10%;
  border-radius: 5px;
  font-size: 3em;
  background: #fff;
  color: $black;
  border: 2px solid black;
}
</style>
