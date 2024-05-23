<template>
  <div class="row clearfix">
    <div class="col-12">
      <form method="POST" id="form">
        <section class="card card-fluid">
          <div class="card-header">
            <div class="d-inline-block w-100">
              <Button label="Lưu lại" icon="pi pi-save" class="p-button-success p-button-sm mr-2"
                @click.prevent="submit()" v-if="model.id > 0"></Button>
              <Button label="Tạo mới" icon="pi pi-plus" class="p-button-success p-button-sm mr-2"
                @click.prevent="submit()" v-else></Button>
            </div>
          </div>
          <div class="card-body">
            <Form></Form>
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
import { useRoute, useRouter } from "vue-router";
import Button from "primevue/button";
import LimitApi from "../../../api/LimitApi";
import { useToast } from "primevue/usetoast";
import Form from "../../../components/Limit/Form.vue";
import { useLimit } from "../../../stores/Limit";
import moment from "moment";
const store_Limit = useLimit();
const { model } = storeToRefs(store_Limit);
const toast = useToast();
const route = useRoute();
const router = useRouter();
onMounted(() => {
  LimitApi.get(route.params.id).then((res) => {
    res.dates = res.date_from ? [moment(res.date_from).toDate(), moment(res.date_to).toDate()] : null;
    console.log(route.query)
    if (route.query.copy) {
      res.id = 0;
      res.date_effect = null;
      res.date_from = null;
      res.date_to = null;
    }
    model.value = res;
  });
});

const submit = () => {
  if (!vaild()) {
    alert("Điền đây đủ thông tin (*)!")
    return;
  }
  LimitApi.Save(model.value).then((res) => {
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Thành công",
        life: 3000,
      });
      router.push("/Limit");
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
  if (!model.value.name) return false;
  if (!model.value.object_id) return false;
  if (!model.value.target_id) return false;
  if (!model.value.date_effect) return false;
  if (!model.value.list_point || !model.value.list_point.length) return false;
  return true;
}
</script>
