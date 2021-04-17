<template>
  <div>
    <div
      :class="[
        'field__input',
        inputIcon ? 'field__input--icon' : '',
        inputLabel ? 'field__input__lable' : '',
        labelFor == 'Salary' ? 'field__salary' : '',
      ]"
    >
      <label v-if="inputLabel" :for="labelFor"
        >{{ labelContent }}
        <span v-if="required" class="label__required">*</span></label
      >
      <input
        :type="date ? 'date' : 'text'"
        :id="labelFor"
        name="search__input"
        :placeholder="placeholder"
        :value="[value ? value : inputValue]"
        @input="getValue"
        @blur="handleValidate"
        autocomplete="off"
        :class="validateLocal && required ? 'error' : ''"
      />

      <div v-if="inputIcon" class="search__icon"></div>
      <div v-if="inputSalary" class="monneyVND">VNĐ</div>
      <div v-if="required && validate.isShow && validateLocal">
        <validate
          :labelContent="this.labelContent"
          :validateLocalMessage="validateLocalMessage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Validate from "../validate/Validate.vue";
export default {
  data() {
    return {
      inputValue: "",
      validateLocal: false,
      validateLocalMessage: null,
      timeout: null,
    };
  },
  components: {
    Validate,
  },

  mounted() {
    this.$store.watch(
      (state, getters) => state.validateOnSubmit,
      () => {
        if (this.required) {
          if (this.labelFor == "Email" && this.formValidate.fieldEmail) {
            (this.validateLocal = true),
              (this.validateLocalMessage = this.formValidate.fieldEmail);
          }
          if (this.labelFor == "EmployeeCode" && this.formValidate.fieldCode) {
            (this.validateLocal = true),
              (this.validateLocalMessage = this.formValidate.fieldCode);
          }
          if (
            this.labelFor == "IdentityNumber" &&
            this.formValidate.fieldIndentity
          ) {
            (this.validateLocal = true),
              (this.validateLocalMessage = this.formValidate.fieldIndentity);
          }
          if (this.labelFor == "FullName" && this.formValidate.fieldName) {
            (this.validateLocal = true),
              (this.validateLocalMessage = this.formValidate.fieldName);
          }
          if (
            this.labelFor == "PhoneNumber" &&
            this.formValidate.fieldPhoneNumber
          ) {
            (this.validateLocal = true),
              (this.validateLocalMessage = this.formValidate.fieldPhoneNumber);
          }
        }
      }
    );
    this.$store.watch(
      (state) => state.validate.isShow,
      () => {
        if (this.validate.isShow == false) {
          this.validateLocal = false;
        }
      }
    );
  },

  props: [
    "inputIcon",
    "placeholder",
    "inputLabel",
    "labelFor",
    "labelContent",
    "date",
    "value", // truyền dữ liệu
    "input",
    "required", // set option required
    "inputSalary",
    "setValue",
  ],
  computed: {
    ...mapState(["validate", "formValidate"]),
  },

  methods: {
    ...mapMutations(["VALIDATE_SHOW", "VALIDATE_MESSAGE"]),
    getValue(e) {
      if (this.labelFor != "Salary") this.$emit("input", e.target.value);
      else this.$emit("input", this.formatMoney(e.target.value));
    },
    formatMoney(money) {
      money = money.toString().replaceAll(".", "");
      if (money.length > 3) {
        const formatedMoney = money.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return formatedMoney;
      }
      return money;
    },
    handleValidate(e) {
      if (this.required && e.target.value.length == 0) {
        this.validateLocal = true;
        this.VALIDATE_SHOW();
        this.$store.commit("VALIDATE_MESSAGE", "không được bỏ trống");
        this.validateLocalMessage = this.validate.validateMessage;
      } else {
        this.validateLocal = false;
      }
    },
  },
};
</script>

<style scoped>
.field__input {
  position: relative;
}

.field__input input {
  border: 1px solid #bbb;
  border-radius: 4px;
  height: 40px;
  font-size: 13px;
  font-family: GoogleSans-Regular;
  color: #000;
  outline: none;
  padding: 0 16px;
}

.search__icon {
  position: absolute;
  width: 16px;
  height: 16px;
  background-image: url("../../assets/icon/search.png");
  background-size: contain;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);
}
.label__required {
  color: red;
}
.field__input--icon input {
  padding-left: 40px;
}
.field__input input:focus {
  border-color: #019160;
}
.field__input input.error {
  border-color: #ff4747;
}
.field__input input::placeholder {
  font-size: 11px;
}
.field__input--icon input::placeholder {
  font-size: 12px;
}
.field__input input:focus::placeholder {
  color: transparent;
}
.field__input__lable {
  margin-top: 10px;
}
.field__input__lable input {
  width: 100%;
}
.field__input__lable label {
  font-size: 13px;
  font-family: GoogleSans-Medium;
  margin-bottom: 4px;
  display: block;
}
input[type="date"] {
  width: 100%;
}
.monneyVND {
  position: absolute;
  right: 10px;
  top: calc(50% + 10px);
  transform: translateY(-50%);
}
.field__salary input {
  text-align: right;
  padding-right: 50px;
}
</style>
