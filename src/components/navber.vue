<template>
  <van-nav-bar :title="nav" left-arrow @click-left="onClickLeft" />
</template>

<script>
export default {
  props: {
    nav: {
      type: String
    }
  },
  methods: {
    onClickLeft () {
      this.$toast.clear()
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-style: normal;
}
:deep(.van-nav-bar__title) {
  color: #fff;
}
:deep(.van-nav-bar__content) {
  background-color: #3296fa;
}
:deep(.van-icon-arrow-left) {
  color: #fff;
  //   font-size: 16px;
}
</style>
