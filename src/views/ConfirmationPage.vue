<template>
  <div class="confirmation-page-container">
    <div class="reset-overlay-container" v-if="showResetOverlay">
      <div class="overlay-background" @click="toggleResetOverlay"></div>
      <div class="reset-overlay-wrapper">
        <div>Are you sure you want to reset?</div>
        <div class="overlay-buttons-container">
          <button class="overlay-button overlay-button-yes" @click="reset">
            Yes
          </button>
          <button
            class="overlay-button overlay-button-no"
            @click="toggleResetOverlay"
          >
            No
          </button>
        </div>
      </div>
    </div>
    <div class="ordered-items-container">
      <div
        class="item-container"
        @click="removeItem(item)"
        v-for="item in order"
        v-bind:key="item.id"
      >
        <div class="ordered-item ordered-item-name">
          {{ item.id }}. {{ item.name }}
        </div>
        <div class="ordered-item ordered-item-name" v-if="item.side">
          with {{ item.side.name }}
        </div>
        -
        <div class="ordered-item ordered-item-price">
          £{{ item.price.toFixed(2) }}
        </div>
      </div>
      <div class="price-container">Total: £{{ totalPrice.toFixed(2) }}</div>
    </div>
    <div class="confirmation-buttons-container no-print">
      <div class="confirmation-button" @click="backToOrderPage">🔙Back</div>
      <div class="confirmation-button" @click="toggleResetOverlay">♻️Reset</div>
      <div class="confirmation-button" @click="placeOrder">🖨️Print</div>
    </div>

    <div class="reset-overlay-container" v-if="showResetOverlay">
      <div class="overlay-background" @click="toggleResetOverlay"></div>
      <div class="reset-container">
        <div>Are you sure you want to reset?</div>
        <div class="overlay-buttons-container">
          <button class="overlay-button overlay-button-yes" @click="reset">
            Yes
          </button>
          <button
            class="overlay-button overlay-button-no"
            @click="toggleResetOverlay"
          >
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "confirm",
  computed: {
    order() {
      return this.$store.getters.getOrder;
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
  },
  data() {
    return {
      showResetOverlay: false,
    };
  },
  methods: {
    placeOrder() {
      window.print();
    },
    backToOrderPage() {
      this.$router.push({ path: "order" });
    },
    toggleResetOverlay() {
      this.showResetOverlay = !this.showResetOverlay;
    },
    reset() {
      this.toggleResetOverlay();
      this.$store.commit("resetOrder");
      this.$router.push({ path: "/" });
    },
    removeItem(item) {
      this.$store.commit("removeItemFromOrder", item);
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

@media print {
  .no-print {
    visibility: hidden;
  }
}

.confirmation-page-container {
  height: 100vh;
  padding-top: 100px;
}

.ordered-items-container {
  font-size: 1.3em;
  background: white;
  border-radius: 5px;
  margin: 0 50px;
  padding: 10px;
  border: 2px solid black;
}

.item-container {
  padding-bottom: 10px;
}

.ordered-item {
  display: inline-block;
}

.ordered-item-name {
  padding-right: 5px;
}

.ordered-item-price {
}

.price-container {
  font-size: 1em;
  padding-top: 20px;
  font-weight: bold;
}

.confirmation-buttons-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.confirmation-button {
  background: white;
  border: 2px solid black;
  display: inline-block;
  height: 80px;
  font-size: 2em;
  text-align: center;
  line-height: 80px;
  border-bottom: 0;
  width: 31%;
  margin: 5px;
  margin-bottom: 0;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}
</style>
