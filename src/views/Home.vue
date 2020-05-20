<template>
  <el-container>
    <el-aside width="auto" :style="{'min-height':asideHeight}">
      <side-bar :isCollapse="isCollapse"/>
    </el-aside>
    <el-container id="content-container">
      <el-header :style="{height:'auto'}">
        <!-- Topbar -->
        <top-bar @togger="toggerCollapse"/>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideBar from '@/components/Layout/SideBar'
import TopBar from '@/components/Layout/TopBar'

export default {
  components: {
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
