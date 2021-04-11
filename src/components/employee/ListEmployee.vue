<template>
  <div class="list__customer">
    <div class="table__container">
      <div v-if="addModal"><Modal :employeeModal="true" /></div>

      <div v-else><Modal :deleteModal="true" /></div>
      <table class="table">
        <thead>
          <tr>
            <th>Mã nhân viên</th>
            <th>Họ và tên</th>
            <th>Giới tính</th>
            <th>Ngày sinh</th>
            <th>Điện thoại</th>
            <th>Email</th>
            <th>Chức vụ</th>
            <th>Phòng ban</th>
            <th>Mức lương cơ bản</th>
            <th>Tình trạng công việc</th>
          </tr>
        </thead>
        <tbody>
          <Loading v-if="isLoading" />
          <EmployeeItem
            v-for="(item, index) in listEmployee"
            :key="index"
            :employee="item"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Loading from "../entity/Loading.vue";
import EmployeeItem from "./EmployeeItem.vue";
import Modal from "../entity/Modal";
export default {
  components: {
    EmployeeItem,
    Loading,
    Modal,
  },
  created() {
    this.getEmployeeData();
  },
  computed: {
    ...mapState(["listEmployee", "isLoading", "addModal"]),
  },
  methods: {
    ...mapActions(["getEmployeeData"]),
  },
};
</script>

<style>
/* Table */
.list__customer {
  position: relative;
}
.table__container {
  position: absolute;
  top: 16px;
  bottom: 60px;
  height: 430px;
  overflow-y: auto;
}
.table {
  position: relative;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}

.table tr {
  height: 48px;
  transition: all linear 0.2s;
}
.table thead th {
  position: sticky;
  top: 0;
  background-color: #fff;
  box-shadow: 0 1px 1px -1px #bbb;
}

.table th,
.table td {
  padding-left: 5px;
  padding-right: 5px;
  border-bottom: 1px solid #dbdeff;
}
.table tr:hover {
  background-color: #dbdeff;
  cursor: pointer;
}
.table th:first-child,
.table td:first-child {
  padding-left: 16px;
}

.table th:last-child,
.table td:last-child {
  padding-right: 16px;
}
.table tr.active {
  background: #019160;
  color: #fff;
}
</style>
