import { defineStore } from "pinia";

export const useInfoStore = defineStore("info", {
  state: () => {
    return {
      username: "" as string,
      email: "" as string,
      discord: "" as string,
      country: "" as string,
    };
  },
  persist: {
    key: "promise87-notify-me",
    storage: localStorage,
  },
  getters: {},
  actions: {},
});
