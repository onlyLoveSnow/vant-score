<template>
  <div class="loginPage">
    <div>
      <h2>南宁学院成绩查询</h2>
      <p>请输入学号密码</p>
    </div>
    <div class="input-box">
      <!-- 输入学号（只允许输入整数） -->
      <van-field v-model="xh" type="digit" label="学号" placeholder="请输入学号" size="large"/>
      <!-- 输入密码（密码输入） -->
      <van-field v-model="pwd" type="password" label="密码" placeholder="请输入密码" size="large" @focus="pwdInput"/>
    </div>
    <div class="button-box">
      <van-button plain type="primary" style="border-color: #42b983; color: #42b983;" @click="login" block>登录
      </van-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'LoginPage',
  data () {
    return {
      xh: '20170217077',
      pwd: '',
      getURL: ''
    }
  },
  methods: {
    pwdInput () {
      scrollTo(1, 500)
    },
    login () {
      // 判断输入合法性
      if (this.xh.length < 11 || this.pwd === '') {
        if (this.xh === '' && this.pwd === '') {
          this.$dialog.alert({
            message: '请输入学号和密码'
          })
        } else if (this.pwd === '') {
          this.$dialog.alert({
            message: '请输入密码'
          })
        } else {
          this.$dialog.alert({
            message: '输入的学号不正确，请检查'
          })
        }
      } else {
        // 拼接token请求url
        this.getUrl = '/api/app.do?method=authUser&xh=' + this.xh + '&pwd=' + this.pwd

        // jw.nnxy.cn/app.do?method=authUser&xh=20170217077&pwd=d6e562abff17228f
        // 请求登录token
        this.$http.get(this.getUrl).then((response) => {
          if (response.data.token === '-1') {
            // this.$toast.fail('登录失败')
            this.$dialog.alert({
              message: '请求失败，请检查学号和密码'
            }).then(() => {
              // on close
              this.pwd = ''
            })
          } else {
            this.GLOBAL.xh = this.xh
            this.GLOBAL.token = response.data.token
            this.GLOBAL.stuInfo = response.data.user.userdwmc + ' ' + response.data.user.username
            this.$toast.success('登录成功')

            this.$router.push({
              path: '/score'
            })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .loginPage {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  .input-box {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .button-box {
    margin: 0px 100px 20px 100px;
  }
</style>
