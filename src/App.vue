<template>
  <div id="app">
    <div id="nav" v-if="orderItemCount > 0">
      <div class="total-price-container">
        💰 Total Price: £{{ totalPrice.toFixed(2) }}
      </div>
      <div class="undo-container" @click="undoLastItemAdded">
        🌀Undo ({{ orderItemCount }})
      </div>
      <div class="checkout-container" @click="goToConfirmationPage">
        🛒 Checkout ({{ orderItemCount }})
      </div>
    </div>
    <div id="item-added-message" class="item-added-message-container">
      Item added!
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
    orderItemCount() {
      return this.$store.getters.getOrder.length;
    },
  },
  methods: {
    goToConfirmationPage() {
      this.$router.push({ path: "confirm" });
    },
    undoLastItemAdded() {
      this.$store.commit("removeLastItem");
    },
  },
};
</script>

<style lang="scss">
@import "./css/global.scss";

#app {
  font-family: "Roboto", sans-serif;
  background: $blue;
}

#nav {
  position: fixed;
  font-size: 1.5em;
  text-align: center;
  width: 100%;
}

.total-price-container {
  left: 0;
  padding: 10px;
  position: absolute;
  background: #fff;
  border-bottom-right-radius: 10px;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}

.checkout-container {
  right: 0;
  padding: 10px;
  position: absolute;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-left: 2px solid black;
  border-bottom: 2px solid black;
}

.undo-container {
  right: 40%;
  padding: 10px;
  position: absolute;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 2px solid black;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
}

.item-added-message-container {
  position: absolute;
  display: inline-block;
  z-index: 50;
  font-size: 1.5em;
  transition: opacity 0.5s linear;
  opacity: 0;
  top: -500px;
  left: -500px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  background: white;
}

.fade-in {
  opacity: 1;
}
</style>
