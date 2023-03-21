<template>
  <div class="start-page-container">
    <span class="title">Sunshine Takeaway</span>
    <button class="start-button" @click="goToOrderPage">Start</button>
    <button class="past-orders-button" @click="goToPastOrders">
      Past Orders
    </button>
  </div>
</template>

<script>
export default {
  name: "start",
  methods: {
    goToOrderPage() {
      this.$router.push({ path: "order" });
    },
    goToPastOrders() {
      this.$router.push({ path: "past-orders" });
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.start-page-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.title {
  font-size: 3em;
  font-family: "Revue", Helvetica, Arial;
  color: $red;
  padding-bottom: 30px;
}

.start-button {
  border-radius: 5px;
  font-size: 2em;
  background: $white;
  color: $black;
  border: 2px solid $black;
  margin-bottom: 20px;
}

.past-orders-button {
  border-radius: 5px;
  font-size: 2em;
  background: $red;
  color: $white;
  border: 2px solid $black;
}
</style>
