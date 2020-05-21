<template>
  <div class="wrapper">
    <div class="login-wrap" v-if="step === 1">
      <div class="list">
        <div class="name">手机号：</div>
        <div class="value">
          <el-input type="text" size="small" v-model="loginPhone" />
        </div>
      </div>
      <div class="operate-btn">
        <el-button type="primary" size="small" @click="login">登录</el-button>
      </div>
    </div>
    <div class="verify-wrap" v-if="step === 2">
      <div class="list">
        <div class="name">图片验证码：</div>
        <div class="value">
          <el-input type="text" size="small" v-model="imgCode" />
        </div>
        <div>
          <img v-if="imgUrl.length" :src="imgUrl">
        </div>
      </div>
      <div class="operate-btn">
        <el-button type="primary" size="small" @click="verify">确定</el-button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Index',
  data() {
    return {
      step: 1,
      loginPhone: '',
      imgUrl: '',
      imgCode: ''
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
      
      this.$axios.get(`${this.$baseUrl}/sms_service/verify/getValidateCode?requestId=1000&sessionId=nosession&mobile=${this.loginPhone}`,
        {
          headers: {
            'Cache-Control': 'no-cache',
            'Postman-Token': '<calculated when request is sent>',
            'Content-Type': 'application/json; charset=utf-8',
            'User-Agent': 'LSWearable/4.5 (iPhone; iOS 13.1.2; Scale/2.00)',
            Host: 'sports.lifesense.com',
            Connection: 'Keep-Alive',
            'Accept-Encoding': 'gzip'
          },
          responseType: 'arraybuffer'
        }
      ).then((res) => {
        this.imgUrl = `data:image/png;base64,${btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`
        this.step = 2
        console.log(this.imgUrl)
      }).catch((error) => {
        console.log(error)
      })
      // this.$axios({
      //   method: 'get',
      //   url: `${this.$baseUrl}/sms_service/verify/getValidateCode?requestId=1000&sessionId=nosession&mobile=${this.loginPhone}`,
      //   headers: {
      //     'Cache-Control': 'no-cache',
      //     'Postman-Token': '<calculated when request is sent>',
      //     'Content-Type': 'application/json; charset=utf-8',
      //     'User-Agent': 'LSWearable/4.5 (iPhone; iOS 13.1.2; Scale/2.00)',
      //     Host: 'sports.lifesense.com',
      //     Connection: 'Keep-Alive',
      //     'Accept-Encoding': 'gzip'
      //   },
      //   responseType: 'arraybuffer'
      // }).then((res) => {
      //   this.imgUrl = `data:image/png;base64,${btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`
      //   this.step = 2
      //   console.log(this.imgUrl)
      // }).catch((error) => {
      //   console.log(error)
      // })
    },
    verify() {
      if (this.imgCode.length === 0) {
        this.$message.warning('请输入图片验证码')
        return
      }
      this.$axios({
        method: 'post',
        url: `${this.$baseUrl}/sms_service/verify/getValidateCode`,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'LSWearable/4.5 (iPhone; iOS 13.1.2; Scale/2.00)'
          // Host: 'sports.lifesense.com',
          // Connection: 'Keep-Alive',
          // 'Accept-Encoding': 'gzip'
        },
        data: this.$qs.stringify({
          requestId: 1000,
          sessionId: 'nosession',
          code: this.imgCode,
          mobile: this.loginPhone
        })
      }).then((res) => {
        this.step = 3
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
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
