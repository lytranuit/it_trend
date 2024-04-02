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
import { useRoute } from "vue-router";
import Button from "primevue/button";
import ResultApi from "../../../api/ResultApi";
import { useToast } from "primevue/usetoast";
import Form from "../../../components/Result/Form.vue";
import { useResult } from "../../../stores/Result";
const store_Result = useResult();
const { model } = storeToRefs(store_Result);
const toast = useToast();
const route = useRoute();
onMounted(() => {
  ResultApi.get(route.params.id).then((res) => {
    model.value = res;
  });
});

const submit = () => {
  if (!vaild()) {
    alert("Điền đây đủ thông tin (*)!")
    return;
  }
  ResultApi.Save(model.value).then((res) => {
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
  if (!model.value.name) return false;
  return true;
}
</script>
