<template>
<div>
  <div class="scroll">
    <!--   事件日志   -->
    <table class="table">
      <tr v-for="m in quene">
        <td>{{m}}</td>
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
    quene: Array
  },
}
</script>
