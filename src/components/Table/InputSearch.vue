<template>
  <div class="wrapper">
    <span class="title">{{title}}：</span>
    <el-input @keyup.native.enter="handlerSearch" style="width:250px;" :placeholder="placeholder" v-model="str" size="mini">
      <el-button @click="handlerSearch" slot="append" icon="el-icon-search"></el-button>
    </el-input>
  </div>
</template>

<script>
export default {
  name: 'InputSearch',
  model: {
    prop: "value",
    event: "update"
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      lastTime: null
    }
  },
  computed: {
    str: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('update', value)
      }
    }
  },
  methods: {
    handlerSearch () {
      let _nowTime = + new Date()
      if (_nowTime - this.lastTime > 1000 || !this.lastTime) {
        this.$emit('search', this.str)
        this.lastTime = _nowTime
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper{
  display: table-cell;
  .title{
    color: #8dabc4;
  }
}
</style>