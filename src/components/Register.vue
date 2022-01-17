<template>
  <div class="rounded-md bg-white p-8 lg:w-4/12 w-full">
    <div class="mb-4 flex items-center flex-col">
      <img src="../assets/todolist1.png" />
    </div>

    <p class="mt-6 mb-2">Name</p>
    <input
      type="text"
      v-model="name"
      class="rounded w-full px-4 h-10 border border-gray focus:outline-none"
    />

    <p class="mt-6 mb-2">Email</p>
    <input
      type="text"
      v-model="email"
      class="rounded w-full px-4 h-10 border border-gray focus:outline-none"
    />

    <p class="my-2">Password</p>
    <div class="flex flex-row">
      <input
        :type="type"
        v-model="password"
        class="rounded-l w-full px-4 h-10 border border-gray border-r-0 focus:outline-none"
      />

      <div
        class="bg-white rounded-r border border-gray border-l-0"
        @click="showPassword()"
      >
        <svg
          v-if="type === 'password'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mt-3 mr-4 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>

        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mt-3 mr-4 cursor-pointer text-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      </div>
    </div>

    <button
      type="button"
      class="bg-primary text-white w-full rounded h-10 mt-10"
      @click="registerUser()"
    >
      Register
    </button>
  </div>
</template>

<script>
import { register } from "../services";

export default {
  data() {
    return {
      type: "password",
      email: "",
      password: "",
      name: "",
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
      } else {
        this.type = "password";
      }
    },
    async registerUser() {
      const data = {
        email: this.email,
        password: this.password,
        name: this.name,
      };

      const response = await register(data);

      if (response.user) {
        this.$router.push({ path: "/dashboard" });
      }
    },
  },
};
</script>

<style></style>
