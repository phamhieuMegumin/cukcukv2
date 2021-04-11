import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const storeData = {
  state: {
    listEmployee: [],
    isLoading: true,
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
  },
  getters: {},
  mutations: {
    GET_EMPLOYEE_DATA(state, data) {
      state.listEmployee = data;
      state.isLoading = false;
    },
    SHOW_MODAL(state) {
      state.showModal = !state.showModal;
      if (state.showModal == false) {
        state.addModal = true;
        state.deleteEmployee = null;
        state.isAdditem = true;
      }
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
  },
  actions: {
    async getEmployeeData({ commit }) {
      const data = await axios.get("http://api.manhnv.net/v1/Employees");
      commit("GET_EMPLOYEE_DATA", data.data);
    },
    async saveEmployee(store, data) {
      try {
        await axios({
          method: "post",
          url: "http://api.manhnv.net/v1/Employees",
          data,
        });
        alert("them thanh cong");
        store.commit("SHOW_MODAL");
        store.dispatch("getEmployeeData");
      } catch (error) {
        console.log(error);
      }
    },
    async updateEmployee(store, data) {
      try {
        await axios({
          method: "put",
          url: `http://api.manhnv.net/v1/Employees/${data.EmployeeId}`,
          data,
        });
        alert("sua thanh cong");
        store.commit("SHOW_MODAL");
        store.dispatch("getEmployeeData");
      } catch (error) {
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
        const data = await axios.get(
          `http://api.manhnv.net/v1/Employees/${employeeId}`
        );
        store.commit("GET_EMPLOYEE_INFO", data.data);
        store.commit("SHOW_MODAL");
      } catch (error) {
        console.log(error);
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
