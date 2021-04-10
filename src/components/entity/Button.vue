<template>
  <div
    :class="[
      'btn',
      btnIcon ? 'btn-icon' : '',
      'btn__add',
      btnDelete ? 'btn__delete' : '',
    ]"
  >
    <span :class="[btnIcon ? 'btn__icon btn__icon__add' : '']"></span>
    <span>{{ content }}</span>
  </div>
</template>

<script>
export default {
  props: ["btnIcon", "content", "btnDelete"],
  data() {
    return {};
  },
};
</script>

<style scoped>
.btn {
  height: 40px;
  padding: 0 24px;
  color: #fff;
  cursor: pointer;
  background: #019160;
  border-radius: 4px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.btn:hover {
  background: #2fbe8e;
}

.btn:active {
  background: #01b075;
}

.btn-icon {
  padding: 0 16px;
}

.btn__icon {
  width: 16px;
  height: 16px;
  background-size: contain;
  margin-right: 8px;
}
.btn__icon__add {
  background-image: url("../../assets/icon/add.png");
}
.btn__icon__save {
  background-image: url("../../assets/icon/document-online.png");
}
.btn__delete {
  background: red;
}
.tr__active .btn__delete.active {
  display: flex;
}
</style>
