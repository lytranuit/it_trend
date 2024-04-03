<template>

    <Dialog v-model:visible="visibleDialog" :header="headerForm" :modal="true" :style="{ width: '50vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '95vw' }">
        <Form></Form>
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
import ResultApi from '../../api/ResultApi';
import Dialog from "primevue/dialog";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { useResult } from '../../stores/Result';
import Form from "./Form.vue";

const toast = useToast();
const store_Result = useResult();
const { visibleDialog, headerForm, model } = storeToRefs(store_Result);
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
    delete model.value.obj;
    delete model.value.target;
    delete model.value.location;
    ResultApi.Save(model.value).then((res) => {
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
    if (!model.value.point_id) return false;
    if (!model.value.location_id) return false;
    if (!model.value.target_id) return false;
    if (!model.value.object_id) return false;
    if (!model.value.date) return false;
    if (!model.value.value) return false;
    return true;
};
</script>