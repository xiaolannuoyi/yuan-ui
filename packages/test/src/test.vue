<template>
  <div>
    <button @click="add">{{ num }}</button>
  </div>
</template>

<script>
export default {
  name: "YuanTest", // 这个名字很重要，它就是未来的标签名<yuan-test></yuan-test>
  data() {
    return {
      num: 1
    };
  },
  methods: {
    add() {
      this.num++;
    }
  }
};
</script>

<style></style>
