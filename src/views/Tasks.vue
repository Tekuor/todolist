<template>
  <main class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex w-1/6"><SideBar /></div>

      <div class="flex flex-1 flex-col w-5/6">
        <div><TopNav /></div>

        <div class="overflow-y-auto mx-12">
          <h3 class="font-semibold text-xl">Tasks</h3>
          <div class="flex flex-row border-b mb-6 border-gray justify-between">
            <div
              class="flex flex-row items-end w-1/2 justify-between font-semibold"
            >
              <p
                @click="selectTaskType('all')"
                :class="{
                  'border-b-4 border-primary rounded-sm text-primary':
                    selectedTasks === 'all',
                }"
                class="px-4 cursor-pointer"
              >
                All
              </p>
              <p
                @click="selectTaskType('today')"
                :class="{
                  'border-b-4 border-primary rounded-sm text-primary':
                    selectedTasks === 'today',
                }"
                class="px-4 cursor-pointer"
              >
                Today
              </p>
              <p
                @click="selectTaskType('upcoming')"
                :class="{
                  'border-b-4 border-primary rounded-sm text-primary':
                    selectedTasks === 'upcoming',
                }"
                class="px-4 cursor-pointer"
              >
                Upcoming
              </p>
              <p
                @click="selectTaskType('past')"
                :class="{
                  'border-b-4 border-primary rounded-sm text-primary':
                    selectedTasks === 'past',
                }"
                class="px-4 cursor-pointer"
              >
                Past tasks
              </p>
            </div>

            <button
              type="button"
              class="bg-primary text-white px-6 py-2 rounded-md mb-3"
              @click="showAddModal = true"
            >
              <font-awesome-icon class="mr-4" :icon="['fas', 'plus']" />Add task
            </button>
          </div>

          <div class="mb-8 flex flex-row justify-between">
            <input
              type="text"
              id="email"
              name="email"
              class="rounded-md w-1/3 px-4 h-8 border border-gray focus:outline-none bg-secondary"
              placeholder="Search tasks"
            />

            <div class="flex flex-row">
              <select class="border border-gray mr-6 rounded-sm">
                <option value="" disabled selected>Filter by</option>
              </select>

              <select class="border border-gray rounded-sm">
                <option class="font-bold" value="" disabled selected>
                  Sort by
                </option>
              </select>
            </div>
          </div>
          <Table
            :tableData="tasks"
            :tableColumns="columns"
            @getTasks="getTasks"
          />
        </div>
      </div>
    </div>

    <vue-final-modal v-model="showAddModal" @click-outside="close()">
      <div class="flex flex-row justify-center mt-16">
        <div
          class="lg:w-1/2 w-full rounded-lg bg-white"
          style="min-height: 90px"
        >
          <div class="border-b border-gray">
            <h3 class="p-6 font-medium text-lg">Add task</h3>
          </div>

          <div class="flex flex-row px-6 justify-between">
            <div class="w-full pr-8">
              <div class="my-4">
                <label>Title</label>
                <input
                  type="text"
                  v-model="form.name"
                  placeholder="Name your task"
                  class="rounded w-full px-4 h-10 border border-gray focus:outline-none mt-2"
                />
              </div>

              <div class="my-4">
                <label>Category</label>
                <select
                  v-model="form.categoryId"
                  class="rounded w-full px-4 h-10 border border-gray focus:outline-none mt-2"
                >
                  <option value="" disabled selected>Select category</option>
                  <option
                    :value="category._id"
                    v-for="(category, index) in categories"
                    :key="index"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>

              <div class="my-4">
                <label>Description</label>
                <textarea
                  class="rounded w-full px-4 border border-gray focus:outline-none mt-2"
                  rows="5"
                  cols="50"
                  v-model="form.description"
                  placeholder="Add description"
                >
                </textarea>
              </div>
            </div>
            <div class="w-full pl-8">
              <div class="my-4">
                <label>Schedule</label>
                <input
                  type="date"
                  v-model="form.dueDate"
                  placeholder="Select date and time"
                  class="rounded w-full px-4 h-10 border border-gray focus:outline-none mt-2"
                />
              </div>

              <label>Frequency</label>
              <div class="flex flex-row mt-2 mb-4">
                <div class="bg-white rounded-r border border-gray border-r-0">
                  <font-awesome-icon
                    class="ml-4 mt-3"
                    :icon="['fas', 'sync-alt']"
                  />
                </div>

                <select
                  v-model="form.frequency"
                  class="rounded-l w-full px-4 h-10 border border-gray border-l-0 focus:outline-none"
                >
                  <option value="" disabled selected>
                    Select task frequency
                  </option>
                  <option value="once">Once</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <label>Priority <spam>(Optional)</spam></label>
              <div class="flex flex-row mt-2 mb-4">
                <div class="bg-white rounded-r border border-gray border-r-0">
                  <font-awesome-icon
                    class="ml-4 mt-3"
                    :icon="['fas', 'exclamation']"
                  />
                </div>

                <select
                  v-model="form.priority"
                  class="rounded-l w-full px-4 h-10 border border-gray border-l-0 focus:outline-none"
                >
                  <option value="" disabled selected>None</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              <label>Status <spam>(Optional)</spam></label>
              <div class="flex flex-row mt-2 mb-4">
                <select
                  v-model="form.status"
                  class="rounded-l w-full px-4 h-10 border border-gray border-l-0 focus:outline-none"
                >
                  <option value="" disabled selected>Select task status</option>
                  <option value="In-progress">In-progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>

          <div class="mx-6">
            <button
              type="button"
              class="bg-primary text-white py-2 rounded-md my-4 w-full"
              @click="createTask()"
            >
              Add task
            </button>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </main>
