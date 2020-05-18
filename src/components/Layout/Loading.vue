<template>
  <div></div>
</template>

<script>
export default {
  data () {
    return {
      loadingInstance: null
    }
  },
  methods: {
    start () {
      this.loadingInstance = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      console.log('loading')
    },
    finish () {
      try {
        setTimeout(() => {
          // this.loadingInstance.close();
        }, 300)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
