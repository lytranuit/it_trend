<template>
  <div class="row clearfix">
    <div class="col-12">
      <section class="card card-fluid">
        <div class="card-body">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <b>Loại báo cáo:</b>
                <div class="pt-1">
                  <select
                    class="form-control form-control-sm"
                    v-model="type"
                    @change="changeType"
                  >
                    <option value="1">GHCB,GHHĐ</option>
                    <option value="2">Raw data</option>
                    <option value="3">Trend</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-if="type == 1">
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
                          v-for="item in objects"
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
                          v-for="item in targets"
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
                    <b>Khoảng thời gian:<i class="text-danger">*</i></b>
                    <div class="pt-1">
                      <Calendar
                        v-model="model.dates"
                        dateFormat="dd/mm/yy"
                        class="date-custom"
                        showIcon
                        selectionMode="range"
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
                <div class="col-md-3">
                  <div class="form-group">
                    <b>&nbsp;</b>
                    <div style="margin-top: 2px">
                      <!-- <Button label="Tính GHCB,GHHH" size="small" severity="success"/> -->
                      <Button
                        label="Xuất File"
                        size="small"
                        icon="pi pi-save"
                        @click="xuatlimit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-12" v-else-if="type == 2">
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
                          v-for="item in objects"
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
                    <b>Khoảng thời gian:<i class="text-danger">*</i></b>
                    <div class="pt-1">
                      <Calendar
                        v-model="model.dates"
                        dateFormat="dd/mm/yy"
                        class="date-custom"
                        showIcon
                        selectionMode="range"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <b>&nbsp;</b>
                    <div style="margin-top: 2px">
                      <!-- <Button label="Tính GHCB,GHHH" size="small" severity="success"/> -->
                      <Button
                        label="Xuất File"
                        size="small"
                        icon="pi pi-save"
                        @click="xuatraw"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12" v-else-if="type == 3">
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
                          v-for="item in objects"
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
                    <b>Báo cáo tổng hợp:<i class="text-danger">*</i></b>
                    <div class="pt-1">
                      <select
                        class="form-control form-control-sm"
                        v-model="model.type_bc"
                        @change="changeBC"
                      >
                        <option value="1">Hàng tháng</option>
                        <option value="2">6 tháng/lần</option>
                        <option value="3">Hàng năm</option>
                        <option value="4">2 năm/lần</option>
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
                    <b>Khoảng thời gian:<i class="text-danger">*</i></b>
                    <div class="pt-1">
                      <Calendar
                        v-model="model.dates"
                        dateFormat="dd/mm/yy"
                        class="date-custom"
                        showIcon
                        selectionMode="range"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <b
                      >Khoảng thời gian trước đó:<i class="text-danger">*</i></b
                    >
                    <div class="pt-1">
                      <Calendar
                        v-model="model.dates_prev"
                        dateFormat="dd/mm/yy"
                        class="date-custom"
                        showIcon
                        selectionMode="range"
                        showButtonBar
                      />
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <b>&nbsp;</b>
                    <div style="margin-top: 2px">
                      <Button
                        label="Vẽ Chart"
                        size="small"
                        severity="warning"
                        icon="fas fa-chart-bar"
                        class="mr-2"
                        @click="drawChart"
                      />
                      <Button
                        label="Xuất File"
                        size="small"
                        icon="pi pi-save"
                        @click="xuattrend"
                        v-if="groups.length > 0"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <div class="row" v-if="groups.length > 0">
    <div class="col-12">
      <div class="card mb-3">
        <div class="card-header">
          <h5 class="mb-0">BIỂU ĐỒ XU HƯỚNG</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <Accordion
                :multiple="true"
                :activeIndex="groups.map((_, index) => index)"
              >
                <AccordionTab
                  :header="fre.label"
                  v-for="fre in groups"
                  :key="fre.timestamp"
                >
                  <Accordion
                    :multiple="true"
                    :activeIndex="fre.children.map((_, index) => index)"
                  >
                    <AccordionTab
                      :header="target.label"
                      v-for="target in fre.children"
                      :key="target.timestamp"
                    >
                      <template v-if="model.object_id == 2">
                        <Accordion
                          :multiple="true"
                          :activeIndex="
                            target.children.map((_, index) => index)
                          "
                        >
                          <AccordionTab
                            :header="location.label"
                            v-for="location in target.children"
                            :key="location.timestamp"
                          >
                            <ChartReport
                              :data="location"
                              :id="
                                'chart_' +
                                fre.key +
                                '_' +
                                target.key +
                                '_' +
                                location.key
                              "
                            ></ChartReport>
                          </AccordionTab>
                        </Accordion>
                      </template>
                      <template v-else>
                        <ChartReport
                          :data="target"
                          :id="'chart_' + fre.key + '_' + target.key"
                        ></ChartReport>
                      </template>
                    </AccordionTab>
                  </Accordion>
                </AccordionTab>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading :waiting="waiting"></Loading>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import Accordion from "primevue/accordion";
