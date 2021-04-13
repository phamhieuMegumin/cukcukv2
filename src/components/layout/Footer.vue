<template>
  <div>
    <footer class="footer">
      <div class="current__customer">
        Hiển thị <span>01-20/123</span> nhân viên
      </div>
      <div class="pagination">
        <div @click="firstPage" class="pagination__item btn__first__page">
          <div class="paginaton__icon icon__first__page"></div>
        </div>
        <div @click="prevPage" class="pagination__item btn__prev__page">
          <div class="paginaton__icon icon__prev__page"></div>
        </div>
        <div
          @click="changPage(1)"
          id="1"
          class="pagination__item pagination__item__num active"
        >
          <span>1</span>
        </div>
        <div
          @click="changPage(2)"
          id="2"
          class="pagination__item pagination__item__num"
        >
          <span>2</span>
        </div>
        <div
          @click="changPage(3)"
          id="3"
          class="pagination__item pagination__item__num"
        >
          <span>3</span>
        </div>
        <div
          @click="changPage(4)"
          id="4"
          class="pagination__item pagination__item__num"
        >
          <span>4</span>
        </div>
        <div @click="nextPage" class="pagination__item btn__next__page">
          <div class="paginaton__icon icon__next__page"></div>
        </div>
        <div @click="lastPage" class="pagination__item btn__last__page">
          <div class="paginaton__icon icon__last__page"></div>
        </div>
      </div>
      <div class="current__customer__perpage">
        <span>20</span> nhân viên/trang
      </div>
    </footer>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      currentPage: 1,
      pageNumber: 10,
      itemPerPage: 20,
    };
  },
  methods: {
    nextPage() {
      if (this.currentPage < this.pageNumber)
        this.currentPage = this.currentPage + 1;
    },
    prevPage() {
      if (this.currentPage > 1) this.currentPage = this.currentPage - 1;
    },
    firstPage() {
      this.currentPage = 1;
    },
    lastPage() {
      this.currentPage = this.pageNumber;
    },
    changPage(value) {
      this.currentPage = value;
    },
    async getData() {
      try {
        const data = await axios.get(
          `http://api.manhnv.net/v1/Employees/employeeFilter?pageSize=${this.itemPerPage}&pageNumber=${this.currentPage}`
        );
        this.$emit("getPaginationData", data.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  watch: {
    currentPage() {
      this.getData();
    },
  },
};
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
  position: fixed;
  bottom: 0;
  left: calc(226px + 24px);
  right: 24px;
  height: 56px;
  background: #fff;
  border-top: 1px solid #bbbbbb;
}

.pagination {
  display: flex;
}

.pagination__item {
  width: 30px;
  height: 30px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.pagination__item.active {
  background: #019160;
  color: white;
}

.pagination__item + .pagination__item {
  margin-left: 14px;
}

.paginaton__icon {
  width: 20px;
  height: 20px;
  background-size: contain;
}

.pagination__item:hover {
  background: #019160;
  color: #fff;
}

.icon__first__page {
  background-image: url("../../assets/icon/btn-firstpage.svg");
}

.icon__next__page {
  background-image: url("../../assets/icon/btn-next-page.svg");
}

.icon__last__page {
  background-image: url("../../assets/icon/btn-lastpage.svg");
}

.icon__prev__page {
  background-image: url("../../assets/icon/btn-prev-page.svg");
}

.pagination__item__num {
  border-radius: 50%;
  border: 1px solid #dbdeff;
}

.current__customer > span,
.current__customer__perpage > span {
  font-family: GoogleSans-Bold;
}
</style>
