<template>
  <div class="wrap">
    
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginPhone: '',
      imgUrl: ''
    }
  },
  created() {
    this.$nextTick(() => {

    })
  },
  methods: {
    login() {
      if (this.loginPhone.length === 0) {
        this.$message.warning('请输入手机号')
        return
      }
      this.$axios({
        method: 'get',
        url: `${this.$baseUrl}/sms_service/verify/getValidateCode?requestId=1000&sessionId=nosession&mobile=${this.loginPhone}`,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'LSWearable/4.5 (iPhone; iOS 13.1.2; Scale/2.00)',
          Host: 'sports.lifesense.com',
          Connection: 'Keep-Alive',
          'Accept-Encoding': 'gzip'
        },
        responseType: 'arraybuffer'
      }).then((res) => {
        this.imgUrl = `data:image/png;base64,${btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`
        console.log(this.imgUrl)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrap {
  width: 100%;
  height: 100%;
  .list {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-left: 30px;
    .name {
      width: 100px;
      text-align: left;
    }
    .value {

    }
  }
  .operate-btn {
    display: flex;
    justify-content: flex-start;
    margin-top: 30px;
    margin-left: 30px;
  }
}
</style>
