<template>
  <div>
    <div class="header">
      <div class="header__title">
        <span>Nhà hàng biển đông</span>
        <div class="drop__down__icon"></div>
      </div>
      <div class="user__info">
        <div class="avatar__icon"></div>
        <span class="name__user">Phạm Quang Hiếu</span>
        <div class="info_icon"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #bbbbbb;
  background: #fff;
}

.header__title {
  margin-left: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.header__title > span {
  margin-right: 10px;
  font-family: GoogleSans-Bold;
}

.drop__down__icon {
  background-image: url("../../assets/icon/btn-next-page.svg");
  width: 13px;
  height: 13px;
  background-size: contain;
  transform: rotate(90deg);
}

.user__info {
  display: flex;
  align-items: center;
}

.avatar__icon {
  width: 30px;
  height: 30px;
  background-image: url("../../assets/icon/avatar-default.png");
  background-size: contain;
  cursor: pointer;
}

.name__user {
  font-family: GoogleSans-Bold;
  margin: 0 16px;
}

.info_icon {
  background-image: url("../../assets/icon/option.png");
  background-size: contain;
  width: 20px;
  height: 20px;
  margin-right: 16px;
  cursor: pointer;
}
</style>
