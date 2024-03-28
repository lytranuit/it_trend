import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const usePoint = defineStore("Point", () => {
  const visibleDialog = ref(false);
  const headerForm = ref("Tạo mới");
  const model = ref({});
  return {
    model,
    headerForm,
    visibleDialog,
  };
});
