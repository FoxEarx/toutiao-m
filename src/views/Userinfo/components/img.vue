<template>
  <div class="update-avatar">
    <img :src="img" alt="" ref="userimg" />
    <div class="toolbar">
      <span class="cancel" @click="$emit('close')">取消</span>
      <span class="confirm" @click="fisinal">完成</span>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api'
export default {
  data () {
    return {
      cropper: ''
    }
  },
  methods: {
    fisinal () {
      // this.$toast.loading({
      //   message: '加载中...',
      //   forbidClick: true,
      //   duration: 0
      // })
      try {
        this.cropper.getCroppedCanvas().toBlob(async (blob) => {
          const formData = new FormData()
          formData.append('photo', blob)
          const res = await updateUserPhoto(formData)
          this.$emit('close')
          this.$emit('updateUserPhoto', res.data.data.photo)
        })
        this.$toast.success('更新成功')
      } catch (error) {
        console.log(error)
        this.$toast.fail('更新失败')
      }
    }
  },
  props: {
    img: {
      type: [String, Object]
    }
  },
  mounted () {
    const userimg = this.$refs.userimg
    this.cropper = new Cropper(userimg, {
      viewMode: 1, // 只能在裁剪的图片范围内移动
      dragMode: 'move', // 画布和图片都可以移动
      aspectRatio: 1, // 裁剪区默认正方形
      autoCropArea: 1, // 自动调整裁剪图片
      cropBoxMovable: false, // 禁止裁剪区移动
      cropBoxResizable: true, // 禁止裁剪区缩放
      background: false // 关闭默认背景
    })
    // console.log(cropper)
  }
}
</script>

<style scoped lang="less">
.update-avatar {
  // display: flex;
  background: #000;
  width: 100%;
  height: 100%;
  .toolbar {
    position: fixed;
    bottom: 10px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 28px;
    color: #fff;
    padding: 0 15px;
    box-sizing: border-box;
    .cancel,
    .confirm {
      width: 90px;
      height: 90px;
      font-size: 30px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  img {
    width: 100%;
  }
}
</style>
