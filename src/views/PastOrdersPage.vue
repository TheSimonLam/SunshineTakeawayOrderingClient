<template>
  <div class="past-orders-page-container">
    <button class="back-button" @click="goBack">Back</button>

    <div class="past-orders-container">
      <template v-for="pastOrder in pastOrders"
        ><PastOrderItem :pastOrder="pastOrder"
      /></template>
    </div>
  </div>
</template>

<script>
import PastOrderItem from "../components/PastOrderItem.vue";

export default {
  name: "past-orders",
  components: {
    PastOrderItem,
  },
  created() {
    this.$store.dispatch("fetchAllPast24HourOrders");
  },
  computed: {
    pastOrders() {
      return this.$store.getters.getPastOrders;
    },
  },
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

.back-button {
  border-radius: 5px;
  font-size: 2em;
  background: $white;
  color: $black;
  border: 2px solid $black;
  margin-bottom: 20px;
  margin-top: 20px;
}

.past-orders-page-container {
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
  align-items: center;
}

.past-orders-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-around;
}
</style>
