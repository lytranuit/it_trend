<template>
  <div class="left-sidenav">
    <ul class="metismenu left-sidenav-menu">
      <li>
        <router-link class="nav-link" to="/">
          <i class="fas fa-chart-bar"></i>
          <span>Biểu đồ</span>
        </router-link>
      </li>
      <li>
        <router-link class="nav-link" to="/result">
          <i class="fas fa-database"></i>
          <span>Dữ liệu</span>
        </router-link>
      </li>

      <li>
        <router-link class="nav-link" to="/report">
          <i class="fas fa-file"></i>
          <span>Báo cáo</span>
        </router-link>
      </li>
      <li v-if="is_admin">
        <router-link class="nav-link" to="/history">
          <i class="fas fa-history"></i>
          <span>Audit trails</span>
        </router-link>
      </li>
      <li v-if="is_admin">
        <a href="javascript: void(0);">
          <i class="ti-briefcase"></i>
          <span>{{ $t("system") }}</span>
          <span class="menu-arrow"><i class="mdi mdi-chevron-right"></i></span>
        </a>

        <ul class="nav-second-level" aria-expanded="false">
          <li class="nav-item">
            <router-link class="nav-link" to="/user"
              ><i class="ti-control-record"></i>{{ $t("user") }}</router-link
            >
          </li>
        </ul>
      </li>

      <li v-if="is_admin">
        <a href="javascript: void(0);">
          <i class="fas fa-filter"></i>
          <span>Trường dữ liệu</span>
          <span class="menu-arrow"><i class="mdi mdi-chevron-right"></i></span>
        </a>

        <ul class="nav-second-level" aria-expanded="false">
          <li class="nav-item">
            <router-link class="nav-link" to="/object"
              ><i class="ti-control-record"></i>Đối tượng</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/target"
              ><i class="ti-control-record"></i>Chỉ tiêu/PP lấy mẫu</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/location"
              ><i class="ti-control-record"></i>Vị trí</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/point"
              ><i class="ti-control-record"></i>Điểm lấy mẫu</router-link
            >
          </li>
          <li>
            <router-link class="nav-link" to="/limit">
              <i class="ti-control-record"></i>
              <span>Giới hạn,Cảnh báo</span>
            </router-link>
          </li>
        </ul>
      </li>
    </ul>

    <!-- <div class="button-col">

      <span class="btn-text">Thu gọn</span>
    </div> -->
  </div>
</template>
<script setup>
import { useAuth } from "../../stores/auth";
import { onMounted, ref } from "vue";
import { useLayout } from "../composables/layout";
import { storeToRefs } from "pinia";

const { initMetisMenu, initActiveMenu } = useLayout();
const store = useAuth();
const { is_admin } = storeToRefs(store);
onMounted(() => {
  initMetisMenu();
  initActiveMenu();
});
</script>