</template>

<script>
import SideBar from "../components/SideBar/SideBar.vue";
import TopNav from "../components/TopNav.vue";
import Table from "../components/Table.vue";
import { VueFinalModal } from "vue-final-modal";
import { getTasks, getCategories, createTask } from "../services";
import { format, isBefore, isSameDay, isAfter } from "date-fns";

export default {
  components: {
    SideBar,
    TopNav,
    Table,
    VueFinalModal,
  },
  mounted() {
    this.getTasks();
    this.getCategories();
  },
  data() {
    return {
      form: {
        name: "",
        description: "",
        frequency: "",
        categoryId: "",
        priority: "",
        status: "",
        dueDate: "",
      },
      categories: [],
      tasks: [],
      showAddModal: false,
      data: {},
      columns: [
        "Task name",
        "Description",
        "Category",
        "Date created",
        "Due date",
        "Status",
      ],
      selectedTasks: "all",
    };
  },
  methods: {
    selectTaskType(type) {
      this.selectedTasks = type;
      if (type === "today") {
        this.tasks = this.data.tasks.filter(
          (task) =>
            format(new Date(task.dueDate), "dd/MM/yyy") ===
            format(new Date(), "dd/MM/yyy")
        );
      } else if (type === "past") {
        this.tasks = this.data.tasks.filter(
          (task) =>
            isBefore(new Date(task.dueDate), new Date()) === true &&
            !isSameDay(new Date(task.dueDate), new Date())
        );
      } else if (type === "upcoming") {
        this.tasks = this.data.tasks.filter(
          (task) =>
            isAfter(new Date(task.dueDate), new Date()) === true &&
            !isSameDay(new Date(task.dueDate), new Date())
        );
      } else {
        this.tasks = this.data.tasks;
      }
    },
    close() {
      this.showAddModal = false;
    },
    async getTasks() {
      this.data = await getTasks();
      this.tasks = this.data.tasks;
    },
    async getCategories() {
      this.categories = await getCategories();
    },
    async createTask() {
      await createTask(this.form);
      await this.getTasks();
      this.showAddModal = false;
    },
  },
};
</script>
