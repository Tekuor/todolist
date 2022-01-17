import { createRouter, createWebHashHistory } from "vue-router";
import Login from "../views/Login.vue";
import Dashboard from "../views/Dashboard.vue";
import Tasks from "../views/Tasks.vue";
import Calendar from "../views/Calendar.vue";
import Register from "../views/Register.vue";

function guardRoute(to, from, next) {
  let isAuthenticated = false;
  if (localStorage.getItem("token")) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next();
  } else {
    next("/login");
  }
}

const routes = [
  {
    path: "/",
    name: "Home",
    component: Dashboard,
    beforeEnter: guardRoute,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: guardRoute,
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: Tasks,
    beforeEnter: guardRoute,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar,
    beforeEnter: guardRoute,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
