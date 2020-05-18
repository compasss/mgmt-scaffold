<template>
  <div id="app">
    <el-container>
      <el-aside :style="{width:'auto', 'min-height':asideHeight}">
        <side-bar :isCollapse="isCollapse"/>
      </el-aside>
      <el-container id="content-container">
        <el-header :style="{height:'auto'}">
          <!-- Topbar -->
          <top-bar @togger="toggerCollapse"/>
        </el-header>
        <el-main>
          <div class="main-container">
            <router-view />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { Container, Aside, Header, Main } from 'element-ui';
import SideBar from '@/components/Layout/SideBar'
import TopBar from '@/components/Layout/TopBar'

export default {
  components: {
    'ElContainer': Container,
    'ElAside': Aside,
    'ElHeader': Header,
    'ElMain': Main,
    'SideBar': SideBar,
    'TopBar': TopBar,
  },
  data () {
    return {
      isCollapse: false,
      asideHeight: '900px'
    }
  },
  mounted () {
    let height = document.documentElement.clientHeight;
    this.asideHeight = height + 'px';
    this.initGlobalEvent()
    this.getSideBar()
  },
  methods: {
    toggerCollapse (bol) {
      this.isCollapse = bol;
    },
    initGlobalEvent() {
      // 绑定全局事件
      window.addEventListener('storage', (e) => {
        if (e.key === 'authStat' && e.newValue === 'expires') {
          // 判断token是否失效
          window.location.reload();
        }
      })
    },
    getSideBar() {
      this.$store.dispatch('layout/getSideBar')
    }
  }
}
</script>

<style lang="scss">
html, body{
  min-height: 100%;
  margin: 0;
}
</style>
