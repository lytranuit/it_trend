<template>

    <Dialog v-model:visible="visibleDialog" :header="headerForm" :modal="true" :style="{ width: '50vw' }"
        :breakpoints="{ '1199px': '75vw', '575px': '95vw' }">
        <Form></Form>
        <template #footer>
            <div class="text-center">
                <Button label="Thoát" icon="pi pi-times" size="small" @click="hideDialog"></Button>
                <Button label="Lưu lại" icon="pi pi-check" severity="success" size="small" @click="save"></Button>
            </div>

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
import { useConfirm } from "primevue/useconfirm";

const confirm = useConfirm();
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
    console.log(model.value);
    if (!valid()) {
        alert("Chưa điền đầy đủ thông tin!");
        return;
    }
    console.log(model.value);
    // waiting.value = true;
    delete model.value.obj;
    delete model.value.target;
    delete model.value.location;
    if (typeof model.value.value == "boolean") {
        model.value.value = model.value.value ? 1 : 0;
    }
    ResultApi.Save(model.value).then((res) => {
        // waiting.value = false;
        // visibleDialog.value = false;
        if (res.success) {
            toast.add({
                severity: "success",
                summary: "Thành công",
                detail: "Tạo mới thành công",
                life: 3000,
            });
            if (model.value.id > 0) {
                visibleDialog.value = false;
            }
        } else if (res.is_duplicate) {
            confirm.require({
                message: "Dữ liệu này bị trùng. Bạn có muốn cập nhật dòng dữ liệu này?",
                header: "Xác nhận",
                icon: "pi pi-exclamation-triangle",
                accept: () => {
                    model.value.is_replace = true;
                    ResultApi.Save(model.value).then((res) => {
                        model.value.is_replace = null;
                        emit("save", res);
                    });
                },
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
    // if (!model.value.location_id) return false;
    if (!model.value.target_id) return false;
    if (!model.value.object_id) return false;
    if (!model.value.date) return false;
    if (model.value.value == null) return false;
    return true;
};
</script>