import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

window.store = store;

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: () => import("../views/Index/template.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import("../views/Login/template.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register/template.vue"),
  },
  {
    path: "/detail/:blogId",
    name: "Detail",
    meta: { requiresAuth: true }, /* 我也不想加，但是如果不这样的话，通过接口没法取到res */
    component: () => import("../views/Detail/template.vue"),
  },
  {
    path: "/edit/:blogId",
    name: "Edit",
    meta: { requiresAuth: true },
    component: () => import("../views/Edit/template.vue"),
  },
  {
    path: "/create",
    name: "Create",
    meta: { requiresAuth: true },
    component: () => import("../views/Create/template.vue"),
  },
  {
    path: "/user/:userId",
    name: "User",
    component: () => import("../views/User/template.vue"),
  },
  {
    path: "/my",
    name: "My",
    meta: { requiresAuth: true },
    component: () => import("../views/My/template.vue"),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    //console.log(store.getters.isLogin);
    store
      .dispatch("checkLogin")
      .then(next())
      .catch((err) => {
        if (err.status === 'fail') {
          next({
            path: "/login",
            query: { redirect: to.fullPath },
          });
        } else {
          next();
        }
      });
  } else {
    next();
  }
});

export default router;
