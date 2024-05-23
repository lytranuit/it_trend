<template>
  <div class="row clearfix">
    <div class="col-12">
      <h5 class="card-header drag-handle">
        <RouterLink to="Limit/add">
          <Button label="Tạo mới" icon="pi pi-plus" class="p-button-success p-button-sm mr-2"></Button>
        </RouterLink>
      </h5>
      <section class="card card-fluid">
        <div class="card-body" style="overflow: auto; position: relative">
          <DataTable class="p-datatable-customers" showGridlines :value="datatable" :lazy="true" ref="dt"
            v-model:selection="selectedProducts" :paginator="true" :rowsPerPageOptions="[10, 50, 100]" :rows="rows"
            :totalRecords="totalRecords" @page="onPage($event)" :rowHover="true" :loading="loading"
            responsiveLayout="scroll" :resizableColumns="true" columnResizeMode="expand" v-model:filters="filters"
            filterDisplay="menu">
            <template #header>
              <div style="width: 200px">
                <TreeSelect :options="columns" v-model="showing" multiple :limit="0"
                  :limitText="(count) => 'Hiển thị: ' + count + ' cột'">
                </TreeSelect>
              </div>
            </template>

            <template #empty> Không có dữ liệu. </template>
            <Column v-for="col of selectedColumns" :field="col.data" :header="col.label" :key="col.data"
              :showFilterMatchModes="false">
              <template #body="slotProps">
                <template v-if="col.data == 'id'">
                  <RouterLink :to="'/Limit/edit/' + slotProps.data[col.data]">
                    <i class="fas fa-pencil-alt mr-2"></i>
                    {{ slotProps.data[col.data] }}
                  </RouterLink>
                </template>
                <template v-else-if="col.data == 'date_effect'">
                  {{ formatDate(slotProps.data[col.data]) }}
                </template>
                <template v-else-if="col.data == 'object_id'">
                  <p>{{ slotProps.data.obj?.name }}</p>
                  <p><i>{{ slotProps.data.obj?.name_en }}</i></p>
                </template>
                <template v-else-if="col.data == 'target_id'">
                  <p>{{ slotProps.data.target?.name }}</p>
                  <p><i>{{ slotProps.data.target?.name_en }}</i></p>
                </template>
                <div v-else v-html="slotProps.data[col.data]" style="white-space: break-spaces;
    word-wrap: break-word;"></div>
              </template>
              <template #filter="{ filterModel, filterCallback }" v-if="col.filter == true">
                <template v-if="col.data == 'object_id'">
                  <select class="form-control form-control-sm" v-model="filterModel.value">
                    <option v-for="(item, index) in objects" :value="item.id" :key="item.id">{{ item.name }}
                    </option>
                  </select>
                </template>
                <template v-else-if="col.data == 'target_id'">
                  <select class="form-control form-control-sm" v-model="filterModel.value">
                    <option v-for="(item, index) in targets" :value="item.id" :key="item.id">{{ item.name }}
                    </option>
                  </select>
                </template>
                <InputText type="text" v-model="filterModel.value" @keydown.enter="filterCallback()"
                  class="p-column-filter" v-else />
              </template>
            </Column>
            <Column style="width: 1rem">
              <template #body="slotProps">
                <a class="p-link text-info font-16 mr-2" @click="copy(slotProps.data['id'])"><i
                    class="pi pi-copy"></i></a>
                <a class="p-link text-danger font-16" @click="confirmDelete(slotProps.data['id'])"><i
                    class="pi pi-trash"></i></a>
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
import LimitApi from "../../api/LimitApi";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import { FilterMatchMode } from "primevue/api";
import Column from "primevue/column"; ////Datatable
import InputText from "primevue/inputtext";
import { useConfirm } from "primevue/useconfirm";
import Loading from "../../components/Loading.vue";
import { useLimit } from "../../stores/Limit";
import { storeToRefs } from "pinia";
import { formatDate } from "../../utilities/util";
import { useRouter } from "vue-router";
import Api from "../../api/Api";
///Form
const store_Limit = useLimit();
const { model, headerForm, visibleDialog } = storeToRefs(store_Limit);
const router = useRouter();
const confirm = useConfirm();
const datatable = ref();
const objects = ref([]);
const targets = ref([]);
const columns = ref([
  {
    id: 0,
    label: "ID",
    data: "id",
    className: "text-center",
    filter: true,
  }, {
    id: 1,
    label: "Tên",
    data: "name",
    className: "text-center",
    filter: true,
  },
  {
    id: 2,
    label: "Ngày hiệu lực",
    data: "date_effect",
    className: "text-center",
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
    label: "Chỉ tiêu",
    data: "target_id",
    className: "text-center",
    filter: true,
  },
  {
    id: 5,
    label: "Giới hạn cảnh báo",
    data: "alert_limit",
    className: "text-center",
  },
  {
    id: 6,
    label: "Giới hạn hành động",
    data: "action_limit",
    className: "text-center",
  },
  {
    id: 7,
    label: "Tiêu chuẩn chấp nhận",
    data: "standard_limit",
    className: "text-center",
  },
]);
const filters = ref({
  id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  name: { value: null, matchMode: FilterMatchMode.CONTAINS },
  object_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
  target_id: { value: null, matchMode: FilterMatchMode.CONTAINS },
});
const totalRecords = ref(0);
const loading = ref(true);
const showing = ref([]);
const column_cache = "columns_Limit"; ////
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
  LimitApi.table(lazyParams.value).then((res) => {
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
      LimitApi.delete(id).then((res) => {
        loadLazyData();
      });
    },
  });
};
const copy = (id) => {
  window.open("/limit/edit/" + id + "?copy=true", "_blank");
}
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
