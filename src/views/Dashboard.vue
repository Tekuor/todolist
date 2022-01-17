<template>
  <main class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex w-1/6"><SideBar /></div>

      <div class="flex flex-1 flex-col w-5/6">
        <div><TopNav :showSearch="true" /></div>

        <div class="overflow-y-auto">
          <Dashboard
            :tableData="data"
            :tableColumns="columns"
            :sections="sections"
            @getTasks="getAllTasks"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import SideBar from "../components/SideBar/SideBar.vue";
import TopNav from "../components/TopNav.vue";
import Dashboard from "../components/Dashboard.vue";
import { getTasks } from "../services";
var uniq = require("lodash/uniq");

export default {
  components: {
    SideBar,
    TopNav,
    Dashboard,
  },
  mounted() {
    this.getAllTasks();
  },
  data() {
    return {
      data: [],
      columns: [
        "Task name",
        "Description",
        "Category",
        "Date created",
        "Due date",
        "Status",
      ],
    };
  },
  methods: {
    async getAllTasks() {
      this.data = await getTasks();
    },
  },
  computed: {
    sections() {
      let section = [];
      if (this.data && this.data.tasks && this.data.tasks.length) {
        const total = this.data.totalTasks;
        const categories = uniq(
          this.data.tasks.map((task) => task.category.name)
        );
        categories.forEach((element) => {
          const findCategories = this.data.tasks.filter(
            (task) => task.category.name == element
          );
          const data = {
            label: element,
            value: (findCategories.length / total) * 100,
            color: findCategories[0].category.color,
          };
          section.push(data);
        });
      }

      return section;
    },
  },
};
</script>

<style></style>
