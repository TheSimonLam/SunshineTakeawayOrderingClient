import Vue from "vue";
import Vuex from "vuex";
import menu from "./assets/menu";

Vue.use(Vuex);

function initSideOrders() {
  for (let category of menu) {
    if (category.name === "Instead of rice or chips") {
      let mealSides = [];

      for (let side of category.items) {
        mealSides.push(side);
      }
      return mealSides;
    }
  }
}

export default new Vuex.Store({
  state: {
    menu,
    order: [],
    totalPrice: 0,
    mealSides: initSideOrders(),
  },
  mutations: {
    addItemToOrder(state, { item, indexToInsert = undefined }) {
      if (indexToInsert !== undefined) {
        state.order.splice(indexToInsert, 0, item);
      } else {
        state.order.push(item);
      }

      state.totalPrice += item.price;
      if (item.side && item.side.price) {
        state.totalPrice += item.side.price;
      }
    },
    removeItemFromOrder(state, item) {
      state.totalPrice -= item.price;
      if (item.side && item.side.price) {
        state.totalPrice -= item.side.price;
      }
      state.order = state.order.filter(function(itemToRemove) {
        return itemToRemove !== item;
      });
    },
    removeLastItem(state) {
      let removedItem = state.order.pop();
      state.totalPrice -= removedItem.price;
      if (removedItem.side && removedItem.side.price) {
        state.totalPrice -= removedItem.side.price;
      }
    },
    resetOrder(state) {
      state.order = [];
      state.totalPrice = 0;
    },
  },
  actions: {},
  getters: {
    getMenu: (state) => {
      return state.menu;
    },
    getOrder: (state) => {
      return state.order;
    },
    getTotalPrice: (state) => {
      return state.totalPrice;
    },
    getMenuMealSides: (state) => {
      return state.mealSides;
    },
  },
});
