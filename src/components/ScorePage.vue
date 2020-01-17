<template>
  <div class="scorePage">
    <van-divider :style="{ color: '#42b983', borderColor: '#42b983', padding: '0 16px' }">
      <div v-if="stuInfo != ''">{{stuInfo}}</div>
      <div v-else>未登录</div>
    </van-divider>
    <div>
      <van-dropdown-menu active-color="#42b983">
        <van-dropdown-item v-model="index" :options="semester" @close="sectionSemester"/>
      </van-dropdown-menu>
    </div>
    <div class="score-box">
      <van-cell v-for="(item, index) in resArray" :key="index" center :title="item.kcmc" :value="item.zcj"
                :label="item.kcxzmc"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ScorePage',
  data () {
    return {
      getUrl: '',
      xh: this.GLOBAL.xh,
      token: this.GLOBAL.token,
      stuInfo: this.GLOBAL.stuInfo,

      index: 0,
      semester: [
        { text: '2019-2020-1', value: 0 },
        { text: '2018-2019-2', value: 1 },
        { text: '2018-2019-1', value: 2 },
        { text: '2017-2018-2', value: 3 },
        { text: '2017-2018-1', value: 4 }
      ],
      resArray: []
    }
  },
  // 请求成绩信息
  mounted: function () {
    // 未登录 全局变量token为空值
    if (this.GLOBAL.token === '') {
      this.$toast.fail('请登录')

      // 跳回登录页面
      this.$router.push({
        path: '/'
      })
    } else {
      // 拼接请求url
      this.getUrl = '/api/app.do?method=getCjcx&xh=' + this.xh + '&xnxqid=' + this.semester[this.index].text

      // 请求学生成绩信息
      this.axios.get(this.getUrl, {
        headers: {
          'token': this.GLOBAL.token
        }
      }).then((response) => {
        this.resArray = response.data.result
      })
    }
  },
  methods: {
    // 下拉选择器关闭时触发
    sectionSemester () {
      // 轻提示显示完整学期信息
      switch (this.index) {
        case 0:
          this.$toast('2019-2020学年 第一学期')
          break
        case 1:
          this.$toast('2018-2019学年 第二学期')
          break
        case 2:
          this.$toast('2018-2019学年 第一学期')
          break
        case 3:
          this.$toast('2017-2018学年 第二学期')
          break
        case 4:
          this.$toast('2017-2018学年 第一学期')
          break
      }

      // 根据选择器改变的新学期拼接请求url
      this.getUrl = '/api/app.do?method=getCjcx&xh=' + this.xh + '&xnxqid=' + this.semester[this.index].text

      // 重新请求当前学期学生成绩
      this.axios.get(this.getUrl, {
        headers: {
          'token': this.GLOBAL.token
        }
      }).then((response) => {
        this.resArray = response.data.result
      })
    }
  }
}
</script>

<style scoped>
  .score-box {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: left;*/
    color: #2c3e50;
  }
</style>
