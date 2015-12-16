<template>
  <div class="cpu_wrapper">
    <div class="cpu_progress">
      <div class="cpu_progress_bar" :style="{height: value + '%', backgroundColor: color}">
        <div class="value">{{value}}</div>
      </div>

    </div>
    <span>{{text}}</span>
  </div>

</template>
<style lang="sass">
.cpu_progress {
  position: relative;
  width: 60px;
  height: 160px;
  background-color: #EEE;
  margin-bottom: 5px;
  .cpu_progress_bar {
    position: absolute;
    bottom: 0;
    width: 100%;
    transition: height 1s ease;
  }

}
div.value {
  margin-top: -20px;
}
.cpu_wrapper {
  text-align: center;
  width: 70px;
  margin: 5px 10px;
}
</style>
<script>
export default {
  props: {
    color: {
      type: String,
      default: "#1ABB94"
    },
    value: {
      type: Number,
      default: 0,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  data () {
    return {

    }
  },
  ready() {



  }
}
</script>
