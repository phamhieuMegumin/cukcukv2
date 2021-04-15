import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import queryString from "query-string";
Vue.use(Vuex);

const storeData = {
  state: {
    listEmployee: [], // all employee
    isLoading: false, // loading
    showModal: false, // show(hidden) modal
    newCode: null, // get new employeeCode
    employeeInfo: null, // get info a employee
    showComboboxOption: false,
    // get data department, position
    department: null,
    position: null,
    // Dropdown selected
    selectedDepartment: null,
    selectedPosition: null,
    selectedGender: null,
    selectedWorkingStatus: null,
    deleteEmployee: null, // get delete employee data
    addModal: true, // add Mode or update Mode
    isAdditem: true,
    resetModal: false, //reset modal
    // Validate
    validate: {
      isShow: false,
      validateMessage: null,
    },
    formValidate: {
      fieldCode: null,
      fieldName: null,
      fieldEmail: null,
      fieldPhoneNumber: null,
      fieldIndentity: null,
    },
    validateOnSubmit: false,
    // Filter
    filterByDepartment: null,
    filterByPosition: null,
    filterString: null,
    // Notification
    notifications: [],
  },
  getters: {},
  mutations: {
    GET_EMPLOYEE_DATA(state, data) {
      state.listEmployee = data;
    },
    SHOW_MODAL(state) {
      state.showModal = !state.showModal;
      if (state.showModal == false) {
        state.addModal = true;
        state.deleteEmployee = null;
        state.isAdditem = true;
        state.validate.isShow = false;
      }
    },
    IS_LOADING(state) {
      state.isLoading = !state.isLoading;
    },
    GET_NEW_CODE(state, data) {
      state.newCode = data;
    },
    GET_EMPLOYEE_INFO(state, data) {
      state.employeeInfo = data;
    },
    SHOW_COMBOBOX_OPTION(state) {
      state.showComboboxOption = !state.showComboboxOption;
    },
    GET_DEPARTMENT(state, data) {
      state.department = data;
    },
    GET_POSITION(state, data) {
      state.position = data;
    },
    SELLECTED_DEPARTMENT(state, data) {
      state.selectedDepartment = data;
    },
    SELLECTED_POSITION(state, data) {
      state.selectedPosition = data;
    },
    SELLECTED_GENDER(state, data) {
      state.selectedGender = data;
    },
    SELLECTED_WORKING_STATUS(state, data) {
      state.selectedWorkingStatus = data;
    },
    FILTER_BY_DEPARTMENT(state, data) {
      state.filterByDepartment = data;
    },
    FILTER_BY_POSITION(state, data) {
      state.filterByPosition = data;
    },
    FILTER_STRING(state) {
      state.filterString = queryString.stringify({
        departmentId: state.filterByDepartment,
        positionId: state.filterByPosition,
      });
    },
    DELETE_EMPLOYEE_ID(state, data) {
      state.deleteEmployee = data;
    },
    ADD_MODAL(state) {
      state.addModal = false;
    },
    UPDATE_MODE(state) {
      state.isAdditem = false;
    },
    PUSH_NOTIFICATION(state, data) {
      // data : {type : "", message}
      state.notifications.push({
        ...data,
        id: (Math.random().toString(36) + Date.now().toString(36)).substr(2),
      });
    },
    REMOVE_NOTIFICATION(state, data) {
      state.notifications = state.notifications.filter(
        (notification) => notification.id != data.id
      );
    },
    RESET_MODAL(state) {
      state.resetModal = !state.resetModal;
    },
    VALIDATE_SHOW(state) {
      state.validate.isShow = true;
    },
    REMOVE_VALIDATE(state) {
      state.validate.isShow = false;
    },
    VALIDATE_MESSAGE(state, message) {
      state.validate.validateMessage = message;
    },
    VALIDATE_EMAIL(state) {
      state.formValidate.fieldEmail = state.validate.validateMessage;
    },
    VALIDATE_CODE(state) {
      state.formValidate.fieldCode = state.validate.validateMessage;
    },
    VALIDATE_PHONE(state) {
      state.formValidate.fieldPhoneNumber = state.validate.validateMessage;
    },
    VALIDATE_NAME(state) {
      state.formValidate.fieldName = state.validate.validateMessage;
    },
    VALIDATE_IDENTITY(state) {
      state.formValidate.fieldIndentity = state.validate.validateMessage;
    },
    VALIDATE_ON_SUBMIT(state) {
      state.validateOnSubmit = !state.validateOnSubmit;
    },
  },
  actions: {
    // get all employee
    async getEmployeeData({ commit }) {
      try {
        commit("IS_LOADING");
        const data = await axios.get("http://api.manhnv.net/v1/Employees");
        commit("GET_EMPLOYEE_DATA", data.data);
        commit("IS_LOADING");
      } catch (error) {
        commit("IS_LOADING");
        commit("PUSH_NOTIFICATION", {
          type: "danger",
          message: "Có lỗi xảy ra, vui lòng thử lại",
        });
        console.log(error);
      }
    },
    // add a employee
    async saveEmployee(store, data) {
      try {
        store.commit("IS_LOADING");
        await axios({
          method: "post",
          url: "http://api.manhnv.net/v1/Employees",
          data,
        });
        store.commit("IS_LOADING");
        store.commit("SHOW_MODAL");
        store.commit("PUSH_NOTIFICATION", {
          type: "success",
          message: "Nhân viên đã được thêm vào",
        });
        store.dispatch("getEmployeeData");
      } catch (error) {
        store.commit("IS_LOADING");
        store.commit("PUSH_NOTIFICATION", {
          type: "danger",
          message: "Có lỗi xảy ra, vui lòng thử lại",
        });
        console.log(error);
      }
    },
    // update an employee
    async updateEmployee(store, data) {
      try {
        store.commit("IS_LOADING");
        await axios({
          method: "put",
          url: `http://api.manhnv.net/v1/Employees/${data.EmployeeId}`,
          data,
        });
        store.commit("IS_LOADING");
        store.commit("SHOW_MODAL");
        store.commit("PUSH_NOTIFICATION", {
          type: "success",
          message: "Nhân viên đã được cập nhật",
        });
        store.dispatch("getEmployeeData");
        // store.dispatch("getEmployeeData");
      } catch (error) {
        store.commit("IS_LOADING");
        store.commit("PUSH_NOTIFICATION", {
          type: "danger",
          message: "Có lỗi xảy ra, vui lòng thử lại",
        });
        console.log(error);
      }
    },
    // get new employee code
    async getNewCode({ commit }) {
      try {
        const data = await axios.get(
          "http://api.manhnv.net/v1/Employees/NewEmployeeCode"
        );
        commit("GET_NEW_CODE", data.data);
      } catch (error) {
        console.log(error);
      }
    },
    // get employee info
    async getEmployeeInfo(store, employeeId) {
      try {
        store.commit("IS_LOADING");
        const data = await axios.get(
          `http://api.manhnv.net/v1/Employees/${employeeId}`
        );
        store.commit("IS_LOADING");
        store.commit("GET_EMPLOYEE_INFO", data.data);
        store.commit("SHOW_MODAL");
      } catch (error) {
        console.log(error);
        store.commit("IS_LOADING");
        store.commit("PUSH_NOTIFICATION", {
          type: "danger",
          message: "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    },
    async getDepartMent({ commit }) {
      try {
        const data = await axios.get("http://api.manhnv.net/api/Department");
        commit("GET_DEPARTMENT", data.data);
      } catch (error) {
        console.log(error);
      }
    },
    async getPosition({ commit }) {
      try {
        const data = await axios.get("http://api.manhnv.net/v1/Positions");
        commit("GET_POSITION", data.data);
      } catch (error) {
        console.log(error);
      }
    },
    // filter
    async filter({ commit, state }) {
      try {
        commit("IS_LOADING");
        const data = await axios.get(
          `http://api.manhnv.net/v1/Employees/Filter?${state.filterString}`
        );
        state.listEmployee = data.data;
        commit("IS_LOADING");
      } catch (error) {
        commit("IS_LOADING");
        store.commit("PUSH_NOTIFICATION", {
          type: "danger",
          message: "Có lỗi xảy ra, vui lòng thử lại",
        });
      }
    },
  },
};
const store = new Vuex.Store(storeData);
export default store;
