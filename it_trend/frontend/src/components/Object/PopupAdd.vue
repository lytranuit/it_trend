<template>

    <Dialog v-model:visible="visibleDialog" :header="headerForm" :modal="true" class="p-fluid">
        <div class="row mb-2">
            <div class="field col">
                <label for="name">Tên<span class="text-danger">*</span></label>
                <InputText id="name" class="p-inputtext-sm" v-model.trim="model.name" required="true"
                    :class="{ 'p-invalid': submitted && !model.name }" />
                <small class="p-error" v-if="submitted && !model.name">Required.</small>
            </div>
            <div class="field col">
                <label for="name">Tên tiếng anh <span class="text-danger">*</span></label>
                <InputText id="name" class="p-inputtext-sm" v-model.trim="model.name_en" required="true"
                    :class="{ 'p-invalid': submitted && !model.name_en }" />
                <small class="p-error" v-if="submitted && !model.name_en">Required.</small>
            </div>
        </div>
        <template #footer>
            <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"></Button>
            <Button label="Save" icon="pi pi-check" class="p-button-text" @click="save"></Button>
        </template>
    </Dialog>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { useToast } from "primevue/usetoast";
import { storeToRefs } from 'pinia';
import ObjectApi from '../../api/ObjectApi';
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useObject } from '../../stores/Object';

const toast = useToast();
const store_Object = useObject();
const { visibleDialog, headerForm, model } = storeToRefs(store_Object);
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
    ObjectApi.Save(model.value).then((res) => {
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
    if (!model.value.name_en.trim()) return false;
    return true;
};
</script>