<template>
  <tr @dblclick="getEmployeeInfo(employee.EmployeeId)">
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
export default {
  props: ["employee"],
  computed: {
    formatDDMMYYY() {
      const newDate = new Date(this.employee.DateOfBirth);
      const getDate = newDate.getDate();
      const getMonth = newDate.getMonth() + 1;
      const getYear = newDate.getFullYear();
      return `${getDate}/${getMonth}/${getYear}`;
    },
  },
  methods: {
    getEmployeeInfo(employeeId) {
      this.$store.dispatch("getEmployeeInfo", employeeId);
    },
  },
};
</script>

<style scoped></style>
