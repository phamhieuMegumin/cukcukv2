<template>
  <div>
    <div class="navbar">
      <div class="logo__box">
        <div class="toggle__btn"></div>
        <div class="logo"></div>
      </div>
      <div class="nav__content">
        <a class="nav__item" to="/employee">
          <div class="nav__item__icon nav__item__icon--dashboard"></div>
          <span>Tổng quan</span></a
        >
        <a class="nav__item">
          <div class="nav__item__icon nav__item__icon--report"></div>
          <span>Báo cáo</span>
        </a>
        <a class="nav__item">
          <div class="nav__item__icon nav__item__icon--employee"></div>
          <span>Mua hàng</span>
        </a>
        <a class="nav__item">
          <div class="nav__item__icon nav__item__icon--employee"></div>
          <span>Danh mục khách hàng</span>
        </a>
        <a class="nav__item">
          <div class="nav__item__icon nav__item__icon--setting"></div>
          <span>Thiết lập hệ thống</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.navbar {
  width: 226px;
  height: 100vh;
  flex-shrink: 0;
}
.logo__box {
  height: 48px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.toggle__btn {
  width: 24px;
  height: 24px;
  background-image: url("../../assets/img/toggle.png");
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  margin-left: 16px;
  margin-right: 10px;
}
.logo {
  background-image: url("../../assets/img/cukcuk-logo.png");
  background-size: contain;
  background-repeat: no-repeat;
  flex: 1;
  height: 24px;
}
.nav__item {
  padding-left: 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 44px;
  text-decoration: none;
  color: #000;
  transition: all linear 0.3s;
}
.nav__item__icon {
  width: 20px;
  height: 20px;
  background-size: contain;
  margin-right: 10px;
}
.nav__item__icon--dashboard {
  background-image: url("../../assets/icon/dashboard.png");
}
.nav__item__icon--report {
  background-image: url("../../assets/icon/report.png");
}
.nav__item__icon--setting {
  background-image: url("../../assets/icon/setting.png");
}
.nav__item__icon--employee {
  background-image: url("../../assets/icon/dic-employee.png");
}
.nav__item.active {
  background: #019160;
  color: #fff;
}
.nav__item:not(.active):hover {
  background: #e5e5e5;
}
</style>
