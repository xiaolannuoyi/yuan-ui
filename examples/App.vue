<template>
  <div id="app">
    <!-- header -->
    <div class="header"></div>
    <div class="main">
      <!-- sidebar -->
      <div class="sidebar">
        <!-- <router-link to="test">test</router-link> -->
        <nav-side :data="navsData"></nav-side>
      </div>
      <div class="view page-container">
        <router-view></router-view>
      </div>
    </div>
    <!-- footer -->
    <div class="footer"></div>
  </div>
</template>

<script>
import navSide from "./components/nav-side";
import navsData from "./nav.config.json";
export default {
  components: {
    navSide
  },
  data() {
    return {
      navsData
    };
  }
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
}
.header,
.footer {
  position: absolute;
  height: 60px;
  background-color: antiquewhite;
  width: 100%;
}
.header {
  top: 0;
}
.footer {
  bottom: 0;
}
.main {
  position: absolute;
  bottom: 60px;
  top: 60px;
  width: 100%;
  overflow: hidden;
}

.sidebar,
.view {
  height: 100%;
  overflow: auto;
}
.sidebar {
  float: left;
  width: 200px;
  padding-left: 20px;
}
.view {
  float: left;
  width: calc(100% - 260px);
}
</style>
