<template>
  <div v-if="showModal">
    <div class="modal__layout">
      <div v-if="employeeModal" class="modal__content">
        <div class="modal__content__top">
          <h3 class="modal__title">Thông tin nhân viên</h3>
          <div class="modal__main__content-top">
            <div class="modal__user__img">
              <div class="modal__img__box"></div>
              <div class="img__choose__notify">
                <p>Vui lòng chọn ảnh có định dạng</p>
                <p>.jpg, .jpeg, .png, .gif</p>
              </div>
            </div>
            <div class="modal__main">
              <div class="modal__input-group">
                <div class="modal__input-title">
                  <h3>A. THÔNG TIN CHUNG:</h3>
                  <div class="line_border"></div>
                </div>
                <div class="modal__input-top">
                  <div class="modal__input--middle">
                    <Input
                      :inputLabel="true"
                      :labelContent="'Mã nhân viên'"
                      :labelFor="'EmployeeCode'"
                      :required="true"
                      v-model="employee.EmployeeCode"
                    />
                    <Input
                      :inputLabel="true"
                      :labelContent="'Ngày sinh'"
                      :labelFor="'DateOfBirth'"
                      :date="true"
                      v-model="employee.DateOfBirth"
                    />
                    <Input
                      :inputLabel="true"
                      :labelContent="'Số CMTND/Căn cước'"
                      :labelFor="'IdentityNumber'"
                      :required="true"
                      v-model="employee.IdentityNumber"
                    />
                    <Input
                      :inputLabel="true"
                      :labelContent="'Nơi cấp'"
                      :labelFor="'IdentityPlace'"
                      v-model="employee.IdentityPlace"
                    />
                    <Input
                      :inputLabel="true"
                      :labelContent="'Email'"
                      :labelFor="'Email'"
                      :placeholder="'example@domain.com'"
                      :required="true"
                      v-model="employee.Email"
                    />
                  </div>
                  <div class="modal__input--left">
                    <Input
                      :inputLabel="true"
                      :labelContent="'Họ và tên'"
                      :labelFor="'FullName'"
                      :required="true"
                      v-model="employee.FullName"
                    />
                    <Dropdown
                      :labelFor="'Giới tính'"
                      :option="gender"
                      dropName="Gender"
                      :value="employee.Gender"
                    />
                    <Input
                      :inputLabel="true"
                      :labelContent="'Ngày cấp'"
                      :labelFor="'IdentityDate'"
                      :date="true"
                      v-model="employee.IdentityDate"
                    />
                    <div class="line"></div>
                    <Input
                      :inputLabel="true"
                      :labelContent="'Số điện thoại'"
                      :labelFor="'PhoneNumber'"
                      :required="true"
                      v-model="employee.PhoneNumber"
                    />
                  </div>
                </div>
              </div>
              <!--  -->
              <!-- Thong tin cong viec -->
              <!--  -->
              <div class="modal__input-group">
                <div class="modal__input-title">
                  <h3>B. THÔNG TIN CÔNG VIỆC:</h3>
                  <div class="line_border"></div>
                </div>
                <div class="modal__input-top">
                  <div class="modal__input--middle">
                    <Dropdown
                      :option="position"
                      :labelFor="'Vị trí'"
                      dropName="Position"
                      :value="employee.PositionId"
                    />
                    <Input
                      :inputLabel="true"
                      :labelContent="'Mã số thuế cá nhân'"
                      :labelFor="'PersonalTaxCode'"
                      v-model="employee.PersonalTaxCode"
                    />
                    <Input
                      :inputLabel="true"
                      :labelContent="'Ngày gia nhập công ty'"
                      :labelFor="'JoinDate'"
                      v-model="employee.JoinDate"
                      :date="true"
                    />
                  </div>
                  <div class="modal__input--left">
                    <Dropdown
                      :option="department"
                      :labelFor="'Phòng ban'"
                      dropName="Department"
                      :value="employee.DepartmentId"
                    />
                    <Input
                      :inputLabel="true"
                      :labelContent="'Mức lương cơ bản'"
                      :labelFor="'Salary'"
                      v-model="employee.Salary"
                    />
                    <Dropdown
                      :option="workingStatus"
                      :labelFor="'Tình trạng công việc'"
                      dropName="WorkStatus"
                      :value="employee.WorkStatus"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__content__bottom">
          <div class="btn__bottom__group">
            <div @click="SHOW_MODAL" class="btn__cancel">
              Hủy
            </div>
            <div @click="saveEmployee"><Button :content="'Lưu'" /></div>
          </div>
        </div>
        <div @click="SHOW_MODAL" class="x__icon"></div>
      </div>
      <!-- Delete modal -->
      <div v-if="deleteModal" class="delete__modal modal__content">
        <div class="delete__content">
          <div class="popup__title">Xóa nhân viên</div>
          <h1>
            Bạn có chắc muốn xóa nhân viên có mã
            <span>{{ deleteEmployee.employeeCode }}</span>
          </h1>
        </div>
        <div class="modal__content__bottom">
          <div class="btn__bottom__group">
            <div @click="SHOW_MODAL" class="btn__cancel">
              Hủy
            </div>
            <div @click="deleteItem">
              <Button :content="'Xóa'" />
            </div>
          </div>
        </div>
        <div @click="SHOW_MODAL" class="x__icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import Button from "./Button.vue";
