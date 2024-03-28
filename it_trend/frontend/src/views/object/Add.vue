<template>
  <div class="row clearfix">
    <div class="col-12">
      <form method="POST" id="form">
        <section class="card card-fluid">
          <div class="card-header">
            <div class="d-inline-block w-100">
              <Button label="Tạo mới" icon="pi pi-plus" class="p-button-success p-button-sm mr-2"
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

import Button from 'primevue/button';
import ObjectApi from "../../api/ObjectApi";
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
const toast = useToast();
const data = ref({});
const router = useRouter();
onMounted(() => {
});
const submit = () => {
  if (!vaild()) {
    alert("Điền đây đủ thông tin (*)!")
    return;
  }
  ObjectApi.Save(data.value).then((res) => {
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Thành công",
        life: 3000,
      });
      router.push("/Object");
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
