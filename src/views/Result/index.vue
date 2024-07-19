<template>
  <div class="row clearfix">
    <div class="col-12">
      <h5 class="card-header drag-handle">
        <Button
          label="Tạo mới"
          icon="pi pi-plus"
          class="p-button-success p-button-sm mr-2"
          @click="openNew"
        ></Button>
        <PopupAdd @save="loadLazyData"></PopupAdd>
      </h5>
      <section class="card card-fluid">
        <div class="card-body" style="overflow: auto; position: relative">
          <DataTable
            class="p-datatable-customers"
            showGridlines
            :value="datatable"
            :lazy="true"
            ref="dt"
            v-model:selection="selectedProducts"
            :paginator="true"
            :rowsPerPageOptions="[10, 50, 100]"
            :rows="rows"
            :totalRecords="totalRecords"
            @page="onPage($event)"
            :rowHover="true"
            :loading="loading"
            responsiveLayout="scroll"
            :resizableColumns="true"
            columnResizeMode="expand"
            v-model:filters="filters"
            filterDisplay="menu"
          >
            <template #header>
              <div class="d-md-flex">
                <div style="width: 200px">
                  <TreeSelect
                    :options="columns"
                    v-model="showing"
                    multiple
                    :limit="0"
                    :limitText="(count) => 'Hiển thị: ' + count + ' cột'"
                  >
                  </TreeSelect>
                </div>
                <div class="ml-auto"></div>
              </div>
            </template>

            <template #empty> Không có dữ liệu. </template>
            <Column
              v-for="col of selectedColumns"
              :field="col.data"
              :header="col.label"
              :key="col.data"
              :showFilterMatchModes="false"
            >
              <template #body="slotProps">
                <template v-if="col.data == 'id'">
                  <a class="" @click="edit(slotProps.data)" href="#">
                    <i class="fas fa-pencil-alt mr-2"></i>
                    {{ slotProps.data[col.data] }}</a
                  >
                </template>
                <template v-else-if="col.data == 'point_id'">
                  <p>
                    {{ slotProps.data.point?.code }}
                    {{ slotProps.data.point?.name }}
                  </p>
                  <p>
                    <i
                      >{{ slotProps.data.point?.code }}
                      {{ slotProps.data.point?.name_en }}</i
                    >
                  </p>
                </template>
                <template v-else-if="col.data == 'object_id'">
                  <p>{{ slotProps.data.point?.obj?.name }}</p>
                  <p>
                    <i>{{ slotProps.data.point?.obj?.name_en }}</i>
                  </p>
                </template>
                <template v-else-if="col.data == 'target_id'">
                  <p>{{ slotProps.data.target?.name }}</p>
                  <p>
                    <i>{{ slotProps.data.target?.name_en }}</i>
                  </p>
                </template>
                <template v-else-if="col.data == 'date'">
                  {{ formatDate(slotProps.data[col.data]) }}
                </template>
                <template v-else-if="col.data == 'value'">
                  <template
                    v-if="slotProps.data.target?.value_type == 'boolean'"
                  >
                    <template v-if="slotProps.data.value == 1">
                      {{ slotProps.data.target?.text_yes }}</template
                    >
                    <template v-else>
                      {{ slotProps.data.target?.text_no }}</template
                    >
                  </template>
                  <template v-else-if="slotProps.data.target?.id == 11">
                    {{ formatPrice(slotProps.data[col.data], 1) }}</template
                  >
                  <template v-else>
                    {{ formatPrice(slotProps.data[col.data]) }}</template
                  >
                </template>
                <div v-else v-html="slotProps.data[col.data]"></div>
              </template>
              <template
                #filter="{ filterModel, filterCallback }"
                v-if="col.filter == true"
              >
                <template v-if="col.data == 'object_id'">
                  <select
                    class="form-control form-control-sm"
                    v-model="filterModel.value"
                  >
                    <option
                      v-for="item in objects"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </template>
                <template v-else-if="col.data == 'target_id'">
                  <select
                    class="form-control form-control-sm"
                    v-model="filterModel.value"
                  >
                    <option
                      v-for="item in targets"
                      :value="item.id"
                      :key="item.id"
                    >
                      {{ item.name }}
                    </option>
                  </select>
                </template>
                <template v-else-if="col.data == 'date'">
                  <InputText
                    type="date"
                    v-model="filterModel.value"
                    @keydown.enter="filterCallback()"
                    class="p-column-filter"
                  />
                </template>
                <InputText
                  type="text"
                  v-model="filterModel.value"
                  @keydown.enter="filterCallback()"
                  class="p-column-filter"
                  v-else
                />
              </template>
            </Column>
            <Column style="width: 1rem">
              <template #body="slotProps">
                <a
                  class="p-link text-danger font-16"
                  @click="confirmDelete(slotProps.data['id'])"
                  ><i class="pi pi-trash"></i
                ></a>
              </template>
            </Column>
          </DataTable>
        </div>
      </section>
    </div>
    <Loading :waiting="waiting"></Loading>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import ResultApi from "../../api/ResultApi";
