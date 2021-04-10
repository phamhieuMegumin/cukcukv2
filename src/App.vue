<template>
  <div class="container">
    <Navbar />
    <div class="content">
      <Header />
      <Content />
    </div>
  </div>
</template>

<script>
import Content from "./components/layout/Content.vue";
import Header from "./components/layout/Header.vue";
import Navbar from "./components/layout/Navbar";
export default {
  name: "App",
  components: {
    Navbar,
    Header,
    Content,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
* {
  box-sizing: border-box;
  font-family: GoogleSans-Regular;
  font-size: 13px;
  margin: 0;
  padding: 0;
}

.content {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  border-left: 1px solid #bbbbbb;
  position: relative;
}
.container {
  display: flex;
}
@font-face {
  font-family: "GoogleSans-Medium";
  src: url("./assets/font/GoogleSans-Medium.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-Regular";
  src: url("./assets/font/GoogleSans-Regular.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-Italic";
  src: url("./assets/font/GoogleSans-Italic.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-Bold";
  src: url("./assets/font/GoogleSans-Bold.otf") format("opentype");
}

@font-face {
  font-family: "GoogleSans-Italic";
  src: url("./assets/font/GoogleSans-Italic.otf") format("opentype");
}
</style>
