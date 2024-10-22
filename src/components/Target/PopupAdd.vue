<template>
  <Dialog
    v-model:visible="visibleDialog"
    :header="headerForm"
    :modal="true"
    class="p-fluid"
  >
    <div class="row mb-2">
      <div class="field col">
        <label for="name">Tên<span class="text-danger">*</span></label>
        <input-text
          id="name"
          class="p-inputtext-sm"
          v-model.trim="model.name"
          required="true"
          :class="{ 'p-invalid': submitted && !model.name }"
        />
        <small class="p-error" v-if="submitted && !model.name">Required.</small>
      </div>
      <div class="field col">
        <label for="name">Tên tiếng anh</label>
        <InputText
          id="name"
          class="p-inputtext-sm"
          v-model.trim="model.name_en"
        />
      </div>
    </div>
    <div class="row mb-2">
      <div class="field col">
        <label for="name">Đơn vị</label>
        <InputText id="name" class="p-inputtext-sm" v-model.trim="model.unit" />
      </div>
      <div class="field col">
        <label for="name"
          >Kiểu dữ liệu <span class="text-danger">*</span></label
        >
        <select class="form-control form-control-sm" v-model="model.value_type">
          <option value="float">Numberic</option>
          <option value="varchar">Characters</option>
          <option value="boolean">True/False</option>
        </select>
        <small class="p-error" v-if="submitted && !model.value_type"
          >Required.</small
        >
      </div>
    </div>

    <div class="row mb-2" v-if="model.value_type == 'boolean'">
      <div class="field col">
        <label for="name">Text True</label>
        <InputText
          id="name"
          class="p-inputtext-sm"
          v-model.trim="model.text_yes"
          placeholder="Tiếng việt"
        />
        <InputText
          id="name"
          class="p-inputtext-sm mt-2"
          v-model.trim="model.text_yes_en"
          placeholder="Tiếng anh"
        />
      </div>
      <div class="field col">
        <label for="name">Text False</label>
        <InputText
          id="name"
          class="p-inputtext-sm"
          v-model.trim="model.text_no"
          placeholder="Tiếng việt"
        />
        <InputText
          id="name"
          class="p-inputtext-sm mt-2"
          v-model.trim="model.text_no_en"
          placeholder="Tiếng anh"
        />
      </div>
    </div>

    <div class="row mb-2">
      <div class="field col">
        <label for="name">Loại</label>
        <select class="form-control form-control-sm" v-model="model.type">
          <option value="visinh">Vi sinh</option>
          <option value="hoaly">Hóa lý</option>
          <option value="codien">Cơ điện</option>
        </select>
      </div>
    </div>
    <template #footer>
      <Button
        label="Cancel"
        icon="pi pi-times"
        class="p-button-text"
        @click="hideDialog"
      ></Button>
      <Button
        label="Save"
        icon="pi pi-check"
        class="p-button-text"
        @click="save"
      ></Button>
    </template>
  </Dialog>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from "pinia";
import TargetApi from "../../api/TargetApi";
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useTarget } from "../../stores/Target";

const toast = useToast();
const store_Target = useTarget();
const { visibleDialog, headerForm, model } = storeToRefs(store_Target);
const submitted = ref(false);
const hideDialog = () => {
  visibleDialog.value = false;
  submitted.value = false;
};

const emit = defineEmits(["save"]);
const save = () => {
  submitted.value = true;
  if (!valid()) return;
  // waiting.value = true;
  TargetApi.Save(model.value).then((res) => {
    // waiting.value = false;
    visibleDialog.value = false;
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Thành công",
        detail: "Tạo mới thành công",
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
    emit("save", res);
    // loadLazyData();
  });
};

///Form
const valid = () => {
  if (!model.value.name.trim()) return false;
  if (!model.value.value_type.trim()) return false;
  return true;
};
</script>