<template>
<div>
  <span>切换Log Level:</span>
  <label>
    <input type="checkbox" class="log_level" v-model="log_level" value="0"> <span class="label label-success">Success</span>
  </label>
  <label>
    <input type="checkbox" class="log_level" v-model="log_level" value="1"> <span class="label label-info">Info</span>
  </label>
  <label>
    <input type="checkbox" class="log_level" v-model="log_level" value="3"> <span class="label label-danger">Danger</span>
  </label>

  <div class="scroll">
    <!--   事件日志   -->
    <table class="table">
      <th width="100">时间</th>
      <th width="100">类型</th>
      <th>信息</th>
      <tr v-for="m in filted_messages">
        <td>{{m.time | onlyTime}}</td>
        <td>
          <span class="label label-{{m.type | intToText}}">{{m.type | intToText}}</span>
        </td>
        <td>{{m.message}}</td>
      </tr>
    </table>
  </div>
</div>


</template>
<style lang="sass">
div.scroll {
  max-height: 400px;
  overflow-y: scroll;
}
</style>
<script>
export default {
  props: {
    messages: Array
  },
  data () {
    return {
      log_level: ["0", "1", "3"],
      full_level: ["success", "info", "warning", "danger"],
    }
  },
  computed: {
    filted_messages(){
      let msg = []
      let levels = this.log_level
      this.messages.forEach((i) => {
        if (levels.indexOf(String(i.type)) > -1){
          msg.push(i)
        }
      })
      return msg
    }
  },
  filters: {
    onlyTime(val) {
      let t = new Date(val)
      return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
    },
    intToText(level) {
      return this.full_level[Number(level)]
    }
  }
}
</script>
