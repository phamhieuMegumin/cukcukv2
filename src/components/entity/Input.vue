<template>
  <div>
    <div
      :class="[
        'field__input',
        inputIcon ? 'field__input--icon' : '',
        inputLabel ? 'field__input__lable' : '',
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
        :value="value ? value : inputValue"
        @input="getValue"
        @blur="handleValidate"
        autocomplete="off"
      />

      <div v-if="inputIcon" class="search__icon"></div>
      <div
        v-if="required && validate.isShow && validateLocal"
        class="validateMessage"
      >
        <p>{{ `${this.labelContent} ${validateLocalMessage}` }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  data() {
    return {
      inputValue: "",
      validateLocal: false,
      validateLocalMessage: null,
    };
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
  ],
  computed: {
    ...mapState(["validate", "formValidate"]),
  },

  methods: {
    ...mapMutations(["VALIDATE_SHOW", "VALIDATE_MESSAGE"]),
    getValue(e) {
      this.$emit("input", e.target.value);
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

.validateMessage {
  position: absolute;
  top: calc(-50% - 4px);
  left: 50%;
  padding: 10px;
  background-color: #ff4747;
  border-radius: 5px;
  color: #fff;
  transform: translateX(-50%);
  min-width: 60%;
  transform-origin: bottom;
  animation: fateOut linear 0.3s;
}
.validateMessage::after {
  content: "";
  position: absolute;
  bottom: -15%;
  left: 50%;
  transform: translateX(-50%);
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 14px solid #ff4747;
}
.validateMessage .field__input--danger input {
  border-color: #ff4747;
}
@keyframes fateOut {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}
</style>
