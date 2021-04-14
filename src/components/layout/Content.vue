<template>
  <div>
    <div class="main__content">
      <div class="main__content__top">
        <span>Danh sách nhân viên</span>
        <div @click="addItem">
          <Button :btnIcon="true" :content="'Thêm nhân viên'" />
        </div>
      </div>
      <div class="main__content__bottom">
        <div class="main__content__bottom-input">
          <Input
            :inputIcon="true"
            :placeholder="'Tìm kiếm theo Mã, Tên hoặc Số điện thoại'"
          />
          <Dropdown
            :option="departmentFilter"
            :required="true"
            dropName="DepartmentFilter"
          />
          <Dropdown
            :option="positionFilter"
            :required="true"
            dropName="PositionFilter"
          />
        </div>

        <div class="main__content__right-btn">
          <div @click="deleteItem" class="delete__btn">
            <div class="x__icon"></div>
          </div>
          <div @click="refreshData" class="btn__refresh">
            <div class="refresh__icon"></div>
          </div>
        </div>
      </div>
      <ListEmployee />
      <div v-if="toastMessage.isShow">
        <ToastMessage />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Button from "../entity/Button.vue";
import Dropdown from "../entity/Dropdown.vue";
import Input from "../entity/Input.vue";
import ListEmployee from "../employee/ListEmployee.vue";
import Footer from "./Footer.vue";
import { mapActions, mapMutations, mapState } from "vuex";
import ToastMessage from "../entity/ToastMessage.vue";
export default {
  data() {
    return {
      departmentFilter: null,
      positionFilter: null,
    };
  },
  components: { Button, Input, ListEmployee, Dropdown, Footer, ToastMessage },
  created() {
    this.getDepartMent();
    this.getPosition();
  },
  mounted() {
    this.$store.watch(
      (state) => state.department,
      () => {
        this.departmentFilter = [
          { DepartmentName: "Tất cả phòng ban" },
          ...this.department,
        ];
      }
    );
    this.$store.watch(
      (state) => state.position,
      () => {
        this.positionFilter = [
          { PositionName: "Tất cả vị trí" },
          ...this.position,
        ];
      }
    );
    this.$store.watch(
      (state) => state.filterByDepartment,
      () => {
        this.FILTER_STRING();
        this.filter();
      }
    );
    this.$store.watch(
      (state) => state.filterByPosition,
      () => {
        this.FILTER_STRING();
        this.filter();
      }
    );
  },
  computed: {
    ...mapState([
      "department",
      "position",
      "deleteEmployee",
      "toastMessage",
      "filterByDepartment",
      "filterString",
    ]),
  },
  methods: {
    ...mapActions([
      "getDepartMent",
      "getPosition",
      "getEmployeeData",
      "filter",
    ]),
    ...mapMutations([
      "SHOW_MODAL",
      "ADD_MODAL",
      "RESET_MODAL",
      "FILTER_STRING",
    ]),
    deleteItem() {
      if (this.deleteEmployee) {
        this.SHOW_MODAL();
        this.ADD_MODAL();
      } else {
        this.$store.commit("IS_SHOW_TOASTMESSAGE");
        this.$store.commit(
          "MESSAGE_ERROR",
          "Vui lòng lựa chọn nhân viên cần xóa"
        );
      }
    },
    refreshData() {
      this.getEmployeeData();
    },
    addItem() {
      this.SHOW_MODAL();
      this.RESET_MODAL();
    },
  },
};
</script>

<style scoped>
.main__content {
  padding: 24px 16px;
  position: relative;
}

.main__content__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.main__content__top > span {
  font-family: GoogleSans-Bold;
  font-size: 20px;
  display: block;
}

.main__content__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.main__content__bottom-input {
  display: flex;
  align-items: center;
  width: 70%;
}
.main__content__bottom-input .field__combobox {
  margin-top: 0;
  width: 230px;
  margin-left: 16px;
}
.main__content__right-btn {
  display: flex;
}
/*  */
/* Btn group */
/*  */
.delete__btn {
  border: 1px solid #dbdeff;
  border-radius: 4px;
  height: 40px;
  width: 40px;
  display: flex;
  cursor: pointer;
  margin-right: 10px;
}
.x__icon {
  margin: auto;
  width: 20px;
  height: 20px;
  right: 16px;
  top: 16px;
  background-image: url("../../assets/icon/x.svg");
  background-size: contain;
}
.btn__refresh {
  height: 40px;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #dbdeff;
  border-radius: 4px;
  margin-left: auto;
}

.refresh__icon {
  width: 16px;
  height: 16px;
  background-image: url("../../assets/icon/refresh.png");
  background-size: contain;
  background-repeat: no-repeat;
}

.main__content__table {
  margin-top: 16px;
  overflow-y: auto;
  max-height: 380px;
}

.content__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  position: absolute;
  bottom: 0;
  left: 24px;
  right: 24px;
  height: 56px;
}

.pagination {
  display: flex;
}

.pagination__item {
  width: 35px;
  height: 35px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.pagination__item + .pagination__item {
  margin-left: 14px;
}

.paginaton__icon {
  width: 20px;
  height: 20px;
  background-size: contain;
}

.pagination__item:hover {
  background: #019160;
  color: #fff;
}

.icon__first__page {
  background-image: url("../../assets/icon/btn-firstpage.svg");
}

.icon__next__page {
  background-image: url("../../assets/icon/btn-next-page.svg");
}

.icon__last__page {
  background-image: url("../../assets/icon/btn-lastpage.svg");
}

.icon__prev__page {
  background-image: url("../../assets/icon/btn-prev-page.svg");
}

.pagination__item__num {
  border-radius: 50%;
  border: 1px solid #dbdeff;
}

.current__customer > span,
.current__customer__perpage > span {
  font-family: GoogleSans-Bold;
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
.cancel__bnt {
  cursor: pointer;
}
</style>