import AccordionTab from "primevue/accordiontab";
import reportApi from "../../api/reportApi";
import Api from "../../api/Api";
import LocationWithPointTreeSelect from "../../components/TreeSelect/LocationWithPointTreeSelect.vue";
import { useGeneral } from "../../stores/general";
import { storeToRefs } from "pinia";
import Loading from "../../components/Loading.vue";
import Button from "primevue/button";
import moment from "moment";

import ChartReport from "../../components/ChartReport.vue";

const groups = ref([]);
const type = ref();
const model = ref({});
const disabled_target = ref(true);
const disabled_point = ref(true);
const waiting = ref(false);
const store_general = useGeneral();
const { objects, targets, locationsWithPoint } = storeToRefs(store_general);
const dates = computed(() => {
  return model.value.dates;
});
const dates_prev = computed(() => {
  return model.value.dates_prev;
});
const changeType = () => {
  model.value.object_id = null;
  model.value.target_id = null;
  model.value.list_point = null;
  model.value.type_bc = null;
  targets.value = [];
  // objects.value = [];
  locationsWithPoint.value = [];
  disabled_target.value = true;
  disabled_point.value = true;
};
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
watch(
  dates_prev,
  (newValue, oldValue) => {
    if (newValue) {
      model.value.date_from_prev = newValue[0];
      model.value.date_to_prev = newValue[1];
    } else {
      model.value.date_from_prev = null;
      model.value.date_to_prev = null;
    }
  },
  { immediate: true }
);
const xuatlimit = () => {
  if (!model.value.object_id) {
    alert("Chưa chọn đối tượng!");
    return;
  }
  if (!model.value.target_id) {
    alert("Chưa chọn Chỉ tiêu!");
    return;
  }
  if (!model.value.list_point || !model.value.list_point.length) {
    alert("Chưa chọn điểm lấy mẫu!");
    return;
  }
  if (!model.value.date_from || !model.value.date_to) {
    alert("Chưa chọn khoảng thời gian!");
    return;
  }
  if (!model.value.standard_limit) {
    alert("Chưa nhập tiêu chuẩn!");
    return;
  }
  waiting.value = true;
  reportApi.xuatlimit(model.value).then((res) => {
    waiting.value = false;
    if (res.success) {
      location.href = res.link;
    }
  });
};
const xuatraw = () => {
  if (!model.value.object_id) {
    alert("Chưa chọn đối tượng!");
    return;
  }
  if (!model.value.list_point || !model.value.list_point.length) {
    alert("Chưa chọn điểm lấy mẫu!");
    return;
  }
  if (!model.value.date_from || !model.value.date_to) {
    alert("Chưa chọn khoảng thời gian!");
    return;
  }
  waiting.value = true;
  reportApi.xuatraw(model.value).then((res) => {
    waiting.value = false;
    if (res.success) {
      location.href = res.link;
    }
  });
};
const xuattrend = () => {
  if (!model.value.object_id) {
    alert("Chưa chọn đối tượng!");
    return;
  }
  if (!model.value.list_point || !model.value.list_point.length) {
    alert("Chưa chọn điểm lấy mẫu!");
    return;
  }
  if (!model.value.date_from || !model.value.date_to) {
    alert("Chưa chọn khoảng thời gian!");
    return;
  }
  var objects = [];
  if (model.value.object_id == 2) {
    for (var f of groups.value) {
      for (var t of f.children) {
        for (var l of t.children) {
          var parent = $("#chart_" + f.key + "_" + t.key + "_" + l.key);
          var image = $("canvas", parent)[0].toDataURL("image/png", 1);
          // console.log(image);
          var id = $(parent).attr("id");
          objects.push({
            name: id,
            image: image,
            chart: JSON.stringify(l.chart),
          });
        }
      }
    }
  } else {
    for (var f of groups.value) {
      for (var t of f.children) {
        var parent = $("#chart_" + f.key + "_" + t.key);
        var image = $("canvas", parent)[0].toDataURL("image/png", 1);
        // console.log(image);
        var id = $(parent).attr("id");
        objects.push({
          name: id,
          image: image,
          chart: JSON.stringify(t.chart),
        });
      }
    }
  }
  waiting.value = true;
  reportApi.uploadImage({ files: objects }).then((res) => {
    model.value.timestamp = res.timestamp;
    reportApi.xuattrend(model.value).then((res) => {
      waiting.value = false;
      if (res.success) {
        location.href = res.link;
      }
    });
  });
};

