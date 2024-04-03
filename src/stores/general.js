import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useGeneral = defineStore("General", () => {
  const objects = ref([]);
  const targets = ref([]);
  const locations = ref([]);
  const points = ref([]);
  const locationsWithPoint = ref([]);
  return {
    objects,
    targets,
    locations,
    points,
    locationsWithPoint,
  };
});
