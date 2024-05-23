<template>
  <TreeSelect
    :options="objects"
    :normalizer="normalizer"
    :multiple="multiple"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  ></TreeSelect>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useGeneral } from "../../stores/general";
import Api from "../../api/Api";
const props = defineProps({
  modelValue: {
    type: [String, Array],
  },
  multiple: {
    type: Boolean,
    default: false,
  },
});
const normalizer = (node) => {
  return {
    id: node.id,
    label: node.name,
  };
};
const emit = defineEmits(["update:modelValue"]);
const store = useGeneral();
const { objects } = storeToRefs(store);
onMounted(() => {
  Api.objects().then((res) => {
    objects.value = res;
  });
});
</script>
