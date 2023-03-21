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
      path: "/summary",
      name: "summary",
      component: () => import("./views/SummaryPage.vue"),
    },
    {
      path: "/past-orders",
      name: "past-orders",
      component: () => import("./views/PastOrdersPage.vue"),
    },
  ],
});
