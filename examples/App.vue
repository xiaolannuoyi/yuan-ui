<template>
  <div id="app">
    <!-- header -->
    <div class="header"></div>
    <div class="main">
      <!-- sidebar -->
      <div class="sidebar">
        <router-link to="test">test</router-link>
      </div>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
    <!-- footer -->
    <div class="footer"></div>
  </div>
</template>

<script>
export default {};
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
}
.view {
  flex: 1;
}
</style>
