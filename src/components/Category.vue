<template>
  <div>
    <div class="category-container" @click="toggleShowItems">
      {{ category.name }}
    </div>
    <div class="items-container" v-bind:class="{ expanded: showItems }">
      <div
        class="item-square-container"
        @click="itemSelected(item, category.sideIncluded, $event)"
        v-for="item in category.items"
        v-bind:key="item.id"
      >
        <div class="item-emoji" v-if="generateEmoji(item.name)">
          {{ generateEmoji(item.name) }}
        </div>
        <div class="item item-id">{{ item.id }}</div>
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
          <div v-for="mealSide in mealSides" v-bind:key="mealSide.id">
            <button class="side-overlay-button" @click="sideChosen(mealSide)">
              {{ mealSide.name }}
            </button>
          </div>
          <button class="side-overlay-button" @click="sideChosen()">
            None
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uuid from "uuidv4";

export default {
  name: "category",
  props: ["category"],
  data: function() {
    return {
      showItems: false,
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
    toggleShowItems() {
      this.showItems = !this.showItems;
    },
    itemSelected(item, sideIncluded, e) {
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

      if (side && side.id === 313) {
        this.currentlySelectedItem.price = this.currentlySelectedItem.price += 0.5;
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

.expanded {
  max-height: 1170px !important;
  border: 2px solid black;
  border-top: none;
}

.item-square-container {
  height: 150px;
  width: 100px;
  background: $yellow;
  margin: 10px;
  display: inline-block;
  padding: 10px;
  text-align: left;
  border-radius: 5px;
  vertical-align: top;
  border: 2px solid black;
  position: relative;
}

.item {
  padding: 5px 0;
}

.item-id {
}

.item-emoji {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 2.5em;
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
  background: $white;
  max-height: 0;
  overflow: hidden;
  overflow-y: hidden;
  transition: max-height 0.2s linear;
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
  border: 2px solid black;
  display: inline-block;
  background: #fff;
  width: 40%;
  height: 35vh;
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
  margin-top: 10px;
}

.side-overlay-button {
  font-size: 1em;
  border: 2px solid black;
  margin: 15px;
  background: #90ccf4;
  border-radius: 5px;
}
</style>
