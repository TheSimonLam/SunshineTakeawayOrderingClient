<template>
  <div class="custom-item-overlay-container">
    <div
      class="overlay-background"
      @click="$emit('toggleCustomItemOverlay')"
    ></div>
    <div class="custom-item-overlay-wrapper">
      <div class="input-row-container">
        <textarea
          v-model="itemDesc"
          rows="10"
          class="custom-item-input"
          placeholder="Description"
        />
      </div>
      <div class="input-row-container">
        <input
          type="number"
          class="custom-item-input"
          v-model="itemPrice"
          placeholder="Price"
        />
      </div>
      <div class="overlay-buttons-container">
        <button
          class="overlay-button add-item-overlay-button-yes"
          @click="addToOrder"
        >
          Add
        </button>
        <button
          class="overlay-button overlay-button-no"
          @click="$emit('toggleCustomItemOverlay')"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "custom-item-overlay",
  data: function() {
    return {
      itemDesc: "",
      itemPrice: "",
    };
  },
  methods: {
    addToOrder() {
      if (this.itemDesc !== "" && !isNaN(parseFloat(this.itemPrice))) {
        this.$store.commit("addItemToOrder", {
          item: {
            id: "",
            price: parseFloat(this.itemPrice),
            name: this.itemDesc,
          },
        });
        this.itemDesc = "";
        this.itemPrice = "";
      }
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.custom-item-input {
  padding: 10px;
}

.custom-item-overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
}

.custom-item-overlay-wrapper {
  border: 1px solid $black;
  display: inline-block;
  background: #fff;
  width: 290px;
  height: 25vh;
  border-radius: 5px;
  padding: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  font-size: 1.7em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.add-item-overlay-button-yes {
  background-color: $yellow;
}
</style>
