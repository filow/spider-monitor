<template>
<div>
  <div class="scroll">
    <!--   事件日志   -->
    <table class="table">
      <th width="100">时间</th>
      <th width="100">节点名称</th>
      <th>数据</th>
      <tr v-for="m in monitors">
        <td>{{m.time | onlyTime}}</td>
        <td>
          <span class="label label-default">{{m.node_id}}</span>
        </td>
        <td>{{m.message | json}}</td>
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
    monitors: Array
  },
  filters: {
    onlyTime(val) {
      let t = new Date(val)
      return `${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`
    },
    json(val) {
      return JSON.stringify(val)
    }
  }
}
</script>