import Dropdown from "./Dropdown.vue";
import Input from "./Input";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
export default {
  data() {
    return {
      employee: {
        EmployeeId: uuidv4(),
        EmployeeCode: "",
        FirstName: null,
        LastName: null,
        FullName: "",
        Gender: null,
        DateOfBirth: null,
        PhoneNumber: "",
        Email: "",
        Address: null,
        IdentityNumber: "",
        IdentityDate: null,
        IdentityPlace: "",
        JoinDate: null,
        MaritalStatus: 0,
        PersonalTaxCode: "",
        Salary: null,
        EducationalBackground: 0,
        WorkStatus: null,
        PositionId: null,
        PositionName: null,
        DepartmentId: null,
        DepartmentName: null,
        QualificationId: null,
        QualificationName: null,
        GenderName: null,
        WorkStatusName: null,
        MISAEntityState: 0,
      },
      gender: [
        {
          Gender: 0,
          GenderName: "Nữ",
        },
        {
          Gender: 1,
          GenderName: "Nam",
        },
        {
          Gender: null,
          GenderName: "Khác",
        },
      ],
      workingStatus: [
        {
          workingStatusCode: 1,
          workingStatusName: "Đang làm việc",
        },
        {
          workingStatusCode: 2,
          workingStatusName: "Đang thử việc",
        },
      ],
    };
  },
  created() {
    this.getNewCode();
    this.getDepartMent();
    this.getPosition();
  },

  components: { Button, Input, Dropdown },
  props: ["employeeModal", "deleteModal"],
  computed: {
    ...mapState([
      "showModal",
      "newCode",
      "employeeInfo",
      "department",
      "position",
      "selectedDepartment",
      "selectedPosition",
      "selectedGender",
      "selectedWorkingStatus",
      "deleteEmployee",
    ]),
  },
  watch: {
    employeeInfo() {
      this.employee = { ...this.employeeInfo };
      this.employee.DateOfBirth = this.formatDate(this.employee.DateOfBirth);
      this.employee.JoinDate = this.formatDate(this.employee.JoinDate);
      this.employee.IdentityDate = this.formatDate(this.employee.IdentityDate);
    },
    selectedDepartment() {
      this.employee.DepartmentId = this.selectedDepartment;
    },
    selectedPosition() {
      this.employee.PositionId = this.selectedPosition;
    },
    selectedGender() {
      this.employee.Gender = this.selectedGender;
    },
    selectedWorkingStatus() {
      this.employee.WorkingStatus = this.selectedWorkingStatus;
    },
    newCode() {
      this.employee.EmployeeCode = this.newCode;
    },
  },
  methods: {
    ...mapMutations(["SHOW_MODAL"]),
    ...mapActions([
      "getNewCode",
      "getDepartMent",
      "getPosition",
      "getEmployeeData",
    ]),
    saveEmployee() {
      this.$store.dispatch("saveEmployee", this.employee);
    },
    formatDate(date) {
      const newDate = new Date(date);
      let getDate = newDate.getDate();
      if (getDate < 10) getDate = "0" + getDate;
      let getMonth = newDate.getMonth() + 1;
      if (getMonth < 10) getMonth = "0" + getMonth;
      const getYear = newDate.getFullYear();
      return `${getYear}-${getMonth}-${getDate}`;
    },
    async deleteItem() {
      try {
        await axios.delete(
          `http://api.manhnv.net/v1/Employees/${this.deleteEmployee.employeeId}`
        );
        alert("Xóa thành công");
        this.SHOW_MODAL();
        this.getEmployeeData();
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.add__modal {
  display: none;
}
.add__modal.active {
  display: block;
}
.modal__layout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 999;
}
.modal__content {
  width: 60%;
  height: 90%;
  background: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 4px;
  border: 1px solid #bbb;
  overflow-y: auto;
}

.modal__content__bottom {
  background: #e9ebee;
  height: 60px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
.x__icon {
  position: absolute;
  width: 20px;
  height: 20px;
  right: 16px;
  top: 16px;
  background-image: url("../../assets/icon/x.svg");
  background-size: contain;
  cursor: pointer;
}
.modal__content__top {
  padding: 24px;
}

.modal__main__content-top {
  display: flex;
}

.modal__user__img {
  width: 33.333333%;
  max-width: 33.333333%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 30px;
}
.modal__main {
  width: 100%;
  margin-left: 10px;
}
.modal__input-top {
  display: flex;
  justify-content: space-between;
}
.modal__input-top > * {
  width: 50%;
}
.modal__title {
  font-size: 20px;
  text-transform: capitalize;
  word-spacing: 3px;
  margin-bottom: 10px;
}
.modal__img__box {
  border: 1px solid #bbbbbb;
  border-radius: 50%;
  width: 180px;
  height: 180px;
  overflow: hidden;
  background-image: url("../../assets/img/default-avatar.jpg");
  background-size: contain;
  background-position: center;
}
.modal__input-title {
  margin-top: 20px;
}
.modal__input--middle {
  margin-right: 10px;
}
.field__input__lable {
  margin-bottom: 15px;
}
.img__choose__notify > p {
  text-align: center;
}
.img__choose__notify > p:nth-child(2) {
  font-family: GoogleSans-Bold;
}
.checkbox__list {
  display: flex;
  margin-top: 10px;
}
.checkbox__item {
  display: flex;
  align-items: center;
}
.checkbox__item + .checkbox__item {
  margin-left: 20px;
}
.checkbox__item > span {
  margin-left: 5px;
}
.modal__content__middle {
  display: flex;
}
.modal__content__middle__left {
  width: 66.6666667%;
  max-width: 66.6666667%;
  margin-right: 10px;
}

.btn__bottom__group {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 100%;
}
.btn__bottom__group > * {
  margin-right: 30px;
}
.btn__cancel {
  cursor: pointer;
}
.line {
  margin-top: 81px;
}
.line_border {
  width: 80px;
  height: 5px;
  background: #019160;
  margin-top: 15px;
}
.delete__modal {
  width: 400px;
  height: 180px;
  position: relative;
}
.delete__content {
  padding: 24px;
}
.popup__title {
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 10px;
}
.delete__modal .modal__content__bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
