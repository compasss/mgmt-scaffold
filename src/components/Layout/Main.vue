<style lang="less">
@import "~assets/css/base.less";
.my-main {
  position: relative;
  margin-bottom: 40px;
  .corner {
    height: 22px;
    width: 22px;
    display: block;
    background: #7dc391;
    position: absolute;
  }
  .border-bar-vertical {
    position: absolute;
    background: @ht3;
    width: 22px;
    height: 100%;
  }
  .border-bar-horizontal {
    position: absolute;
    background: @ht3;
    width: 100%;
    height: 22px;
  }
}
</style>
<template>
  <div class="my-main" :style="'min-height:'+minHeight+'px'">
    <div class="border-bar-vertical" style="left: 0px; top: 0px"></div>
    <div class="border-bar-vertical" style="right: 0px; top: 0px"></div>
    <div class="border-bar-horizontal" style="left: 0px; top: 0px"></div>
    <div v-show="mounted" class="border-bar-horizontal" style="left: 0px; bottom: 0px"></div>
    <span class="corner" style="left: 0px; top: 0px"></span>
    <span class="corner" style="right: 0px; top: 0px"></span>
    <span v-show="mounted" class="corner" style="left: 0px; bottom: 0px"></span>
    <span v-show="mounted" class="corner" style="right: 0px; bottom: 0px"></span>
    <slot></slot>
  </div>
</template>
<script>
import util from '~/utils/common'
export default {
  props: ['mounted'],
  components: {},
  data() {
    return {
      util: util,
      minHeight: 500,
    }
  },
  created() {},
  methods: {},
  mounted() {
    let self = this;
    self.minHeight = util.getViewSize().height - 132;
    util.windowResize(function() {
      self.minHeight = util.getViewSize().height - 132;
    })
  },
  computed: {}
}
</script>