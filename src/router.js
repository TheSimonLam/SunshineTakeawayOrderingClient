import Vue from "vue";
import Router from "vue-router";
import Start from "./views/StartPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "start",
      component: Start,
    },
    {
      path: "/order",
      name: "order",
      component: () => import("./views/OrderPage.vue"),
    },
    {
      path: "/confirm",
      name: "comfirm",
      component: () => import("./views/ConfirmationPage.vue"),
    },
  ],
});
