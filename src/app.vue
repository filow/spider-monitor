<template>
<main class="container">
    <h1>爬虫状态监控 <small>Dashboard</small></h1>
    <div class="row">
      <div class="col-md-3">
        <stat-pane title="下载成功率" unit="%" :data="success_rate" :refresh="refresh_random" :min="85"></stat-pane>
      </div>
      <div class="col-md-3">
        <stat-pane title="单页面平均抓取时长" unit="ms" :data="single_time" :refresh="refresh_random" ></stat-pane>
      </div>
      <div class="col-md-3">
        <stat-pane title="合计下载速度" unit="kb/s" :data="total_speed"  :refresh="refresh_random"></stat-pane>
      </div>
      <div class="col-md-3">
        <stat-pane title="每秒处理页面" :data="page_per_second" :refresh="refresh_random"></stat-pane>
      </div>
  </div>

  <div class="tabs-container">
      <ul class="nav nav-tabs">
            <li class="active">
              <a data-toggle="tab" href="#tab-1" aria-expanded="true">事件日志</a>
            </li>
            <li><a data-toggle="tab" href="#tab-2" aria-expanded="false">节点信息</a></li>
            <li class=""><a data-toggle="tab" href="#tab-3" aria-expanded="false">数据监视</a></li>
            <li class=""><a data-toggle="tab" href="#tab-4" aria-expanded="false">队列查看</a></li>
      </ul>
      <div class="tab-content">
          <div id="tab-1" class="tab-pane active">
            <div class="panel-body">
              <log :messages="messages"></log>
            </div>
          </div>
          <div id="tab-2" class="tab-pane ">
            <div class="panel-body">
              <div v-for="i in clients"  track-by="$index">
                <div class="col-md-6">
                  <client :id="i.id" :last-active="i.lastActive" :performance="i.performance" :max-age="maxAge"></client>
                </div>

              </div>
            </div>
          </div>
          <div id="tab-3" class="tab-pane">
              <div class="panel-body">
                <data-monitor :monitors="monitors"></data-monitor>
              </div>
          </div>
          <div id="tab-4" class="tab-pane">
              <div class="panel-body">
                <quene :quene="quene"></quene>
              </div>
          </div>
      </div>


  </div>
</main>
</template>

<script>
import StatPane from './components/stat_pane.vue'
import Client from './components/client.vue'
import DataMonitor from './components/data_monitor.vue'
import Quene from './components/quene.vue'
import Log from './components/log.vue'
import io from 'socket.io-client'

export default {
  data () {
    return {
      single_time: 0,
      total_speed: 0,
      page_per_second: 0,
      success_rate: 100,
      clients: {},
      maxAge: 30000,
      messages: [],
      monitors: [],
      quene: [],
      refresh_random: 0
    }
  },
  methods: {
    setClient(node) {
      node.lastActive = Number(new Date(node.lastActive))
      this.$set('clients._' + node.id.key, node)
      this.analize()
    },
    deleteClient(key) {
      let clients = {}
      let k = '_' + key;
      for(let i in this.clients) {
        if (i !== k) {
          clients[i] = this.clients[i]
        }
      }
      this.clients = clients
      this.analize()
    },
    analize() {
      let rate = {success: 0, total: 0}
      let single_page_time = {pages: 0, time: 0}
      let page_total_size = 0, page_total_time = 0
      let total_pages = 0
      if(this.clients.length == 0) return;

      for(let i in this.clients) {
        let node = this.clients[i]
        rate.success += node.performance.documents.success
        rate.total += node.performance.documents.total
        single_page_time.pages += 1
        single_page_time.time += node.performance.time.crawl

        page_total_size += node.performance.documents.single_size
        page_total_time += node.performance.time.loop

        total_pages += node.performance.documents.total
      }
      this.success_rate = rate.success / rate.total * 100
      this.single_time = single_page_time.time / single_page_time.pages
      this.single_time = single_page_time.time / single_page_time.pages
      this.total_speed = page_total_size / page_total_time
      this.page_per_second = total_pages / page_total_time * 1000
      this.refresh_random = Math.random()
    }
  },
  ready() {
    var socket = io()
    socket.on('connect', ()=> {
      toastr["success"]("已成功连接服务器")
    })
    socket.on('disconnect', ()=> {
      toastr["error"]("与服务器的连接已断开")
    })
    socket.on('clients', (obj)=> {
      console.log('[Node] 节点列表', obj)
      this.clients = {}
      for(let i in obj){
        this.setClient(obj[i])
      }
    })
    socket.on('new node', (node) => {
      console.log('[Node] 新节点#' + node.id.key, node)
      toastr["success"]('[Node] 新节点#' + node.id.key)
      this.setClient(node)
    })
    socket.on('delete node', (key) => {
      console.log('[Node] 删除节点#' + key)
      toastr["info"]('[Node] 删除节点#' + key)
      this.deleteClient(key)
    })
    socket.on('update node', (node) => {
      console.log('[Node] 更新节点#' + node.id.key)
      this.setClient(node)
      // this.deleteClient(key)
    })
    socket.on('configs', (obj)=> {
      console.log('[Config] ',obj)
      this.maxAge = obj.maxAge
    })
    socket.on('log', (d) => {
      this.messages.unshift(d)
      if (this.messages.length > 50) {
        this.messages.pop()
      }
    })
    socket.on('data monitor', (d) => {
      this.monitors.unshift(d)
      console.log(d)
      if (this.monitors.length > 50) {
        this.monitors.pop()
      }
    })
    socket.on('quene stat', (d) => {
      this.quene = d
    })
  },
  components: {
    StatPane,
    Client,
    Log,
    DataMonitor,
    Quene
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

</style>
