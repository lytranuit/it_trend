<template>
  <div class="card mb-3">
    <div class="card-header">
      <h5 class="mb-0">BỘ LỌC</h5>
    </div>
    <div class="card-body" id="form-dang-tin">
      <div class="row">
        <div class="col-md-10">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <b>Đối tượng:<i class="text-danger">*</i></b>
                <div class="pt-1">
                  <SelectButton
                    v-model="model.object_id"
                    :options="objects"
                    aria-labelledby="basic"
                    optionLabel="name"
                    optionValue="id"
                    :allowEmpty="false"
                    @change="changeObject"
                    :pt="{ button: 'p-button-sm' }"
                  />
                </div>
              </div>
            </div>
            <div class="col-md-9">
              <div class="form-group">
                <b>Điểm lấy mẫu:<i class="text-danger">*</i></b>
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
            <div class="col-md-12">
              <b class="col-form-label text-sm-right"
                >Thời gian:<i class="text-danger">*</i></b
              >
              <div class="pt-1">
                <Calendar
                  v-model="model.dates"
                  dateFormat="dd/mm/yy"
                  mask="99/99/9999"
                  selectionMode="range"
                  :hideOnRangeSelection="true"
                  class="w-100"
                  showButtonBar
                  showIcon
                  :numberOfMonths="3"
                  :max-date="new Date()"
                />
              </div>
            </div>
          </div>
        </div>
        <div
          class="col-md-2 text-center pt-2"
          style="
            display: inline-flex;
            align-items: self-end;
            justify-content: center;
            align-self: center;
          "
        >
          <Button
            label="Vẽ biểu đồ"
            size="small"
            icon="fas fa-chart-bar"
            severity="warning"
            @click="apdung"
          ></Button>
        </div>
      </div>
    </div>
  </div>
  <div class="card mb-3">
    <div class="card-header">
      <h5 class="mb-0">BIỂU ĐỒ XU HƯỚNG</h5>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-12">
          <!-- <Accordion :multiple="true">:activeIndex="groups.map((_, index) => index)"
                        <AccordionTab :header="location.label" v-for="location in groups" :key="location.timestamp">
                            <Accordion :multiple="true">
                                <AccordionTab :header="fre.label" v-for="fre in location.children"
                                    :key="location.timestamp"> -->
          <Accordion :multiple="true">
            <!--:activeIndex="fre.children.map((_, index) => index)"-->
            <AccordionTab
              :header="target.label"
              v-for="target in groups"
              :key="target.timestamp"
            >
              <ChartReport
                :data="target"
                :id="'chart_' + target.key"
              ></ChartReport>
            </AccordionTab>
          </Accordion>
          <!-- </AccordionTab>
                            </Accordion>
                        </AccordionTab>

                    </Accordion> -->
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-md-6">
      <div class="card mb-3">
        <div class="card-header">
          <h5 class="mb-0">Vượt giới hạn cảnh báo</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Điểm</th>
                <th>Ngày lấy mẫu</th>
                <th>Chỉ tiêu</th>
                <th>Giá trị</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list_alert" :key="item.id">
                <td>{{ item.point.code }}</td>
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.target.name }}</td>
                <td>
                  <b>{{ item.value }}</b> / {{ item.limit_alert }}
                  {{ item.target.unit }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <div class="card mb-3">
        <div class="card-header">
          <h5 class="mb-0">Vượt giới hạn hành động</h5>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Điểm</th>
                <th>Ngày lấy mẫu</th>
                <th>Chỉ tiêu</th>
                <th>Giá trị</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in list_action" :key="item.id">
                <td>{{ item.point.code }}</td>
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.target.name }}</td>
                <td>
                  <b>{{ item.value }}</b> / {{ item.limit_action }}
                  {{ item.target.unit }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <Loading :waiting="waiting"></Loading>
</template>
<script setup>
import { computed, onMounted, ref, watch } from "vue";
import LocationWithPointTreeSelect from "../components/TreeSelect/LocationWithPointTreeSelect.vue";
import Api from "../api/Api";
import adminApi from "../api/adminApi";
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import { storeToRefs } from "pinia";
import { useGeneral } from "../stores/general";
import Loading from "../components/Loading.vue";
import { formatDate } from "../utilities/util";
import moment from "moment";
import ChartReport from "../components/ChartReport.vue";

// Chart.register(annotationPlugin);
const waiting = ref(false);
const groups = ref([]);
const list_action = ref([]);
const list_alert = ref([]);
const store_general = useGeneral();
const { objects, targets, locationsWithPoint } = storeToRefs(store_general);

const disabled_point = ref(true);
const model = ref({
  object_id: 2,
  dates: [moment().subtract(1, "Y").toDate(), moment().toDate()],
});
const changeObject = () => {
  model.value.list_point = null;
};
const object = computed(() => {
  return objects.value.find((item) => {
    return item.id == model.value.object_id;
  });
});
const apdung = () => {
  if (!model.value.list_point) {
    alert("Chưa chọn điểm lấy mẫu!");
    return;
  }
  if (!model.value.dates) {
    alert("Chưa chọn thời gian!");
    return;
  }
  waiting.value = true;
  adminApi
    .chart({
      list_point: model.value.list_point,
      tungay: model.value.dates[0],
      denngay: model.value.dates[1],
    })
    .then((res) => {
      waiting.value = false;
      groups.value = res.groups;
    });
  adminApi
    .actions({
      list_point: model.value.list_point,
      tungay: model.value.dates[0],
      denngay: model.value.dates[1],
    })
    .then((res) => {
      list_action.value = res;
    });
  adminApi
    .alerts({
      list_point: model.value.list_point,
      tungay: model.value.dates[0],
      denngay: model.value.dates[1],
    })
    .then((res) => {
      list_alert.value = res;
    });
};

onMounted(() => {
  waiting.value = true;
  Api.objects().then((res) => {
    objects.value = res;
    waiting.value = false;
    if (objects.value.length > 0) model.value.object_id = objects.value[0].id;
  });
  // adminApi.actions().then((res) => {
  //   list_action.value = res;
  // });
  // adminApi.alerts().then((res) => {
  //   list_alert.value = res;
  // });
});

watch(
  object,
  () => {
    if (!object.value) return;
    Api.locationsWithPoint(object.value.id).then((res) => {
      disabled_point.value = false;
      locationsWithPoint.value = res;
    });
  },
  { immediate: true }
);
</script>
<style>
.p-inputtext {
  font-size: 13px;
}
</style>