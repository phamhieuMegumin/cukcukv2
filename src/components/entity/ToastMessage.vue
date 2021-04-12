<template>
  <div
    :class="[
      'toast__message',
      toastMessage.error ? 'toast__message--danger' : '',
      toastMessage.success ? 'toast__message--success' : '',
    ]"
  >
    <div class="message__content">
      <p>{{ toastMessage.message }}</p>
    </div>
    <div @click="IS_SHOW_TOASTMESSAGE" class="x__icon"></div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["toastMessage"]),
  },
  methods: {
    ...mapMutations(["IS_SHOW_TOASTMESSAGE"]),
  },
};
</script>

<style scoped>
.toast__message {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 20px;
  right: 10px;
  z-index: 99999;
  height: 48px;
  border-radius: 4px;
  padding: 16px;
  min-width: 250px;
  animation: fadeIn linear 0.2s, fadeOut linear 1s 3s forwards;
}
.x__icon {
  width: 16px;
  height: 16px;
  background-image: url("../../assets/icon/x.svg");
  background-size: contain;
  cursor: pointer;
  margin-left: 12px;
}
.toast__message--danger {
  background: #ffcece;
}
.toast__message--success {
  background: #baffe7;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateX(100%);
  }
  100% {
    opacity: 1;
    transform: translateX (0);
  }
}
@keyframes fadeOut {
  to {
    opacity: 0;
  }
}
</style>
