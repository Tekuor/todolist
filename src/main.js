import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./css/tailwind.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faEllipsisV,
  faPlus,
  faPencilAlt,
  faTrashAlt,
  faSyncAlt,
  faExclamation,
  faCog,
  faCalendarDay,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faBell,
  faClone,
  faQuestionCircle,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import Donut from "vue-css-donut-chart";
import "vue-css-donut-chart/dist/vcdonut.css";

library.add(faCalendar);
library.add(faBell);
library.add(faAngleDown);
library.add(faEllipsisV);
library.add(faPlus);
library.add(faPencilAlt);
library.add(faTrashAlt);
library.add(faSyncAlt);
library.add(faExclamation);
library.add(faClone);
library.add(faCog);
library.add(faCalendarDay);
library.add(faQuestionCircle);
library.add(faSignOutAlt);

createApp(App)
  .use(router)
  .use(Donut)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
