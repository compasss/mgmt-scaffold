<template>
  <el-menu
    class="el-menu-vertical"
    @select="handleSelect"
    :default-active="activeMenu"
    :default-openeds="openeds"
    :collapse="isCollapse"
    background-color="#273238"
    text-color="#828282"
    active-text-color="#FFFFFF">
    <div v-if="isCollapse" class="logo-cont logo-close">
      <img src="https://assets.ieyecloud.com/screening2/logo-white.png">
    </div>
    <div v-else class="logo-cont logo-open">
      <img src="https://assets.ieyecloud.com/screening2/logo.png">
    </div>
    <template v-for="(item, index) in sidebarConfig">
      <el-submenu :index="item.path" v-if="item.child" :key="index">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item v-for="(child, index2) in item.children" :key="index2" :index="item.path + child.path" :route="child">{{child.title}}</el-menu-item>
      </el-submenu>
      <el-menu-item :index="item.path" v-else :key="index">
        <i :class="item.icon"></i>
        <span slot="title">{{item.title}}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { sidebarConfigArr } from '@/config/layerSideBar.js'

import { Menu, Submenu, MenuItem } from 'element-ui'

export default {
  components: {
    'ElMenu': Menu,
    'ElSubmenu': Submenu,
    'ElMenuItem': MenuItem
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sideBarArr: {
      get () {
        return this.$store.state.layout.sideBarArr
      }
    }
  },
  data () {
    return {
      sidebarConfig: [],
      activeMenu: '/dashboard',
      // openeds: ['/doctor']
      openeds: []
    }
  },
  watch: {
    $route: {
      handler: function(val, oldVal){
        if (val.path) {
          this.activeMenu = val.path
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  created () {
    if (this.$route.path && this.$route.path.length > 1) {
      this.activeMenu = this.$route.path;
    }
    // this.showSideBar()
  },
  methods: {
    // showBar(item){
    //   //生产测试站点id: 23, 8542
    //   return item.title === '数据台' && (this.$store.state.siteInfo.id === 23 || this.$store.state.siteInfo.id === 8542)
    // },
    handleSelect(key, keyPath, item) {
      try {
        this.$router.push(key)
      } catch (error) {
        console.warn(error)
      }
    },
    hasPermission (str) {
      try {
        if (this.$store.state.permission.includes('*') || this.$store.state.permission.indexOf(str) !== -1) {
          return true
        }
      } catch (error) {
        console.warn(error)
      }
      return false
    },
    showSideBar () {
      // 菜单权限控制
      let configList = [];
      this.handlePermission(configList, sidebarConfigArr)
      this.sidebarConfig = configList;
    },
    handlePermission (configList, list) {
      for (const item of list) {
        if (item.permission) {
          if (!this.hasPermission(item.permission)) {
            return ;
          }
        }
        configList.push(item);
        if (item.child) {
          item.children = [];
          this.handlePermission(item.children, item.child)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-menu-vertical{
  height: 100%;
}
.logo-cont {
  width: 100%;
  display: flex;
  align-items: center;
  height: 50px;
  background-color: #14ae67;
  img{
    display: block;
    margin: 0 auto;
    height: 42px;
  }
}
</style>
