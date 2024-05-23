<template>
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <b>Mã:<i class="text-danger">*</i></b>
                <div class="pt-1">
                    <input type="text" class="form-control" v-model="model.code" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <b>Tên tiếng việt:<i class="text-danger">*</i></b>
                <div class="pt-1">
                    <input type="text" class="form-control" v-model="model.name" />
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <b>Tên tiếng anh:</b>
                <div class="pt-1">
                    <input type="text" class="form-control" v-model="model.name_en" />
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
                <b>Tuần suất:<i class="text-danger">*</i></b>
                <div class="pt-1">
                    <select class="form-control form-control-sm" v-model="model.frequency_id">
                        <option value="1">Hàng ngày</option>
                        <option value="2">2 tuần/lần</option>
                        <option value="3">Hàng tháng</option>
                        <option value="4">3 tháng/lần</option>
                        <option value="5">6 tháng/lần</option>
                    </select>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <b>Đối tượng:<i class="text-danger">*</i></b>
                <div class="pt-1">
                    <select class="form-control form-control-sm" v-model="model.object_id" @change="changeObject">
                        <option v-for="(item, index) in objects" :value="item.id" :key="item.id">{{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="col-md-4" v-if="!is_multi_target">
            <div class="form-group">
                <b>Phương pháp lấy mẫu:<i class="text-danger">*</i></b>
                <div class="pt-1">
                    <select class="form-control form-control-sm" v-model="model.target_id">
                        <option v-for="(item, index) in targets" :value="item.id" :key="item.id">{{ item.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="form-group">
                <b>Color:</b>
                <div class="pt-1">
                    <input type="color" class="form-control" v-model="model.color" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { storeToRefs } from 'pinia';
import { usePoint } from '../../stores/Point';
import { useGeneral } from '../../stores/general';
import Api from "../../api/Api";
import LocationTreeSelect from "../TreeSelect/LocationTreeSelect.vue";
const store_Point = usePoint();
const store_general = useGeneral();
const { model } = storeToRefs(store_Point);
const { objects, targets } = storeToRefs(store_general);
const object = computed(() => {
    Api.targetsOfObject(model.value.object_id).then((res) => {
        targets.value = res;
    })
    return objects.value.find((item) => {
        return item.id == model.value.object_id;
    })
});
const is_multi_target = computed(() => {
    return object.value ? object.value.is_multi_target : true;
})
const changeObject = () => {

}
onMounted(() => {
    Api.objects().then((res) => {
        objects.value = res;
    });
    // changeObject();
    // Api.targets().then((res) => {
    //     targets.value = res;
    // })
})
</script>