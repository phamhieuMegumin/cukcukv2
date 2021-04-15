<template>
  <div class="validateMessage">
    <p>{{ `${this.labelContent} ${validateLocalMessage}` }}</p>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  props: ["labelContent", "validateLocalMessage"],
  data() {
    return {
      timeout: null,
    };
  },
  created() {
    this.timeout = setTimeout(() => {
      this.REMOVE_VALIDATE();
    }, 4000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
  methods: {
    ...mapMutations(["REMOVE_VALIDATE"]),
  },
};
</script>

<style scoped>
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
  animation: fateIn linear 0.3s, fadeOut linear 1s 3s forwards;
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
@keyframes fateIn {
  0% {
    opacity: 0;
    transform: translateX(-50%) scale(0);
  }
  100% {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }
}
@keyframes fadeOut {
  to {
    opacity: 0;
  }
}
</style>
