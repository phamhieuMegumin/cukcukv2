import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const storeData = {
  state: {
    listEmployee: [],
    isLoading: false,
    showModal: false,
    newCode: null,
    employeeInfo: null,
    showComboboxOption: false,
    department: null,
    position: null,
    selectedDepartment: null,
    selectedPosition: null,
    selectedGender: null,
    selectedWorkingStatus: null,
    deleteEmployee: null,
    addModal: true,
    isAdditem: true,
    toastMessage: {
      isShow: false,
      message: null,
      error: null,
      success: null,
    },
    resetModal: false,
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
    DELETE_EMPLOYEE_ID(state, data) {
      state.deleteEmployee = data;
    },
    ADD_MODAL(state) {
      state.addModal = false;
    },
    UPDATE_MODE(state) {
      state.isAdditem = false;
    },
    IS_SHOW_TOASTMESSAGE(state) {
      state.toastMessage.isShow = !state.toastMessage.isShow;
      setTimeout(() => {
        state.toastMessage.isShow = false;
      }, 3000);
    },
    MESSAGE_ERROR(state, message) {
      state.toastMessage.error = true;
      state.toastMessage.message = message;
      setTimeout(() => {
        state.toastMessage.error = false;
      }, 3000);
    },
    MESSAGE_SUCCESS(state, message) {
      state.toastMessage.success = true;
      state.toastMessage.message = message;
      setTimeout(() => {
        state.toastMessage.success = false;
      }, 3000);
    },
    RESET_MODAL(state) {
      state.resetModal = !state.resetModal;
    },
    VALIDATE_SHOW(state) {
      state.validate.isShow = true;
      setTimeout(() => {
        state.validate.isShow = false;
      }, 3000);
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
    async getEmployeeData({ commit }) {
      try {
        commit("IS_LOADING");
        const data = await axios.get("http://api.manhnv.net/v1/Employees");
        commit("GET_EMPLOYEE_DATA", data.data);
        commit("IS_LOADING");
      } catch (error) {
        store.commit("IS_LOADING");
        store.commit("IS_SHOW_TOASTMESSAGE");
        store.commit("MESSAGE_ERROR", "Có lỗi xảy ra, vui lòng thử lại");
        console.log(error);
      }
    },
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
        store.commit("IS_SHOW_TOASTMESSAGE");
        store.commit("MESSAGE_SUCCESS", "Nhân viên đã được thêm vào");
        store.dispatch("getEmployeeData");
      } catch (error) {
        store.commit("IS_LOADING");
        store.commit("IS_SHOW_TOASTMESSAGE");
        store.commit("MESSAGE_ERROR", "Có lỗi xảy ra, vui lòng thử lại");
        console.log(error);
      }
    },
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
        store.commit("IS_SHOW_TOASTMESSAGE");
        store.commit("MESSAGE_SUCCESS", "Thông tin đã được cập nhật");
        store.dispatch("getEmployeeData");
        store.dispatch("getEmployeeData");
      } catch (error) {
        store.commit("IS_LOADING");
        store.commit("IS_SHOW_TOASTMESSAGE");
        store.commit("MESSAGE_ERROR", "Có lỗi xảy ra, vui lòng thử lại");
        console.log(error);
      }
    },
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
        store.commit("IS_SHOW_TOASTMESSAGE");
        store.commit("MESSAGE_ERROR", "Có lỗi xảy ra, vui lòng thử lại");
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
  },
};
const store = new Vuex.Store(storeData);
export default store;