const drawChart = () => {
  if (!model.value.object_id) {
    alert("Chưa chọn đối tượng!");
    return;
  }
  if (!model.value.list_point || !model.value.list_point.length) {
    alert("Chưa chọn điểm lấy mẫu!");
    return;
  }
  if (!model.value.date_from || !model.value.date_to) {
    alert("Chưa chọn khoảng thời gian!");
    return;
  }
  waiting.value = true;
  // console.log(model.value);
  // return;
  reportApi.drawChart(model.value).then((res) => {
    waiting.value = false;
    groups.value = res.data;
  });
};

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
const type_bc = computed(() => {
  return model.value.type_bc;
});
// const targets1 = computed(() => {
//   return targets.value.map((item) => {
//     item.label = item.name;
//     return item;
//   });
// });
const changeObject = () => {
  model.value.target_id = null;
  model.value.list_point = null;
};
const changeTarget = () => {
  model.value.list_point = null;
};

const changeBC = () => {
  model.value.list_point = null;

  if (model.value.type_bc == 1) {
    model.value.dates = [
      moment().startOf("month").toDate(),
      moment().endOf("month").toDate(),
    ];
    model.value.dates_prev = [
      moment().subtract(1, "M").startOf("month").toDate(),
      moment().subtract(1, "M").endOf("month").toDate(),
    ];
  } else if (model.value.type_bc == 3) {
    model.value.dates = [
      moment().startOf("year").toDate(),
      moment().endOf("year").toDate(),
    ];
    model.value.dates_prev = [
      moment().subtract(1, "y").startOf("year").toDate(),
      moment().subtract(1, "y").endOf("year").toDate(),
    ];
  }
};

const xuatexcelraw = () => {
  waiting.value = true;
  report.xuatexcelraw().then((res) => {
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
    if (type.value == 1) {
      Api.targetsOfObject(object.value.id).then((res) => {
        disabled_target.value = false;
        model.value.target_id = null;
        model.value.list_target_id = null;
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
    } else if (type.value == 3) {
      if (model.value.type_bc) {
        Api.locationsWithPoint(object.value.id, null, model.value.type_bc).then(
          (res) => {
            disabled_point.value = false;
            locationsWithPoint.value = res;
          }
        );
      } else {
        disabled_point.value = true;
      }
    } else {
      Api.locationsWithPoint(object.value.id).then((res) => {
        disabled_point.value = false;
        locationsWithPoint.value = res;
      });
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
watch(
  type_bc,
  () => {
    if (!type_bc.value) return;
    if (model.value.object_id) {
      // console.log(object.value);
      Api.locationsWithPoint(
        model.value.object_id,
        null,
        model.value.type_bc
      ).then((res) => {
        disabled_point.value = false;
        locationsWithPoint.value = res;
      });
    }
  },
  { immediate: true }
);
</script>
