<template>
  <div class="w-full h-screen bg-primary">
    <div class="flex flex-col items-center py-8">
      <img src="../../assets/todolist2.png" />
    </div>
    <div class="flex flex-col justify-between">
      <ul
        class="list-none flex flex-col items-start text-white lg:mx-auto mx-0"
      >
        <DashboardItem
          itemName="Dashboard"
          icon="calendar"
          :active="currentRouteName === 'Dashboard'"
          link="/dashboard"
        />
        <DashboardItem
          itemName="Tasks"
          icon="clone"
          :active="currentRouteName === 'Tasks'"
          link="/tasks"
        />
        <DashboardItem
          itemName="Calendar"
          icon="calendar"
          :active="currentRouteName === 'Calendar'"
          link="/calendar"
        />
        <DashboardItem
          itemName="Settings"
          icon="cog"
          iconType="fas"
          :active="currentRouteName === 'Settings'"
        />
        <DashboardItem
          itemName="Support"
          icon="question-circle"
          :active="currentRouteName === 'Support'"
        />

        <DashboardItem
          class="mt-32"
          itemName="Logout"
          icon="sign-out-alt"
          iconType="fas"
          @click="logout()"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import DashboardItem from "./DashboardItem.vue";
import { logout } from "../../services";
export default {
  components: {
    DashboardItem,
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
  methods: {
    async logout() {
      await logout();

      this.$router.push({ path: "/login" });
    },
  },
};
</script>

<style></style>
