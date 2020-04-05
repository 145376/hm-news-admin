import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../pages/Login.vue";
import Home from "../pages/Home.vue";
import List from "../pages/post-list.vue";
import Release from "../pages/post-release.vue";

Vue.use(VueRouter);

//解决导航重复问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes: [
    { path: "/", redirect: "/login" },
    {
      path: "/home",
      component: Home,
      name: "home",
      children: [
        { path: "/home", component: List },
        { path: "/release", component: Release }
      ]
    },
    { path: "/login", component: Login }
  ]
});

//导航守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  if (to.path !== "/login" && to.path !== "/") {
    if (token) {
      next();
    } else {
      router.push("/login");
    }
  } else {
    next();
  }
});

export default router;
