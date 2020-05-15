<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <button @click="sendHttp">发送请求</button>
    <router-view/>
  </div>
</template>

<script>
import { fetch } from '@/request/index';
export default {
  methods: {
    sendHttp () {
      fetch('/yjk-mgmt/video-dx/list?applySiteId=1&startAt=2020-04-14&endAt=2020-05-14&page=1&pageSize=10').then(res => {
        console.log(res)
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
