<template>
  <TreeSelect
    :options="locationsWithPoint"
    :multiple="multiple"
    :modelValue="modelValue"
    :normalizer="normalizer"
    :flat="flat"
    :name="name"
    :required="required"
    :value-consists-of="valueConsistsOf"
    :append-to-body="true"
    @update:modelValue="emit('update:modelValue', $event)"
    :disable-branch-nodes="disableBranchNodes"
    :disabled="disabled"
    :default-expand-level="defaultExpandLevel"
    :limit="5"
    :limitText="(count) => 'và ' + count + ' điểm nữa'"
  >
  </TreeSelect>
</template>

<script setup>
// import TreeSelect from "vue3-acies-treeselect";
import { useGeneral } from "../../stores/general";
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import Api from "../../api/Api";
const props = defineProps({
  modelValue: {
    type: [String, Array, Number],
  },
  valueConsistsOf: String, //ALL_WITH_INDETERMINATE
  multiple: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    default: "location",
  },
  flat: {
    type: Boolean,
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  disableBranchNodes: {
    type: Boolean,
    default: true,
  },
  defaultExpandLevel: {
    type: [String, Number],
    default: 0,
  },
});
const emit = defineEmits(["update:modelValue"]);
const store = useGeneral();
const { locationsWithPoint } = storeToRefs(store);
const normalizer = (node) => {
  return {
    id: node.id,
    label: node.label,
  };
};
onMounted(() => {
  Api.locationsWithPoint().then((res) => {
    locationsWithPoint.value = res;
  });
});
</script>
