<template>
  <div class="row clearfix">
    <div class="col-12">
      <form method="POST" id="form">
        <section class="card card-fluid">
          <div class="card-header">
            <div class="d-inline-block w-100">
              <Button label="Lưu lại" icon="pi pi-save" class="p-button-success p-button-sm mr-2"
                @click.prevent="submit()"></Button>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group row">
                  <b class="col-12 col-lg-2 col-form-label">Tên tiếng việt:<i class="text-danger">*</i></b>
                  <div class="col-12 col-lg-4 pt-1">
                    <input type="text" class="form-control" v-model="data.name" />
                  </div>
                  <b class="col-12 col-lg-2 col-form-label">Tên tiếng anh:</b>
                  <div class="col-12 col-lg-4 pt-1">
                    <input type="text" class="form-control" v-model="data.name_en" />
                  </div>
                </div>
                <div class="form-group row">
                  <b class="col-12 col-lg-2 col-form-label">Điểm lấy mẫu có nhiều chỉ tiêu:</b>
                  <div class="col-12 col-lg-4 pt-1">
                    <InputSwitch v-model="data.is_multi_target" inputClass="p-inputtext-sm" />
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <PickList v-model="targets" listStyle="height:342px" dataKey="id" breakpoint="1400px">
                  <template #sourceheader> Available </template>
                  <template #targetheader> Selected </template>
                  <template #item="slotProps">
                    <div class="flex flex-wrap p-2">
                      {{ slotProps.item.id }} - {{ slotProps.item.name }}
                    </div>
                  </template>
                </PickList>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import Button from "primevue/button";
import PickList from 'primevue/picklist';
import InputSwitch from 'primevue/inputswitch';
import ObjectApi from "../../../api/ObjectApi";
import { useToast } from "primevue/usetoast";
import TargetApi from "../../../api/TargetApi";
const toast = useToast();
const route = useRoute();
const data = ref({});
const targets = ref([]);
onMounted(() => {
  ObjectApi.get(route.params.id).then((res) => {
    data.value = res;
    var data_targets = data.value.targets.map((item) => {
      return item.target;
    }) || [];
    var targets_id = data_targets.map((item) => item.id);
    TargetApi.getList().then((res) => {
      res = res.filter((item) => {
        return targets_id.indexOf(item.id) == -1;
      });
      targets.value = [res, data_targets];
    })
  });


});

const submit = () => {
  if (!vaild()) {
    alert("Điền đây đủ thông tin (*)!")
    return;
  }
  console.log(targets.value);
  data.value.list_target = targets.value[1].map((item) => {
    return item.id;
  })
  ObjectApi.Save(data.value).then((res) => {
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Thành công",
        life: 3000,
      });
    } else {
      toast.add({
        severity: "error",
        summary: "Lỗi",
        detail: res.message,
        life: 3000,
      });
    }
    // console.log(response)
  });
};

const vaild = () => {
  if (!data.value.name) return false;
  return true;
}
</script>
