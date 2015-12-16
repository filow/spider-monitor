<template>
<div class="client_wrapper">
  <div class="client">
    <div class="page-header">
      <h2>#{{ id }} <small>{{ ip }}</small></h2>

      <div class="expires">{{expire}}</div>
      <div class="status">
        <cpu-chart text="CPU占用率" :value="cpu" color="#1A9DBB"></cpu-chart>
        <cpu-chart text="内存占用率" :value="memory"></cpu-chart>
        <table class="table" style="width: 65%">
          <tr>
            <td>已处理的文档</td>
            <td>402</td>
          </tr>
          <tr>
            <td>请求失败数量</td>
            <td>12</td>
          </tr>
          <tr>
            <td>处理文档总大小</td>
            <td>31 MB</td>
          </tr>
          <tr>
            <td>爬取花费时间</td>
            <td>3.1s</td>
          </tr>
          <tr>
            <td>任务在客户端停留的时间</td>
            <td>4s</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</div>
</template>

<style lang="sass">
div.client {
  margin-bottom: 5px;
  padding: 5px;
  position: relative;
  .page-header {
    margin: 0;
  }
}
div.status {
  display: flex;
}
div.expires {
  position: absolute;
  right: 0;
  top: 15px;
  padding: 5px 11px;
  background-color: #eee;
}
</style>

<script>
import CpuChart from './cpu_chart.vue'

export default {
  props: {
    id: String,
    ip: String,
    lastActive: Number,
    maxAge: Number,
    cpu: Number,
    memory: Number
  },
  data () {
    return {
      expire: '3分4秒'
    }
  },
  methods: {
    changeExpire() {
      let now = Date.now()
      let duration = Math.floor((this.maxAge - (now - this.lastActive))/1000)
      let result = ""
      if(duration/60 >= 1) {
        result += Math.floor(duration/60) + '分'
      }
      result += Math.floor(duration%60) + '秒'
      this.expire = result
      setTimeout(this.changeExpire, 1000)
    }
  },
  ready() {
    this.changeExpire()




  },
  components: {
    CpuChart
  }
}
</script>
