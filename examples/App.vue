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
}
.header,
.footer {
  height: 60px;
  background-color: antiquewhite;
}
.main {
  min-height: calc(100vh - 120px);
  display: flex;
}
.sidebar {
  width: 200px;
  padding-left: 20px;
}
.view {
  flex: 1;
  margin: 20px;
}
</style>
