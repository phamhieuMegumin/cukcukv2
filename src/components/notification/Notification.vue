<template>
  <div class="toast__message" :class="typeClass">
    <div class="message__content">
      <p>{{ notification.message }}</p>
    </div>
    <div @click="REMOVE_NOTIFICATION(notification)" class="x__icon"></div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  props: ["notification"],
  data() {
    return {
      timeout: null,
    };
  },
  created() {
    this.timeout = setTimeout(() => {
      this.REMOVE_NOTIFICATION(this.notification);
    }, 4000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  computed: {
    ...mapState(["toastMessage"]),
    typeClass() {
      return `toast__message--${this.notification.type}`;
    },
  },
  methods: {
    ...mapMutations(["IS_SHOW_TOASTMESSAGE", "REMOVE_NOTIFICATION"]),
  },
};
</script>

<style scoped>
.toast__message {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  border-radius: 4px;
  padding: 16px;
  min-width: 250px;
  margin-bottom: 20px;
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
