<template>
  <div class="row">
    <div class="col-12">
      <div class="card mb-3">
        <div class="card-header">
          <h5 class="mb-0">BIỂU ĐỒ XU HƯỚNG</h5>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-12">
              <ChartReport :data="data" :id="'chart'"></ChartReport>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Loading :waiting="waiting"></Loading>
</template>
<script setup>
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import ChartReport from "../../../components/ChartReport.vue";
import ReportApi from "../../../api/reportApi";
import Loading from "../../../components/Loading.vue";
const route = useRoute();
const data = ref({ chart: {} });
const waiting = ref();
onMounted(() => {
  waiting.value = true;
  ReportApi.getChartData(route.params.id).then((res) => {
    waiting.value = false;
    data.value = res;
  });
});
</script>
