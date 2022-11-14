<template>
  <div class="order-page-container">
    <Category
      class="item-type-container"
      v-for="category in menu"
      v-bind:key="category.name"
      :category="category"
    ></Category>
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
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.order-page-container {
  text-align: center;
  padding: 50px 10px 10px 10px;
}
</style>
