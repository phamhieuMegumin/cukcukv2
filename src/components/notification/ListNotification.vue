<template>
  <div class="list__notification">
    <notification
      v-for="item in notifications"
      :key="item.id"
      :notification="item"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Notification from "./Notification.vue";
export default {
  components: { Notification },
  computed: {
    ...mapState(["notifications"]),
  },
};
</script>

<style scoped>
.list__notification {
  position: fixed;
  top: 20px;
  right: 10px;
  width: 320px;
  z-index: 99999;
}
</style>
