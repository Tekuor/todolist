<template>
  <div class="h-16 flex flex-row-reverse pt-4">
    <div class="w-1/3 flex flex-row">
      <div class="flex justify-end w-full mr-6">
        <font-awesome-icon class="mt-2" :icon="['far', 'bell']" />
        <img
          class="rounded-full h-6 w-6 ml-10 mt-1"
          src="https://randomuser.me/api/portraits/women/81.jpg"
          alt="user image"
        />
        <p class="mx-4 mt-1">{{ name }}</p>
        <font-awesome-icon class="mt-2" :icon="['fas', 'angle-down']" />
      </div>
    </div>
    <div class="w-1/3" v-show="showSearch">
      <input
        type="text"
        id="email"
        name="email"
        class="rounded-md w-full px-4 h-8 border border-gray focus:outline-none bg-secondary"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: localStorage.getItem("name"),
    };
  },
  props: {
    showSearch: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style></style>