import PopupAdd from "../../components/Result/PopupAdd.vue";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import { FilterMatchMode } from "primevue/api";
import Column from "primevue/column"; ////Datatable
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import Loading from "../../components/Loading.vue";
import { formatDate, formatPrice } from "../../utilities/util";
import { useResult } from "../../stores/Result";
import { storeToRefs } from "pinia";
import Api from "../../api/Api";

///Form
const objects = ref([]);
const targets = ref([]);
const store_Result = useResult();
const { model, headerForm, visibleDialog } = storeToRefs(store_Result);

const openNew = () => {
  model.value = {};
  headerForm.value = "Tạo mới";
  visibleDialog.value = true;
};

const edit = (m) => {
  headerForm.value = m.id;
  model.value = { ...m };
  visibleDialog.value = true;
};

const confirm = useConfirm();
const datatable = ref();
const columns = ref([
  {
    id: 0,
    label: "ID",
    data: "id",
    className: "text-center",
    filter: true,
  },
  {
    id: 1,
    label: "Ngày lấy mẫu",
    data: "date",
    className: "text-center",
    filter: true,
  },
  {
    id: 2,
    label: "Điểm lấy mẫu",
    data: "point_id",
    className: "text-center",
    filter: true,
  },
  {
    id: 3,
    label: "Đối tượng",
    data: "object_id",
    className: "text-center",
    filter: true,
  },
  {
    id: 4,
    label: "Chỉ tiêu/Phương pháp",
    data: "target_id",
    className: "text-center",
    filter: true,
  },
  {
    id: 5,
    label: "Giá trị",
    data: "value",
    className: "text-center",
    // filter: true,
  },
]);
const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  point_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  object_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  target_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  date: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const totalRecords = ref(0);
const loading = ref(true);
const showing = ref([]);
const column_cache = "columns_Result"; ////
const first = ref(0);
const rows = ref(10);
const draw = ref(0);
const selectedProducts = ref();
const selectedColumns = computed(() => {
  return columns.value.filter((col) => showing.value.includes(col.id));
});
const lazyParams = computed(() => {
  let data_filters = {};
  for (let key in filters.value) {
    data_filters[key] = filters.value[key].value;
  }
  return {
    draw: draw.value,
    start: first.value,
    length: rows.value,
    filters: data_filters,
  };
});
const dt = ref(null);

////Data table
const loadLazyData = () => {
  loading.value = true;
  ResultApi.table(lazyParams.value).then((res) => {
    // console.log(res);
    datatable.value = res.data;
    totalRecords.value = res.recordsFiltered;
    loading.value = false;
  });
};
const onPage = (event) => {
  first.value = event.first;
  rows.value = event.rows;
  draw.value = draw.value + 1;
  loadLazyData();
};

const confirmDelete = (id) => {
  confirm.require({
    message: "Bạn có muốn xóa row này?",
    header: "Xác nhận",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      ResultApi.delete(id).then((res) => {
        loadLazyData();
      });
    },
  });
};
onMounted(() => {
  let cache = localStorage.getItem(column_cache);
  if (!cache) {
    showing.value = columns.value.map((item) => {
      return item.id;
    });
  } else {
    showing.value = JSON.parse(cache);
  }
  loadLazyData();

  Api.objects().then((res) => {
    objects.value = res;
  });
  Api.targets().then((res) => {
    targets.value = res;
  });
});
const waiting = ref();
watch(filters, async (newa, old) => {
  first.value = 0;
  loadLazyData();
});
</script>
