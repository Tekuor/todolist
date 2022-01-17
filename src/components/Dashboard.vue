<template>
  <div class="md:p-8 p-2">
    <h3 class="font-semibold text-xl">Dashboard</h3>

    <div class="flex md:flex-row flex-col mt-4 justify-between">
      <div class="md:w-5/12 w-full">
        <h3 class="mb-2 font-medium text-lg">Overview</h3>
        <div class="border border-gray h-44 rounded-md">
          <div class="grid grid-cols-3 divide-gray divide-x py-10 h-full">
            <div class="text-center pt-3">
              <p class="text-teal font-bold text-3xl">
                {{ tableData.totalTasks }}
              </p>
              <p class="font-semibold mt-2">
                {{ tableData.totalTasks > 1 ? "Total tasks" : "Total task" }}
              </p>
            </div>
            <div class="text-center pt-3">
              <p class="text-teal font-bold text-3xl">
                {{ tableData.completedTasks }}
              </p>
              <p class="font-semibold mt-2">Completed</p>
            </div>
            <div class="text-center pt-3">
              <p class="text-teal font-bold text-3xl">
                {{ tableData.progressTasks }}
              </p>
              <p class="font-semibold mt-2">In progress</p>
            </div>
          </div>
        </div>
      </div>
      <div class="md:w-5/12 w-full">
        <h3 class="mb-2 font-medium text-lg">Balance of tasks</h3>
        <div
          class="border border-gray h-44 rounded-md flex flex-row justify-center items-center"
        >
          <vc-donut
            v-if="tasks.length"
            background="white"
            :size="150"
            unit="px"
            :thickness="10"
            :sections="sections"
            :total="100"
            :start-angle="0"
            :auto-adjust-text-size="true"
            @section-click="handleSectionClick"
          >
            <h1 class="font-semibold text-xl">
              {{
                tableData.totalTasks > 1
                  ? `${tableData.totalTasks} tasks`
                  : `${tableData.totalTasks} task`
              }}
            </h1>
          </vc-donut>
          <div class="mt-2 ml-8" v-if="tasks.length">
            <ul class="list-none">
              <li v-for="(section, index) in sections" :key="index">
                <div class="flex flex-row">
                  <div
                    class="rounded-full h-4 w-4 bg-primary mt-1 mr-2"
                    :style="{ backgroundColor: section.color }"
                  ></div>
                  <p>{{ section.label }}</p>
                </div>
              </li>
            </ul>
          </div>

          <p v-if="!tasks.length">No Data</p>
        </div>
      </div>
    </div>

    <h3 class="my-6 font-medium text-lg">Tasks List</h3>
    <div class="w-full flex flex-col border border-gray rounded-md p-6">
      <Table
        :tableData="tasks"
        :tableColumns="tableColumns"
        @getTasks="getTasks"
      />
    </div>
  </div>
</template>

<script>
import Table from "../components/Table.vue";
var get = require("lodash/get");

export default {
  components: {
    Table,
  },
  props: {
    tableData: {
      type: () => {
        return {
          tasks: [],
          progressTasks: 0,
          completedTasks: 0,
          totalTasks: 0,
        };
      },
    },
    tableColumns: {
      type: () => {
        return;
      },
    },
    sections: {
      type: () => {
        return [];
      },
    },
  },
  methods: {
    getTasks() {
      this.$emit("getTasks");
    },
  },
  computed: {
    tasks() {
      return get(this.tableData, "tasks", []);
    },
  },
};
</script>

<style></style>
