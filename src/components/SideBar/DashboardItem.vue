<template>
  <router-link
    :to="link"
    class="mt-6 hover:bg-menuItemColor px-4 py-2 rounded w-full cursor-pointer"
    :class="{ 'bg-menuItemColor': active }"
  >
    <li class="lg:flex hidden">
      <font-awesome-icon class="mr-4 mt-1" :icon="[iconType, icon]" />
      <span>{{ itemName }}</span>
    </li>

    <li class="lg:hidden flex flex-col items-center">
      <font-awesome-icon :icon="[iconType, icon]" />
    </li>
  </router-link>
</template>

<script>
export default {
  props: {
    itemName: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    iconType: {
      type: String,
      default: "far",
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: "",
    },
  },
};
</script>

<style></style>
