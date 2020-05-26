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
        <el-button type="primary" size="small" @click="handleverify">确定</el-button>
      </div>
    </div>
    <div class="verify-wrap" v-if="step === 3">
      <div class="list">
        <div class="name">短信验证码：</div>
        <div class="value">
          <el-input type="text" size="small" v-model="smsCode" />
        </div>
      </div>
      <div class="operate-btn">
        <el-button type="primary" size="small" @click="handleSms">确定</el-button>
      </div>
    </div>
    <div class="verify-wrap" v-if="step === 4">
      <div class="list">
        <div class="name">请输入步数：</div>
        <div class="value">
          <el-input type="text" size="small" v-model="stepCount" />
        </div>
      </div>
      <div class="operate-btn">
        <el-button type="primary" size="small" @click="handleSport">确定</el-button>
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
      imgCode: '',
      smsCode: '',
      stepCount: '',
      accessToken: '',
      userId: ''
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
      const url = `${this.$baseUrl}/sms_service/verify/getValidateCode?requestId=1000&sessionId=nosession&mobile=${this.loginPhone}`
      this.$axios.get(
        url,
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
      }).catch((error) => {
        console.log(error)
      })
    },
    handleverify() {
      if (this.imgCode.length === 0) {
        this.$message.warning('请输入图片验证码')
        return
      }
      const params = {
        code: this.imgCode,
        mobile: this.loginPhone
      }
      const url = `${this.$baseUrl}/sms_service/verify/sendCodeWithOptionalValidate?requestId=1000&sessionId=nosession`
      this.$axios({
        method: 'post',
        url,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'LSWearable/4.5 (iPhone; iOS 13.1.2; Scale/2.00)'
        },
        data: params
      }).then((res) => {
        if (res.data.code === 200) {
          this.step = 3
        } else {
          this.$message.warning(res.data.msg || '图片验证码有误，请重试')
          this.smsCode = ''
          this.login()
        }
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSms() {
      if (this.smsCode.length === 0) {
        this.$message.warning('请输入短信验证码')
        return
      }
      const params = {
        clientId: 'b23874271da24b1fbd06329591f2340f',
        appType: 6,
        authCode: this.smsCode,
        loginName: this.loginPhone
      }
      const url = `${this.$baseUrl}/sessions_service/loginByAuth?country=%E4%B8%AD%E5%9B%BD&screenWidth=1080&city=%E9%A9%BB%E9%A9%AC%E5%BA%97&cityCode=411700&timezone=Asia%2FShanghai&latitude=32.759864&os_country=CN&channel=huawei&language=zh&openudid=&platform=android&province=%E6%B2%B3%E5%8D%97%E7%9C%81&appType=6&requestId=0ca6881b3e7146a48dc4fbca159d2a15&countryCode=&systemType=2&longitude=115.122339&devicemodel=COR-AL10&area=CN&screenwidth=1080&os_langs=zh&clientId=c170aa2cf93143e58334218558574e15&provinceCode=410000&screenHeight=2128&promotion_channel=huawei&version=4.5&areaCode=411729&network_type=wifi&osversion=9&screenheight=2128`
      this.$axios({
        method: 'post',
        url,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'LSWearable/4.5 (iPhone; iOS 13.1.2; Scale/2.00)'
        },
        data: params
      }).then((res) => {
        if (res.data.code === 200) {
          const { data } = res.data
          this.step = 4
          this.accessToken = data.data.accessToken
          this.userId = data.data.userId
        } else {
          this.$message.warning(res.data.msg || '短信验证码有误，请重试')
          this.smsCode = ''
          this.loginPhone = ''
          this.imgCode = ''
          this.imgUrl = ''
          this.login()
        }
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    },
    handleSport() {
      if (this.stepCount.length === 0) {
        this.$message.warning('请输入步数')
        return
      }
      if (parseInt(this.stepCount, 10) > 100000) {
        this.$message.warning('作死需谨慎')
        return
      }
      const data = new Date()
      const formatTime = this.formatTime(data, '-')
      const params = {
        active: 1,
        calories: 120,
        created: formatTime.result,
        dataSource: 2,
        dayMeasurementTime: formatTime.date,
        deviceId: 'M_869741031866246',
        distance: Math.ceil(this.stepCount / 2),
        id: this.accessToken,
        isUpload: 0,
        measurementTime: formatTime.result,
        priority: 0,
        step: this.stepCount,
        type: 2,
        updated: data.getTime(),
        userId: this.userId,
        DataSource: 2
      }
      const url = `${this.$baseUrl}/sport_service/sport/sport/uploadMobileStepV2?country=%E4%B8%AD%E5%9B%BD&city=%E9%A9%BB%E9%A9%AC%E5%BA%97&cityCode=411700&timezone=Asia%2FShanghai&latitude=32.75986&os_country=CN&channel=apple&language=zh&openudid=&platform=ios&province=%E6%B2%B3%E5%8D%97%E7%9C%81&appType=6&requestId=99c6c1bbbedb46a9addba0f32951df77&countryCode=&systemType=2&longitude=115.122349&devicemodel=COR-AL10&area=CN&screenwidth=1080&os_langs=zh&provinceCode=410000&promotion_channel=apple&version=13.1.2&areaCode=411729&network_type=wifi&osversion=9&screenheight=2128`
      this.$axios({
        method: 'post',
        url,
        headers: {
          'Cache-Control': 'no-cache',
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': 'LSWearable/4.5 (iPhone; iOS 13.1.2; Scale/2.00)'
        },
        data: params
      }).then((res) => {
        if (res.data.code === 200) {
          this.$message.success('成功')
        } else {
          this.$message.warning(res.data.msg || '失败，请刷新重试')
          this.smsCode = ''
          this.loginPhone = ''
          this.imgCode = ''
          this.imgUrl = ''
          this.login()
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    formatTime(date, joinSymbol = '/') {
      const formatNumber = (n) => {
        n = n.toString()
        return n[1] ? n : `0${n}`
      }
      const year = date.getFullYear()
      const month = formatNumber(date.getMonth() + 1)
      const day = formatNumber(date.getDate())
      const hour = formatNumber(date.getHours())
      const minute = formatNumber(date.getMinutes())
      const second = formatNumber(date.getSeconds())
      return {
        result: `${[year, month, day].map(formatNumber).join(joinSymbol)} ${[hour, minute, second].map(formatNumber).join(':')}`,
        date: [year, month, day].map(formatNumber).join(joinSymbol),
        chinaDate: `${year}年${month}月${day}日`,
        clock: [hour, minute, second].map(formatNumber).join(':'),
        year,
        month,
        day,
        hour,
        minute,
        second
      }
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
