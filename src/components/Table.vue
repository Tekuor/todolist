<template>
  <table
    class="bg-white w-full md:table block md:overflow-x-none overflow-x-auto"
  >
    <thead>
      <tr class="border-b border-gray">
        <th v-for="(data, index) in tableColumns" :key="index">
          {{ data }}
        </th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(data, index) in tableData"
        :key="index"
        :class="{ 'bg-secondary': index % 2 !== 0 }"
      >
        <td class="py-4 pl-4">
          <div class="flex flex-row">
            <input
              class="mr-6 mt-2"
              type="checkbox"
              :id="data._id"
              :value="data._id"
            />
            {{ data.name }}
          </div>
        </td>
        <td>{{ data.description }}</td>
        <td class="flex flex-row justify-center">
          <div
            class="rounded-md py-1 text-center mr-2 inline-block px-4 mt-3 font-semibold"
            :class="[`bg-${data.category.color}-50`]"
          >
            <p>{{ data.category.name }}</p>
          </div>
        </td>
        <td>{{ formatDate(data.createdDate) }}</td>
        <td>{{ formatDate(data.dueDate) }}</td>
        <td>
          <div
            class="rounded-full py-1 text-center mr-2 inline-block px-4 mt-1 font-semibold"
            :class="{
              'bg-success': data.status === 'Completed',
              'bg-progress': data.status === 'In-progress',
            }"
          >
            <p>{{ data.status }}</p>
          </div>
        </td>
        <td class="pr-4">
          <Popper>
            <font-awesome-icon
              class="mt-2 cursor-pointer"
              :icon="['fas', 'ellipsis-v']"
            />
            <template #content>
              <div
                class="bg-white min-h-16 w-28 mr-6 rounded-md border border-gray"
              >
                <ul class="list-none mx-2 py-2">
                  <li
                    class="hover:bg-secondary px-2 rounded-md cursor-pointer"
                    @click="selectTask(data)"
                  >
                    <font-awesome-icon
                      class="mt-2 mr-2"
                      :icon="['fas', 'pencil-alt']"
                    />
                    Edit
                  </li>
                  <li class="hover:bg-secondary px-2 rounded-md cursor-pointer">
                    <font-awesome-icon
                      class="mt-2 mr-2"
                      :icon="['fas', 'trash-alt']"
                    />
                    Delete
                  </li>
                </ul>
              </div>
            </template>
          </Popper>
        </td>
      </tr>
    </tbody>

    <vue-final-modal
      v-model="showEditModal"
      @click-outside="showEditModal = false"
    >
      <div class="flex flex-row justify-center mt-16">
        <div
          class="md:w-1/2 w-full rounded-lg bg-white"
          style="min-height: 90px"
        >
          <div class="border-b border-gray">
            <h3 class="p-6 font-medium text-lg">Edit task</h3>
          </div>

          <div class="flex flex-row px-6 justify-between">
            <div class="w-full pr-8">
              <div class="my-4">
                <label>Title</label>
                <input
                  v-model="editing.name"
                  type="text"
                  placeholder="Name your task"
                  class="rounded w-full px-4 h-10 border border-gray focus:outline-none mt-2"
                />
              </div>

              <div class="my-4">
                <label>Category</label>
                <select
                  v-model="editing.categoryId"
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
                  v-model="editing.description"
                  placeholder="Add description"
                >
                </textarea>
              </div>
            </div>
            <div class="w-full pl-8">
              <div class="my-4">
                <label>Schedule</label>
                <input
                  v-model="editing.dueDate"
                  type="date"
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
                  v-model="editing.frequency"
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
                  v-model="editing.priority"
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
                  v-model="editing.status"
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
              @click="update()"
            >
              Edit task
            </button>
          </div>
        </div>
      </div>
    </vue-final-modal>
  </table>
</template>

<script>
import Popper from "vue3-popper";
import { VueFinalModal } from "vue-final-modal";
import { format } from "date-fns";
import { getCategories, updateTask } from "../services";

export default {
  props: {
    tableData: {
      type: () => {
        return [];
      },
    },
    tableColumns: {
      type: () => {
        return [];
      },
    },
  },
  components: {
    Popper,
    VueFinalModal,
  },
  mounted() {
    this.getCategories();
  },
  data() {
    return {
      showEditModal: false,
      categories: [],
      editing: {},
    };
  },
  methods: {
    formatDate(date) {
      return format(new Date(date), "dd/MM/yyy");
    },
    async getCategories() {
      this.categories = await getCategories();
    },
    selectTask(data) {
      this.editing = Object.assign({}, data);
      this.editing.dueDate = format(
        new Date(this.editing.dueDate),
        "yyyy-MM-dd"
      );
      this.showEditModal = true;
    },
    async update() {
      await updateTask(this.editing);
      this.$emit("getTasks");
      this.showEditModal = false;
    },
  },
};
</script>

<style></style>
