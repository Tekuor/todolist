<template>
  <main class="flex flex-col h-screen">
    <div class="flex flex-1 overflow-hidden">
      <div class="flex w-1/6"><SideBar /></div>

      <div class="flex flex-1 flex-col h-full">
        <div class="overflow-y-auto p-8 h-full">
          <h3 class="font-semibold text-xl mb-4">Calendar</h3>
          <calendar-view
            :show-date="showDate"
            :items="items"
            :startingDayOfWeek="1"
            :disableFuture="false"
            :currentPeriodLabel="currentPeriodLabel"
            :displayPeriodUom="calendarDisplay"
          >
            <template #header="{ headerProps }">
              <div class="flex flex-col items-center">
                <select
                  class="border border-gray mr-6 rounded-sm"
                  v-model="calendarDisplay"
                  @change="changeDisplay($event)"
                >
                  <option value="month">Month View</option>
                  <option value="year">Year View</option>
                  <option value="week">Week View</option>
                </select>
              </div>
              <div class="flex flex-row">
                <div class="w-full">
                  <calendar-view-header
                    :header-props="headerProps"
                    @input="setShowDate"
                  />
                </div>
                <div class="w-1/2 -mt-6">
                  <button
                    type="button"
                    class="bg-primary text-white px-6 py-2 rounded-md float-right"
                    @click="showAddModal = true"
                  >
                    <font-awesome-icon
                      class="mr-4"
                      :icon="['fas', 'plus']"
                    />Add task
                  </button>
                </div>
              </div>
            </template>
          </calendar-view>
        </div>
      </div>

      <div class="flex flex-col w-1/6 border-l border-gray">
        <div class="flex flex-row ml-6 mt-6">
          <h3 class="font-semibold text-xl">Categories</h3>
          <font-awesome-icon class="mt-2 ml-12" :icon="['fas', 'pencil-alt']" />
        </div>

        <div class="mt-6 ml-6">
          <ul class="list-none">
            <li
              v-for="(category, index) in categories"
              :key="index"
              class="my-4"
            >
              <div class="flex flex-row">
                <div
                  class="rounded-full h-4 w-4 mt-1 mr-2"
                  :style="{ backgroundColor: category.color }"
                ></div>
                <p>{{ category.name }}</p>
              </div>
            </li>
          </ul>
        </div>

        <div
          class="flex flex-row ml-6 mt-6 text-primary cursor-pointer"
          @click="showCategoryModal = true"
        >
          <p class="font-semibold">Add category</p>
          <font-awesome-icon
            class="mt-2 ml-12 text-xs"
            :icon="['fas', 'plus']"
          />
        </div>
      </div>
    </div>

    <vue-final-modal v-model="showCategoryModal" @click-outside="close()">
      <div class="flex flex-row justify-center mt-16">
        <div
          class="lg:w-1/4 w-full rounded-lg bg-white"
          style="min-height: 90px"
        >
          <div class="border-b border-gray">
            <h3 class="p-6 font-medium text-lg">Add category</h3>
          </div>

          <div class="w-full px-6">
            <div class="my-4">
              <label>Category name</label>
              <input
                type="text"
                v-model="name"
                placeholder="Category name"
                class="rounded w-full px-4 h-10 border border-gray focus:outline-none mt-2"
              />
            </div>

            <div class="my-4">
              <label>Pick color</label>
              <div class="flex flex-row">
                <div
                  v-for="(color, index) in colors"
                  :key="index"
                  @click="selectColor(color)"
                  class="rounded-full h-4 w-4 mt-1 mr-2"
                  :class="{
                    'outline outline-black': selectedColor === color,
                  }"
                  :style="{ backgroundColor: color }"
                ></div>
              </div>
            </div>
          </div>

          <div class="w-full px-6 mb-4">
            <button
              type="button"
              @click="createCategory()"
              class="bg-primary text-white px-6 py-2 rounded-md w-full"
            >
              Add category
            </button>
          </div>
        </div>
      </div>
    </vue-final-modal>

    <vue-final-modal
      v-model="showAddModal"
      @click-outside="showAddModal = false"
    >
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
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import "../../node_modules/vue-simple-calendar/dist/style.css";
import { format } from "date-fns";
import { VueFinalModal } from "vue-final-modal";
import { createCategory } from "../services";
import { getCategories, getTasks, createTask } from "../services";

export default {
  components: {
    SideBar,
    CalendarView,
    CalendarViewHeader,
    VueFinalModal,
  },
  mounted() {
    this.getCategories();
    this.getTasks();
  },
  data() {
    return {
      name: "",
      selectedColor: "",
      categories: [],
      colors: [
        "#fcecea",
        "#f4ece4",
        "#e8e7e0",
        "#e4e1f7",
        "#e4f5ef",
        "#ede0f3",
      ],
      tasks: [],
      showCategoryModal: false,
      calendarDisplay: "month",
      showDate: "",
      showAddModal: false,
      form: {
        name: "",
        description: "",
        frequency: "",
        categoryId: "",
        priority: "",
        status: "",
        dueDate: "",
      },
    };
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
      this.currentPeriodLabel = format(d, "MMMM yyyy");
    },
    close() {
      this.showCategoryModal = false;
    },
    async createCategory() {
      await createCategory({ name: this.name, color: this.color });
      await this.getCategories();
      this.showCategoryModal = false;
    },
    selectColor(color) {
      this.selectedColor = color;
    },
    async getCategories() {
      this.categories = await getCategories();
    },
    async getTasks() {
      const response = await getTasks();
      this.tasks = response.tasks;
    },
    async createTask() {
      await createTask(this.form);
      await this.getTasks();
      this.showAddModal = false;
    },
  },
  computed: {
    items() {
      const response = this.tasks.map((task) => {
        const data = {
          id: task._id,
          startDate: new Date(task.dueDate),
          endDate: new Date(task.dueDate),
          title: task.name,
          classes: ["calendar"],
          style: `color:black; background-color: ${task.category.color};  border-color: ${task.category.color};`,
        };
        return data;
      });
      return response;
    },
  },
};
</script>

<style>
.calendar {
  border-left-style: solid;
  border-right-style: none;
  border-top-style: none;
  border-bottom-style: none;
  border-width: 5px;
}
.cv-header,
.previousPeriod,
.nextPeriod {
  border-style: none;
  border-width: 0px;
}
.periodLabel,
.nextYear,
.previousYear {
  visibility: hidden;
}

.cv-header-nav {
  margin-top: -65px;
  padding-left: -20px;
}
</style>
