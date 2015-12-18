<template>
<div class="client_wrapper animated bounceIn">
  <div class="client">
    <div class="page-header">
      <h2>#{{ id.key }} <small>{{ id.ip }}</small></h2>

      <div class="expires">{{expire}}</div>
      <div class="status">

        <cpu-chart text="CPU占用率" :value="performance.loadavg" color="#1A9DBB"></cpu-chart>
        <cpu-chart text="内存占用率" :value="performance.memory.usage / performance.memory.total * 100"></cpu-chart>
        <table class="table" style="width: 60%">
          <tr>
            <td>已处理的文档</td>
            <td>{{performance.documents.total}}</td>
          </tr>
          <tr>
            <td>请求失败数量</td>
            <td>{{performance.documents.failed}}</td>
          </tr>
          <tr>
            <td>处理文档总大小</td>
            <td>{{performance.documents.size / 1000 / 1000 | p2}} MB</td>
          </tr>
          <tr>
            <td>爬取花费时间</td>
            <td>{{performance.time.crawl / 1000 | p2}} s</td>
          </tr>
          <tr>
            <td>任务在客户端停留的时间</td>
            <td>{{performance.time.loop / 1000 | p2}} s</td>
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
    id: Object,
    lastActive: Number,
    maxAge: Number,
    performance: Object
  },
  data () {
    return {
      expire: '0分0秒'
    }
  },
  filters: {
    p2(val) {
      return val.toPrecision(2)
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
      let second = Math.floor(duration%60)
      if (second < 0) second = 0;
      result +=  second + '秒'
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
