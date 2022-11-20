<template>
  <div>
    <div class="items-container">
      <div
        class="item-square-container"
        @click="itemSelected(item, $event)"
        v-for="item in items"
        v-bind:key="item.name"
      >
        <div class="item-top-row">
          <div class="item item-id">{{ item.id }}</div>
          <div class="item-emoji" v-if="generateEmoji(item.name)">
            {{ generateEmoji(item.name) }}
          </div>
        </div>
        <div class="item item-name">{{ item.name }}</div>
        <div class="item item-price">£{{ item.price.toFixed(2) }}</div>
        <div class="item item-allergens">{{ item.allergens }}</div>
      </div>
    </div>

    <div class="side-overlay-container" v-if="showSideOverlay">
      <div class="overlay-background"></div>
      <div class="side-container">
        <div>Choose a side:</div>
        <div class="side-overlay-buttons-container">
          <template v-for="mealSide in mealSides">
            <button class="side-overlay-button" @click="sideChosen(mealSide)">
              {{ mealSide.name }}
            </button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uuid from "uuidv4";
import { AMOUNT_TO_DEDUCT_WHEN_NO_SIDE_SELECTED } from "../consts";

export default {
  name: "category",
  props: ["items"],
  data: function() {
    return {
      showSideOverlay: false,
      currentlySelectedItem: {},
    };
  },
  computed: {
    mealSides() {
      return this.$store.getters.getMenuMealSides;
    },
  },
  methods: {
    itemSelected(item, e) {
      const sideIncluded = item.sideIncluded;
      let mutableItem = JSON.parse(JSON.stringify(item)); //Stupid hack for deepcloning an object
      if (sideIncluded && !mutableItem.dontIncludeSideOverride) {
        //the override's for vegetarian chow mein
        this.currentlySelectedItem = mutableItem;
        this.toggleSideOverlay();
      } else {
        this.addToOrder(mutableItem, e);
      }
    },
    addToOrder(item, e) {
      if (e) this.fireAddedToBasketMessage(e);

      this.currentlySelectedItem = {};
      item.uuid = uuid();
      this.$store.commit("addItemToOrder", item);
    },
    fireAddedToBasketMessage(e) {
      let message = document.getElementById("item-added-message");

      message.style.top = e.pageY - 40 + "px";
      message.style.left = e.pageX - 60 + "px";
      message.className += " fade-in";

      setTimeout(() => {
        message.className = message.className.replace(" fade-in", "");
        setTimeout(() => {
          message.style.top = "-500px";
          message.style.left = "-500px";
        }, 500);
      }, 500);
    },
    toggleSideOverlay() {
      this.showSideOverlay = !this.showSideOverlay;
    },
    sideChosen(side) {
      this.currentlySelectedItem.side = side;

      if (!side) {
        this.currentlySelectedItem.price = this.currentlySelectedItem.price -= AMOUNT_TO_DEDUCT_WHEN_NO_SIDE_SELECTED;
      } else {
        this.currentlySelectedItem.price = this.currentlySelectedItem.price +=
          side.price;
      }

      this.addToOrder(this.currentlySelectedItem);
      this.toggleSideOverlay();
    },
    generateEmoji(itemName) {
      if (itemName.toLowerCase().indexOf("special") > -1) return "✨";
      if (itemName.toLowerCase().indexOf("beef") > -1) return "🐄";
      if (itemName.toLowerCase().indexOf("chicken") > -1) return "🐔";
      if (itemName.toLowerCase().indexOf("pork") > -1) return "🐷";
      if (itemName.toLowerCase().indexOf("siu") > -1) return "🍖";
      if (itemName.toLowerCase().indexOf("king") > -1) return "🍤";
      if (itemName.toLowerCase().indexOf("prawn") > -1) return "🦐";
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.category-container {
  width: 100%;
  display: inline-block;
  background: #fff;
  border-radius: 5px;
  padding: 20px 0;
  margin-top: 10px;
  font-size: 1.5em;
  font-weight: bold;
  border: 2px solid black;
}

.item-square-container {
  display: flex;
  height: 150px;
  width: 100px;
  background: $white;
  margin: 10px;
  display: inline-block;
  padding: 10px;
  text-align: left;
  border-radius: 5px;
  vertical-align: top;
  box-shadow: 3px 3px 5px 6px #ccc;
}

.item-top-row {
  display: flex;
  justify-content: space-between;
}

.item {
  padding: 5px 0;
}

.item-id {
}

.item-emoji {
  font-size: 1.5em;
}

.item-name {
  font-size: 1em;
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
}

.item-allergens {
}

.items-container {
}

.side-overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
}

.overlay-background {
  background: black;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  position: absolute;
}

.side-container {
  display: inline-block;
  background: #fff;
  width: 40%;
  height: 60vh;
  border-radius: 5px;
  padding: 40px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  font-size: 1.7em;
}

.side-overlay-buttons-container {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
}

.side-overlay-button {
  border: none;
  font-size: 1em;
  margin: 15px;
  background: $yellow;
  padding: 10px;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
