<template>
  <div @click="showOption" class="field__combobox">
    <div v-if="labelFor">
      <label>{{ labelFor }}</label>
    </div>
    <div class="combobox">
      <div class="text">{{ valueCurrent }}</div>
      <div class="drop__down__icon"></div>
    </div>
    <div class="combobox__option" v-if="isShowOption">
      <option
        v-for="(valueItem, index) in option"
        :value="valueItem"
        :key="index"
        @click="getSelectValue(valueItem)"
        >{{ formatOption(valueItem) }}</option
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowOption: false,
      valueCurrent: null,
    };
  },
  props: ["option", "labelFor", "required", "dropName", "value"],
  created() {
    if (this.dropName == "Gender") {
      for (let i = 0; i < this.option.length; i++) {
        if (this.option[i].Gender == this.value) {
          this.valueCurrent = this.option[i].GenderName;
          break;
        }
      }
    } else if (this.dropName == "Department") {
      for (let i = 0; i < this.option.length; i++) {
        if (this.option[i].DepartmentId == this.value) {
          this.valueCurrent = this.option[i].DepartmentName;
          break;
        }
      }
    } else if (this.dropName == "Position") {
      for (let i = 0; i < this.option.length; i++) {
        if (this.option[i].PositionId == this.value) {
          this.valueCurrent = this.option[i].PositionName;
          break;
        }
      }
    } else if (this.dropName == "WorkStatus") {
      for (let i = 0; i < this.option.length; i++) {
        if (this.option[i].workingStatusCode == this.value) {
          this.valueCurrent = this.option[i].workingStatusName;
          break;
        }
      }
    }
  },
  watch: {
    option() {
      if (this.required) {
        this.valueCurrent = this.option[0].DepartmentName
          ? this.option[0].DepartmentName
          : this.option[0].PositionName;
      }
    },
  },

  methods: {
    showOption() {
      this.isShowOption = !this.isShowOption;
    },
    getSelectValue(valueItem) {
      if (this.dropName == "Gender") {
        this.valueCurrent = valueItem.GenderName;
        this.$store.commit("SELLECTED_GENDER", valueItem.Gender);
      } else if (this.dropName == "Department") {
        this.valueCurrent = valueItem.DepartmentName;
        this.$store.commit("SELLECTED_DEPARTMENT", valueItem.DepartmentId);
      } else if (this.dropName == "Position") {
        this.valueCurrent = valueItem.PositionName;
        this.$store.commit("SELLECTED_POSITION", valueItem.PositionId);
      } else if (this.dropName == "WorkStatus") {
        this.valueCurrent = valueItem.workingStatusName;
        this.$store.commit(
          "SELLECTED_WORKING_STATUS",
          valueItem.workingStatusCode
        );
      }
    },
    formatOption(valueItem) {
      if (this.dropName == "Gender") {
        return valueItem.GenderName;
      } else if (this.dropName == "Department") {
        return valueItem.DepartmentName;
      } else if (this.dropName == "Position") {
        return valueItem.PositionName;
      } else if (this.dropName == "WorkStatus") {
        return valueItem.workingStatusName;
      }
    },
  },
};
</script>

<style scoped>
.field__combobox {
  margin-top: 10px;
  position: relative;
}
.combobox {
  height: 40px;
  width: 100%;
  border: 1px solid #bbbbbb;
  padding-left: 16px;
  padding-right: 16px;
  border-radius: 4px;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
}

.combobox:hover {
  border-color: #019160;
}
.drop__down__icon {
  background-image: url("../../assets/icon/btn-next-page.svg");
  width: 13px;
  height: 13px;
  background-size: contain;
  transform: rotate(90deg);
}
.combobox__option {
  position: absolute;
  left: 0;
  top: calc(100% + 1px);
  border: 1px solid #bbbbbb;
  border-radius: 4px;
  width: 100%;
  z-index: 9999;
  background-color: white;
}
.combobox__option > * {
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
  cursor: pointer;
}
.combobox__option > *:hover {
  background: #e9ebee;
}
label {
  font-size: 13px;
  font-family: GoogleSans-Medium;
  margin-bottom: 4px;
  display: block;
}
</style>
