<template>
  <div>
    <div id="item-added-message" class="item-added-message-container">
      Item added!
    </div>
    <ResetOverlay
      v-if="showResetOverlay"
      @toggleResetOverlay="toggleResetOverlay"
    ></ResetOverlay>
    <CustomItemOverlay
      v-if="showCustomItemOverlay"
      @toggleCustomItemOverlay="toggleCustomItemOverlay"
    ></CustomItemOverlay>
    <div class="order-page-container">
      <div class="categories-list-container">
        <input
          class="search-bar-input"
          placeholder="Search..."
          v-model="searchTerm"
          @keyup="setSearchTerm"
        />
        <div
          class="categories-list-item custom-item-button"
          @click="toggleCustomItemOverlay()"
        >
          Custom Item
        </div>
        <template v-for="category in menu">
          <div
            v-if="!category.hidden"
            class="categories-list-item"
            :class="
              selectedCategoryName === category.name ? 'selected-category' : ''
            "
            @click="setCategory(category.name)"
          >
            {{ category.name }}
          </div>
        </template>
      </div>
      <div class="category-items-container">
        <Category
          :items="searchTerm ? searchResults : getSelectedCategory"
          :resetSearch="resetSearch"
        />
      </div>
    </div>
    <div class="order-page-nav">
      <div
        class="order-page-nav-button reset-container"
        @click="toggleResetOverlay"
      >
        Reset
      </div>
      <div
        class="order-page-nav-button undo-container"
        @click="removeLastItemAdded"
      >
        Remove last item
      </div>
      <div
        class="order-page-nav-button next-container"
        @click="goToConfirmationPage"
      >
        Summary (£{{ totalPrice.toFixed(2) }})
      </div>
    </div>
  </div>
</template>

<script>
import Category from "../components/Category";
import CustomItemOverlay from "../components/CustomItemOverlay";
import ResetOverlay from "../components/ResetOverlay.vue";

export default {
  name: "order",
  components: {
    Category,
    ResetOverlay,
    CustomItemOverlay,
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
      showCustomItemOverlay: false,
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
    removeLastItemAdded() {
      if (this.orderItemCount > 0) {
        this.$store.commit("removeLastItem");
      }
    },
    toggleResetOverlay() {
      this.showResetOverlay = !this.showResetOverlay;
    },
    toggleCustomItemOverlay() {
      this.showCustomItemOverlay = !this.showCustomItemOverlay;
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
    resetSearch() {
      this.selectedCategoryName = "";
      this.searchResults = undefined;
      this.searchTerm = "";
    },
    setSearchTerm() {
      this.selectedCategoryName = "";
      const menu = this.$store.getters.getMenu;
      const results = [];
      menu
        .filter((menuType) => menuType.hidden !== true)
        .forEach((categoryItem) => {
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

.custom-item-button {
  background-color: $yellow;
}

.selected-category {
  border-right: 10px solid $red;
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

.order-page-nav {
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
}

.order-page-nav-button {
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

.overlay-background {
  background: black;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  position: absolute;
}

.overlay-buttons-container {
  margin-top: 10px;
}

.overlay-container {
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
  font-size: 0.8em;
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
