<template>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group row">

                <div class="col-md-4">
                    <div class="form-group">
                        <b>Đối tượng:<i class="text-danger">*</i></b>
                        <div class="pt-1">
                            <select class="form-control form-control-sm" v-model="model.object_id">
                                <option v-for="(item, index) in objects" :value="item.id" :key="item.id">{{ item.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <b>Vị trí:<i class="text-danger">*</i></b>
                        <div class="pt-1">
                            <LocationTreeSelect v-model="model.location_id"></LocationTreeSelect>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="form-group">
                        <b>Chỉ tiêu:</b>
                        <div class="pt-1">
                            <select class="form-control form-control-sm" v-model="model.target_id">
                                <option v-for="(item, index) in targets" :value="item.id" :key="item.id">{{ item.name }}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-group row">

                <div class="col-md-3">
                    <div class="form-group">
                        <b>Ngày hiệu lực:<i class="text-danger">*</i></b>
                        <div class="pt-1">
                            <Calendar v-model="model.date_effect" dateFormat="yy-mm-dd" class="date-custom"
                                :manualInput="false" showIcon />
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <b>Tiêu chuẩn chấp nhận:</b>
                        <div class="pt-1">
                            <input class="form-control form-control-sm" v-model="model.standard_limit" type="number">
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <b>Giới hạn cảnh báo:</b>
                        <div class="pt-1">
                            <input class="form-control form-control-sm" v-model="model.alert_limit" type="number">
                        </div>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="form-group">
                        <b>Giới hạn hành động:</b>
                        <div class="pt-1">
                            <input class="form-control form-control-sm" v-model="model.action_limit" type="number">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { storeToRefs } from 'pinia';
import { useLimit } from '../../stores/Limit';
import { useGeneral } from '../../stores/general';
import Api from "../../api/Api";
import LocationTreeSelect from "../TreeSelect/LocationTreeSelect.vue";
const store_Limit = useLimit();
const store_general = useGeneral();
const { model } = storeToRefs(store_Limit);
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