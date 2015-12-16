<template>
<main class="container">
    <h1>爬虫状态监控 <small>Dashboard</small></h1>
    <div class="row">
      <div class="col-md-3">
        <stat-pane title="下载成功率" unit="%" :data="success_rate" :min="85"></stat-pane>
      </div>
      <div class="col-md-3">
        <stat-pane title="单页面平均抓取时长" unit="ms" :data="single_time" :max="300"></stat-pane>
      </div>
      <div class="col-md-3">
        <stat-pane title="合计下载速度" unit="kb/s" :data="total_speed" :min="30"></stat-pane>
      </div>
      <div class="col-md-3">
        <stat-pane title="每秒处理页面" :data="page_per_second" :min="8"></stat-pane>
      </div>
  </div>

  <div class="tabs-container">
      <ul class="nav nav-tabs">
            <li>
              <a data-toggle="tab" href="#tab-1" aria-expanded="true">事件日志</a>
            </li>
            <li class="active"><a data-toggle="tab" href="#tab-2" aria-expanded="false">节点信息</a></li>
            <li class=""><a data-toggle="tab" href="#tab-3" aria-expanded="false">数据监视</a></li>
            <li class=""><a data-toggle="tab" href="#tab-4" aria-expanded="false">队列查看</a></li>
      </ul>
      <div class="tab-content">
          <div id="tab-1" class="tab-pane ">
            <div class="panel-body">


              <span>切换Log Level:</span>
              <label>
                <input type="checkbox" class="log_level" v-model="log_level" value="success"> <span class="label label-success">Success</span>
              </label>
              <label>
                <input type="checkbox" class="log_level" v-model="log_level" value="info"> <span class="label label-info">Info</span>
              </label>
              <label>
                <input type="checkbox" class="log_level" v-model="log_level" value="danger"> <span class="label label-danger">Error</span>
              </label>
              <div class="scroll">
                <!--   事件日志   -->
                <table class="table">
                  <th width="100">时间</th>
                  <th width="100">类型</th>
                  <th>信息</th>
                  <tr v-for="m in messages">
                    <td>{{m.time | onlyTime}}</td>
                    <td>
                      <span class="label label-{{m.type}}">{{m.type}}</span>
                    </td>
                    <td>{{m.message}}</td>
                  </tr>
                </table>
              </div>

            </div>
          </div>
          <div id="tab-2" class="tab-pane active">
            <div class="panel-body">
              <div v-for="i in clients"  track-by="id">
                <div class="col-md-6">
                  <client :id="i.id" :ip="i.ip" :last-active="i.lastActive" :max-age="maxAge" :cpu="i.cpu_used" :memory="i.memory_used"></client>
                </div>

              </div>
            </div>
          </div>
          <div id="tab-3" class="tab-pane">
              <div class="panel-body">

              </div>
          </div>
          <div id="tab-4" class="tab-pane">
              <div class="panel-body">

              </div>
          </div>
      </div>


  </div>
</main>
</template>

<script>
import StatPane from './components/stat_pane.vue'
import Client from './components/client.vue'

export default {
  data () {
    return {
      single_time: 132,
      total_speed: 45.2,
      page_per_second: 12,
      success_rate: 100,
      clients: [
        {
          id: 'rse31',
          ip: '127.0.0.1',
          lastActive: Date.now(),
          cpu_used: 20,
          memory_used: 10
        },
        {
          id: 'f31w1',
          ip: '10.31.21.6',
          lastActive: Date.now(),
          cpu_used: 51,
          memory_used: 6
        },
        {
          id: '52fe2',
          ip: '60.33.11.44',
          lastActive: Date.now(),
          cpu_used: 67,
          memory_used: 19
        },
        {
          id: '513de',
          ip: '52.42.21.2',
          lastActive: Date.now(),
          cpu_used: 31,
          memory_used: 33
        }
      ],
      maxAge: 30000,
      log_level: ["success", "info", "danger"],
      messages: []
    }
  },
  ready() {
    setInterval(function() {
      var random = Math.round(Math.random() * 300 + 100)
      this.single_time = random
      random = Math.round(Math.random() * 900 + 100)/10
      this.total_speed = random
      random = Math.round(Math.random() * 20) + 5
      this.page_per_second = random
      random = Math.round(Math.random() * 20) + 80
      this.success_rate = random

      let type = Math.floor(Math.random() * 3)
      let type_str = ""
      switch (type) {
        case 0:
          type_str = "success"
          break;
        case 1:
          type_str = "info"
          break;
        case 2:
          type_str = "danger"
      }
      this.messages.unshift({
        time: Date.now(),
        type: type_str,
        message: 'Example Message #' + this.messages.length
      })
      if(this.messages.length > 30){
        this.messages.splice(this.messages.length-1, 1)
      }
    }.bind(this), 1000)


  },
  components: {
    StatPane,
    Client
  },
  filters: {
    onlyTime(val) {
      let t = new Date(val)
      return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
    }
  }
}


</script>

<style lang="sass">
h1 {
    font-family: "Source Han Sans CN","Hiragino Sans GB", "Microsoft YaHei","WenQuanYi Micro Hei";
    small {
        font-weight: 100;
    }
}
div.scroll {
  max-height: 400px;
  overflow: scroll;
}
</style>
