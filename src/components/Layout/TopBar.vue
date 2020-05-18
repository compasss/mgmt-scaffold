<template>
  <div class="top-bar">
    <el-button type="success" class="bar-icon" size="mini" @click="toggerCollapse">
      <svg t="1574048466948" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1262" width="14" height="14"><path d="M893.1 448.2h-763c-35.2 0-63.9 28.8-63.9 63.9 0 35.2 28.8 63.9 63.9 63.9h763c35.2 0 63.9-28.8 63.9-63.9 0-35.1-28.8-63.9-63.9-63.9zM892.8 735.9h-763c-35.2 0-63.9 28.8-63.9 63.9 0 35.2 28.8 63.9 63.9 63.9h763c35.2 0 63.9-28.8 63.9-63.9 0-35.2-28.7-63.9-63.9-63.9zM893.8 163.4h-763c-35.2 0-63.9 28.8-63.9 63.9 0 35.2 28.8 63.9 63.9 63.9h763c35.2 0 63.9-28.8 63.9-63.9 0-35.2-28.8-63.9-63.9-63.9z" fill="#ffffff" p-id="1263"></path></svg>
    </el-button>
    <el-breadcrumb separator="/" class="m-l-10">
      <el-breadcrumb-item v-for="(item, index) in breadcrumbArr" :key="index">{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="user-area">
      <p class="username">{{username}}</p>
      <el-button @click="logout" class="signout-btn" type="text">
        <span>退出</span>
        <i class="iconfont eye-sign-out"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import { sidebarConfigArr } from '@/config/layerSideBar.js'

import { Button, Breadcrumb, BreadcrumbItem } from 'element-ui'

export default {
  components: { 
    'el-button': Button,
    'el-breadcrumb': Breadcrumb,
    'el-breadcrumb-item': BreadcrumbItem
  },
  data () {
    return {
      isCollapse: false,
      breadcrumbArr: []
    }
  },
  computed: {
    username: {
      get () {
        return ''
      }
    }
  },
  mounted () {
    // this.breadcrumbArr = this.showBreadcrumb(this.$route.name)
  },
  watch: {
    '$route' (to, from) {
      // route change
      // this.breadcrumbArr = this.showBreadcrumb(to.name);
    }
  },
  methods: {
    toggerCollapse () {
      this.isCollapse = !this.isCollapse;
      this.$emit('togger', this.isCollapse);
    },
    logout () {
      // 退出登录
      this.$confirm('是否要退出？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios({
          api: 'logout',
          method: 'POST'
        }).then(res => {
          this.$cookies.remove('x-auth-token', {
            path: '/'
          })
          if (process.env.env === 'production') {
            location.href = location.origin + '/auth/login'
          } else {
            location.href = location.origin + '/yjk-web/auth/login'
          }
        }).catch(e => {
          this.$message({
            msg: '退出失败，请稍后再试',
            type: 'error'
          })
        })
      }).catch(() => {
        console.log('cancle signout')         
      });
    },
    showBreadcrumb (name) {
      let routePath = [];
      let breadcrumb = [];
      try {
        routePath = name.split('-')
      } catch (error) {
        console.log(error)
      }
      this.loopSidebar(routePath, sidebarConfigArr, breadcrumb);
      return breadcrumb;
    },
    loopSidebar (routePath, data, breadcrumb) {
      for (const item of data) {
        if (item.path === `/${routePath[0]}`) {
          breadcrumb.push(item.title)
          routePath.shift();
          if (item.child && item.child.length > 0) {
            this.loopSidebar(routePath, item.child, breadcrumb)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.top-bar {
  display: flex;
  align-items: center;
  background: #fff;
  padding: 10px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  box-sizing: border-box;
}

.bar-icon {
  font-size: 14px;
  padding: 6px 12px;
  .el-icon-s-fold {
    font-size: 28px;
  }
}
.user-area{
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
}
.signout-btn {
  color: #14ae67;
  margin-left: 20px;
  padding: 0;
  .iconfont{
    font-size: 14px;
    padding-left: 5px;
  }
  &:hover{
    opacity: 0.7;
  }
}

</style>