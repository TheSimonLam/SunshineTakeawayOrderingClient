<template>
  <div>
    <div class="nav">
      <div class="nav-button reset-container" @click="toggleResetOverlay">
        Reset
      </div>
      <div class="nav-button undo-container" @click="undoLastItemAdded">
        Undo
      </div>
      <div class="nav-button next-container" @click="goToConfirmationPage">
        Summary (£{{ totalPrice.toFixed(2) }})
      </div>
    </div>
    <div id="item-added-message" class="item-added-message-container">
      Item added!
    </div>
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
    <div class="order-page-container">
      <div class="categories-list-container">
        <input
          class="search-bar-input"
          placeholder="Search..."
          v-model="searchTerm"
          @keyup="setSearchTerm"
        />
        <template v-for="category in menu">
          <div
            class="categories-list-item"
            :class="
              selectedCategoryName === category.name
                ? 'light-grey-background'
                : 'faded-background'
            "
            :style="{
              'border-right':
                selectedCategoryName === category.name
                  ? 'none'
                  : '1px solid black',
            }"
            @click="setCategory(category.name)"
          >
            {{ category.name }}
          </div>
        </template>
      </div>
      <div class="category-items-container">
        <Category :items="searchTerm ? searchResults : getSelectedCategory" />
      </div>
    </div>
  </div>
</template>

<script>
import Category from "../components/Category";

export default {
  name: "order",
  components: {
    Category,
  },
  computed: {
    menu() {
      return this.$store.getters.getMenu;
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
    orderItemCount() {
      return this.$store.getters.getOrder.length;
    },
    getSelectedCategory() {
      if (this.selectedCategoryName === "") return {};
      const menu = this.$store.getters.getMenu;
      return menu.filter(
        (categoryItem) => categoryItem.name === this.selectedCategoryName
      )[0].items;
    },
  },
  data() {
    return {
      showResetOverlay: false,
      selectedCategoryName: "",
      selectedCategoryItem: undefined,
      searchTerm: "",
      searchResults: undefined,
    };
  },
  methods: {
    goToConfirmationPage() {
      this.$router.push({ path: "confirm" });
    },
    undoLastItemAdded() {
      if (this.orderItemCount > 0) {
        this.$store.commit("removeLastItem");
      }
    },
    toggleResetOverlay() {
      this.showResetOverlay = !this.showResetOverlay;
    },
    reset() {
      this.toggleResetOverlay();
      this.$store.commit("resetOrder");
      this.$router.push({ path: "/" });
    },
    setCategory(chosenCategory) {
      this.selectedCategoryName = chosenCategory;
      this.searchTerm = "";
      this.searchResults = "";
    },
    setSearchTerm() {
      this.selectedCategoryName = "";
      const menu = this.$store.getters.getMenu;
      const results = [];
      menu.forEach((categoryItem) => {
        categoryItem.items.forEach((item) => {
          if (
            item.id.toString().includes(this.searchTerm) ||
            item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
          ) {
            results.push(item);
          }
        });
      });
      this.searchResults = results;
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.faded-background {
  background: linear-gradient($white, $darkGrey);
}

.light-grey-background {
  background-color: $lightGrey;
}

.search-bar-input {
  padding: 6px;
  font-size: 1.8em;
}

.order-page-container {
  display: flex;
  flex-direction: row;
}

.category-items-container {
  display: flex;
  flex: 4;
  background-color: $lightGrey;
}

.categories-list-container {
  min-width: 280px;
  flex: 1;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid black;
  height: calc(100vh - 100px);
  overflow-y: scroll;
}

.categories-list-container::-webkit-scrollbar {
  display: none;
}

.categories-list-item {
  font-size: 1.8em;
  border-bottom: 1px solid black;
  padding: 5px;
}

.nav {
  background-color: white;
  position: fixed;
  z-index: 99;
  bottom: 0;
  display: flex;
  font-size: 1.5em;
  text-align: center;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid $black;
}

.nav-button {
  padding: 10px;
  height: 40px;
  width: 30%;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.reset-container {
  background-color: $red;
}

.next-container {
  background-color: $yellow;
}

.undo-container {
  background-color: $white;
  border: 2px solid $red;
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

.reset-overlay-container {
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

.reset-overlay-wrapper {
  border: 1px solid black;
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

.overlay-buttons-container {
  margin-top: 10px;
}

.reset-overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
}

.overlay-buttons-container {
  display: flex;
  justify-content: space-around;
}

.overlay-button {
  width: 120px;
  font-size: 1em;
  border: none;
  border-radius: 5px;
}

.overlay-button-yes {
  background-color: $red;
}

.overlay-button-no {
  border: 2px solid $red;
  background-color: $white;
}
</style>
