<template>
  <div class="row">
    <div class="col-md-12">
      <div class="form-group row">
        <div class="col-md-3">
          <div class="form-group">
            <b>Tên:<i class="text-danger">*</i></b>
            <div class="pt-1">
              <input
                class="form-control form-control-sm"
                v-model="model.name"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-3">
          <div class="form-group">
            <b>Đối tượng:<i class="text-danger">*</i></b>
            <div class="pt-1">
              <select
                class="form-control form-control-sm"
                v-model="model.object_id"
                @change="changeObject"
              >
                <option
                  v-for="(item, index) in objects"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <b>Chỉ tiêu:<i class="text-danger">*</i></b>
            <div class="pt-1">
              <select
                class="form-control form-control-sm"
                v-model="model.target_id"
                @change="changeTarget"
                :disabled="disabled_target"
              >
                <option
                  v-for="(item, index) in targets"
                  :value="item.id"
                  :key="item.id"
                >
                  {{ item.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <b>Áp dụng cho:<i class="text-danger">*</i></b>
            <div class="pt-1">
              <LocationWithPointTreeSelect
                v-model="model.list_point"
                :multiple="true"
                :flat="false"
                valueConsistsOf="LEAF_PRIORITY"
                :disableBranchNodes="false"
                :defaultExpandLevel="1"
                :disabled="disabled_point"
              >
              </LocationWithPointTreeSelect>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group row">
        <div class="col-md-3">
          <div class="form-group">
            <b>Ngày hiệu lực:<i class="text-danger">*</i></b>
            <div class="pt-1">
              <Calendar
                v-model="model.date_effect"
                dateFormat="yy-mm-dd"
                class="date-custom"
                :manualInput="false"
                showIcon
              />
            </div>
          </div>
        </div>

        <div class="col-md-3">
          <div class="form-group">
            <b>Giới hạn cảnh báo:</b>
            <div class="pt-1">
              <input
                class="form-control form-control-sm"
                v-model="model.alert_limit"
                type="number"
              />
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <b>Giới hạn hành động:</b>
            <div class="pt-1">
              <input
                class="form-control form-control-sm"
                v-model="model.action_limit"
                type="number"
              />
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="form-group">
            <b>Tiêu chuẩn chấp nhận:</b>
            <div class="pt-1">
              <input
                class="form-control form-control-sm"
                v-model="model.standard_limit"
                type="number"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading :waiting="waiting"></Loading>
</template>

<script setup>
import moment from "moment/moment";
import { onMounted, ref, watch, computed } from "vue";
import { storeToRefs } from "pinia";
import { useLimit } from "../../stores/Limit";
import { useGeneral } from "../../stores/general";
import Api from "../../api/Api";
import limitApi from "../../api/limitApi";
import LocationWithPointTreeSelect from "../TreeSelect/LocationWithPointTreeSelect.vue";
import Button from "primevue/button";
import Loading from "../Loading.vue";
const waiting = ref(false);
const store_Limit = useLimit();
const store_general = useGeneral();
const { model } = storeToRefs(store_Limit);
const { objects, targets, locationsWithPoint } = storeToRefs(store_general);
const disabled_target = ref(true);
const disabled_point = ref(true);
const dates = computed(() => {
  return model.value.dates;
});
watch(
  dates,
  (newValue, oldValue) => {
    if (newValue) {
      model.value.date_from = newValue[0];
      model.value.date_to = newValue[1];
    }
  },
  { immediate: true }
);

// watch(model, (newValue, oldValue) => {
//     dates.value = [newValue.date_from, newValue.date_to];
// }, { immediate: true });

const object = computed(() => {
  return objects.value.find((item) => {
    return item.id == model.value.object_id;
  });
});
const target = computed(() => {
  return targets.value.find((item) => {
    return item.id == model.value.target_id;
  });
});
const changeObject = () => {
  model.value.target_id = null;
  model.value.list_point = null;

  // Api.targetsOfObject(object.value.id).then((res) => {
  //     disabled_target.value = false;
  //     targets.value = res.filter((item) => {
  //         return item.value_type == "float";
  //     });
  // });
  // if (object.value.is_multi_target) {
  //     Api.locationsWithPoint(object.value.id).then((res) => {
  //         disabled_point.value = false;
  //         locationsWithPoint.value = res;
  //     });
  // } else {
  //     disabled_point.value = true;
  // }
};
const changeTarget = () => {
  model.value.list_point = null;
  // if (!object.value.is_multi_target) {
  //     model.value.list_point = null;
  //     Api.locationsWithPoint(object.value.id, target.value.id).then((res) => {
  //         disabled_point.value = false;
  //         locationsWithPoint.value = res;
  //     });
  // }
};
const xuatexcel = () => {
  waiting.value = true;
  limitApi.xuatexcel(model.value).then((res) => {
    waiting.value = false;
    if (res.success) {
      location.href = res.link;
    }
  });
};
onMounted(() => {
  Api.objects().then((res) => {
    objects.value = res;
  });
});

watch(
  object,
  () => {
    if (!object.value) return;
    Api.targetsOfObject(object.value.id).then((res) => {
      disabled_target.value = false;
      targets.value = res.filter((item) => {
        return item.value_type == "float";
      });
    });
    if (object.value.is_multi_target) {
      Api.locationsWithPoint(object.value.id).then((res) => {
        disabled_point.value = false;
        locationsWithPoint.value = res;
      });
    } else {
      disabled_point.value = true;
    }
  },
  { immediate: true }
);

watch(
  target,
  () => {
    if (!target.value) return;
    if (!object.value.is_multi_target) {
      // console.log(object.value);
      Api.locationsWithPoint(model.value.object_id, model.value.target_id).then(
        (res) => {
          disabled_point.value = false;
          locationsWithPoint.value = res;
        }
      );
    }
  },
  { immediate: true }
);
</script>