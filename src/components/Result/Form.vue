<template>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Điểm lấy mẫu:<i class="text-danger">*</i></b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <LocationWithPointTreeSelect v-model="model.point_id" @update:modelValue="changePoint">
                    </LocationWithPointTreeSelect>
                </div>
            </div>
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Đối tượng:<i class="text-danger">*</i></b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <select class="form-control form-control-sm" v-model="model.object_id" :disabled="true"
                        @change="changeObject">
                        <option v-for="(item, index) in objects" :value="item.id" :key="item.id">{{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Chỉ tiêu:<i class="text-danger">*</i></b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <select class="form-control form-control-sm" v-model="model.target_id" :disabled="disabled_target">
                        <option v-for="(item, index) in targets" :value="item.id" :key="item.id">{{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Ngày lấy mẫu:<i class="text-danger">*</i></b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <Calendar v-model="model.date" dateFormat="yy-mm-dd" class="date-custom" :manualInput="false"
                        showIcon />
                </div>
            </div>
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Giá trị:<i class="text-danger">*</i></b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <input v-model="model.value" class="form-control form-control-sm" type="number" />
                </div>
            </div>
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Ghi chú:</b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <textarea class="form-control form-control-sm" v-model="model.note"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useResult } from '../../stores/Result';
import { useGeneral } from "../../stores/general";
import Api from "../../api/Api";
import LocationWithPointTreeSelect from '../../components/TreeSelect/LocationWithPointTreeSelect.vue'
const store_Result = useResult();
const store_general = useGeneral();
const { model } = storeToRefs(store_Result);
const { objects, targets, points } = storeToRefs(store_general);

const object = computed(() => {
    return objects.value.find((item) => item.id == model.value.object_id) || {};
});
const disabled_target = computed(() => {
    return !object.value.is_multi_target;
});
const changePoint = (point_id) => {
    var point = points.value.find((item) => item.id == point_id);
    model.value.object_id = point.object_id;
    model.value.target_id = point.target_id;
    model.value.location_id = point.location_id;
    // changeObject();
}
// const changeObject = () => {
//     // console.log(disabled_target.value);
//     Api.targetsOfObject(model.value.object_id).then((res) => {
//         targets.value = res;
//     })
// }
watch(object, () => {
    Api.targetsOfObject(model.value.object_id).then((res) => {
        targets.value = res;
    });
}, { immediate: true })
onMounted(() => {
    Api.objects().then((res) => {
        objects.value = res;
    })
    // Api.targets().then((res) => {
    //     targets.value = res;
    // })
    Api.points().then((res) => {
        points.value = res;
    })
});
</script>