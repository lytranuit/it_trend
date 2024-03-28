<template>
    <div class="row">
        <div class="col-md-12">
            <div class="form-group row">
                <b class="col-12 col-lg-2 col-form-label">Tên tiếng việt:<i class="text-danger">*</i></b>
                <div class="col-12 col-lg-4 pt-1">
                    <input type="text" class="form-control" v-model="model.name" />
                </div>
                <b class="col-12 col-lg-2 col-form-label">Tên tiếng anh:</b>
                <div class="col-12 col-lg-4 pt-1">
                    <input type="text" class="form-control" v-model="model.name_en" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";
import { storeToRefs } from 'pinia';
import { usePoint } from '../../stores/Point';
const store_Point = usePoint();
const { model } = storeToRefs(store_Point);
</script>