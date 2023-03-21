<template>
  <div class="past-order-container">
    <p>Created: {{ formatDate(pastOrder.createdTimestamp) }}</p>
    <p>Arrival: {{ pastOrder.arrivalTime }}</p>
    <p>Name: {{ pastOrder.customerName }}</p>
    <p>Price: £{{ pastOrder.totalPrice.toFixed(2) }}</p>
  </div>
</template>
<script>
export default {
  name: "past-order-item",
  props: ["pastOrder"],
  methods: {
    navigateToPastOrder() {},
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleTimeString("en-GB");
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.past-order-container {
  width: 170px;
  background-color: whitesmoke;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid black;
  margin-bottom: 20px;
}
</style>
