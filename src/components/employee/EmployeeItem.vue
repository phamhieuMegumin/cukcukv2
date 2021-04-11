<template>
  <tr
    @dblclick="getEmployeeInfo(employee.EmployeeId)"
    @click="getEmployeeId(employee.EmployeeId, employee.EmployeeCode)"
    :class="
      deleteEmployee && deleteEmployee.employeeId == employee.EmployeeId
        ? 'active'
        : ''
    "
  >
    <td>{{ employee.EmployeeCode }}</td>
    <td>{{ employee.FullName }}</td>
    <td>{{ employee.GenderName }}</td>
    <td>{{ formatDDMMYYY }}</td>
    <td>{{ employee.PhoneNumber }}</td>
    <td>{{ employee.Email }}</td>
    <td>{{ employee.PositionName }}</td>
    <td>{{ employee.DepartmentName }}</td>
    <td>{{ employee.Salary }}</td>
    <td>{{ employee.WorkStatusName }}</td>
  </tr>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: ["employee"],
  computed: {
    ...mapState(["deleteEmployee"]),
    formatDDMMYYY() {
      const newDate = new Date(this.employee.DateOfBirth);
      const getDate = newDate.getDate();
      const getMonth = newDate.getMonth() + 1;
      const getYear = newDate.getFullYear();
      return `${getDate}/${getMonth}/${getYear}`;
    },
  },
  methods: {
    ...mapMutations(["UPDATE_MODE"]),
    getEmployeeInfo(employeeId) {
      this.$store.dispatch("getEmployeeInfo", employeeId);
      this.UPDATE_MODE();
    },
    getEmployeeId(employeeId, employeeCode) {
      this.$store.commit("DELETE_EMPLOYEE_ID", { employeeId, employeeCode });
    },
  },
};
</script>

<style scoped></style>
