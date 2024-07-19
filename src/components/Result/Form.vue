<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group row">
        <b class="col-12 col-sm-3 col-form-label text-sm-right"
          >Điểm lấy mẫu:<i class="text-danger">*</i></b
        >
        <div class="col-12 col-sm-8 col-lg-6 pt-1">
          <LocationWithPointTreeSelect
            v-model="model.point_id"
            @update:modelValue="changePoint"
          >
          </LocationWithPointTreeSelect>
        </div>
      </div>
      <div class="form-group row">
        <b class="col-12 col-sm-3 col-form-label text-sm-right"
          >Đối tượng:<i class="text-danger">*</i></b
        >
        <div class="col-12 col-sm-8 col-lg-6 pt-1">
          <select
            class="form-control form-control-sm"
            v-model="model.object_id"
            :disabled="true"
            @change="changeObject"
          >
            <option v-for="item in objects" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <b class="col-12 col-sm-3 col-form-label text-sm-right"
          >Chỉ tiêu:<i class="text-danger">*</i></b
        >
        <div class="col-12 col-sm-8 col-lg-6 pt-1">
          <select
            class="form-control form-control-sm"
            v-model="model.target_id"
            :disabled="disabled_target"
          >
            <option v-for="item in targets" :value="item.id" :key="item.id">
              {{ item.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <b class="col-12 col-sm-3 col-form-label text-sm-right"
          >Ngày lấy mẫu:<i class="text-danger">*</i></b
        >
        <div class="col-12 col-sm-8 col-lg-6 pt-1">
          <Calendar
            v-model="model.date"
            dateFormat="yy-mm-dd"
            class="date-custom"
            :manualInput="false"
            showIcon
          />
        </div>
      </div>
      <div class="form-group row">
        <b class="col-12 col-sm-3 col-form-label text-sm-right"
          >Giá trị:<i class="text-danger">*</i></b
        >
        <div
          class="col-12 col-sm-8 col-lg-6 pt-1"
          v-if="target.value_type == 'varchar'"
        >
          <input
            v-model="model.value_text"
            class="form-control form-control-sm"
            type="text"
          />
        </div>
        <div
          class="col-12 col-sm-8 col-lg-6 pt-1"
          v-if="target.value_type == 'boolean'"
        >
          <ToggleButton
            v-model="model.value"
            :onLabel="text_true"
            :offLabel="text_false"
            class="p-button-sm"
          />
        </div>
        <div class="col-12 col-sm-8 col-lg-6 pt-1" v-else>
          <input
            v-model="model.value"
            class="form-control form-control-sm"
            type="number"
          />
        </div>
      </div>
      <div class="form-group row">
        <b class="col-12 col-sm-3 col-form-label text-sm-right">Ghi chú:</b>
        <div class="col-12 col-sm-8 col-lg-6 pt-1">
          <textarea
            class="form-control form-control-sm"
            v-model="model.note"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useResult } from "../../stores/Result";
import { useGeneral } from "../../stores/general";
import ToggleButton from "primevue/togglebutton";
import Api from "../../api/Api";
import LocationWithPointTreeSelect from "../../components/TreeSelect/LocationWithPointTreeSelect.vue";
const store_Result = useResult();
const store_general = useGeneral();
const { model } = storeToRefs(store_Result);
const { objects, targets, points } = storeToRefs(store_general);
const value_type = ref("number");
const text_true = ref("Đạt");
const text_false = ref("Không đạt");
const object = computed(() => {
  return objects.value.find((item) => item.id == model.value.object_id) || {};
});
const disabled_target = computed(() => {
  return !object.value.is_multi_target;
});
const changePoint = (point_id) => {
  var point = points.value.find((item) => item.id == point_id) || {};
  model.value.object_id = point.object_id;
  model.value.target_id = point.target_id;
  // model.value.location_id = point.location_id;
  // changeObject();
};
const target = computed(() => {
  return targets.value.find((item) => item.id == model.value.target_id) || {};
});
// const changeObject = () => {
//     // console.log(disabled_target.value);
//     Api.targetsOfObject(model.value.object_id).then((res) => {
//         targets.value = res;
//     })
// }
watch(
  object,
  () => {
    Api.targetsOfObject(model.value.object_id).then((res) => {
      targets.value = res;
    });
  },
  { immediate: true }
);
watch(
  target,
  () => {
    model.value.value = null;
    if (target.value.value_type == "boolean") {
      value_type.value = "checkbox";
      text_true.value = target.value.text_yes;
      text_false.value = target.value.text_no;
      model.value.value =
        model.value.value == null || model.value.value == 0 ? 0 : 1;
    } else if (target.value.value_type == "varchar") {
      value_type.value = "text";
    } else {
      value_type.value = "number";
    }
  },
  { immediate: true }
);
onMounted(() => {
  Api.objects().then((res) => {
    objects.value = res;
  });
  // Api.targets().then((res) => {
  //     targets.value = res;
  // })
  Api.points().then((res) => {
    points.value = res;
  });
});
</script>