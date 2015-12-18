<template>
<div class="ibox">
  <div class="ibox-title">
    {{title}}
  </div>
  <div class="ibox-content">

    <div class="large-text">
       {{data | p2}} {{unit}}
    </div>
    <div :id="chart_id">{{line}}</div>
  </div>
</div>

</template>

<script>
export default {
  props: {
    title: String,
    refresh: Number,
    data: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: '#1ab394'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 10000
    }
  },
  watch: {
    // 监听data的变更
    refresh: function () {
      this.line.push(this.data)
      this.line.shift()
      this.updatingChart.change()
    }
  },
  data () {
    let chart_id = 'plot_' + Math.floor(Math.random() * 1000).toString(16)
    return {
      line: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      chart_id: chart_id,
      updatingChart: null
    }
  },
  ready() {
    this.updatingChart = $('#' + this.chart_id).peity('bar', {
      width: '100%',
      height: 40,
      fill: function(value, i, all) {
        if (value < this.min || value > this.max){
          return "#B52647"
        }else {
          var g = parseInt((i / all.length) * 200)
          return "rgb(26, " + g + ", 148)"
        }

      }.bind(this)
    })
  },
  filters: {
    p2(val) {
      return Math.floor(val*100)/100
    }
  }
}


</script>

<style lang="sass">
div.large-text {
  font-size: 33px;
  text-align: center;
  color: #1DA777;
  font-weight: 100;
}
</style>
