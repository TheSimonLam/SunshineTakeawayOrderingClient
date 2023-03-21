<template>
  <div class="past-orders-page-container">
    <span class="title">Past Orders</span>
    <button class="back-button" @click="goBack">Back</button>
  </div>
</template>

<script>
export default {
  name: "past-orders",
  methods: {
    goToSummaryPage() {
      this.$router.push({ path: "summary" });
    },
    goBack() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.past-orders-page-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  align-items: center;
}
</style>
