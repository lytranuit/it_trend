<template>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Điểm lấy mẫu:<i class="text-danger">*</i></b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <LocationWithPointTreeSelect v-model="model.point_id"></LocationWithPointTreeSelect>
                </div>
            </div>
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Đối tượng:<i class="text-danger">*</i></b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <select class="form-control form-control-sm" v-model="model.object_id" :disabled="true">
                        <option v-for="(item, index) in objects" :value="item.id" :key="item.id">{{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group row">
                <b class="col-12 col-sm-3 col-form-label text-sm-right">Chỉ tiêu:<i class="text-danger">*</i></b>
                <div class="col-12 col-sm-8 col-lg-6 pt-1">
                    <select class="form-control form-control-sm" v-model="model.target_id" :disabled="true">
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
const { objects, targets } = storeToRefs(store_general);
onMounted(() => {
    Api.objects().then((res) => {
        objects.value = res;
    })
    Api.targets().then((res) => {
        targets.value = res;
    })
});
</script>