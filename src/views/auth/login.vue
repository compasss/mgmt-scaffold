<template>
  <div class="login-page">
    <div class="login-block">
      <div class="login-title">
        <img src="https://assets.ieyecloud.com/imgs/eyebiz/bg-logo.png">
        <span>后台管理系统</span>
      </div>
      <div class="login-body">
        <el-form v-model="loginForm" onsubmit="return false;" ref="loginForm">
          <el-form-item class="login-form-item">
            <el-input @keydown.enter.native="submitLogin" :autofocus="true" clearable autocorrect="off" autocapitalize="off" autocomplete="off" v-model="loginForm.username" placeholder="用户名">
              <template slot="prepend">
                <img src="https://assets.ieyecloud.com/imgs/eyebiz/bg-number.png" alt="username">
              </template>
            </el-input>
          </el-form-item>
          <el-form-item class="login-form-item">
            <el-input @keydown.enter.native="submitLogin" clearable autocorrect="off" autocapitalize="off" autocomplete="off" v-model="loginForm.password" type="password" placeholder="密码">
              <template slot="prepend">
                <img src="https://assets.ieyecloud.com/imgs/eyebiz/bg-password.png" alt="password">
              </template>
            </el-input>
          </el-form-item>
          <el-button type="success" @click="submitLogin" :loading="loginLoading" :disabled="loginDisabled" class="login-submit-btn">登录</el-button>
        </el-form>
        <div class="forget-block">
          <span>忘记密码？<span class="login-reset-btn" @click="showDialog">点我重置</span></span>
        </div>
      </div>
    </div>
    <reset-password :visible.sync="visible"></reset-password>
  </div>
</template>

<script>
import ResetPassword from './ResetPassword';

export default {
  components: { ResetPassword },
  data () {
    return {
      loginForm: {
        username: "",
        password: ""
      },
      visible: false,
      loginLoading: false
    }
  },
  computed: {
    loginDisabled() {
      return !(this.loginForm.username.length && this.loginForm.password.length);
    }
  },
  mounted() {
    Cookies.remove('x-auth-token');
  },
  methods: {
    submitLogin() {
      let self = this;
      this.loginLoading = true;
      this.$axios({
        api: 'mockLogin',
        method: 'POST',
        headers: {
          Authorization: 'Basic Yng6Yng=',
          'x-auth-token': ''
        },
        data: JSON.stringify({
          username: self.loginForm.username,
          password: self.loginForm.password,
          type: "op"
        })
      }).then(res => {
        let xAuthToken = res.access_token
        self.$axios.config.headers['x-auth-token'] = xAuthToken;
        localStorage.setItem('x-auth-token', xAuthToken)
        this.$router.push({
          path: '/'
        })
      }).catch(e => {
        this.$message({
          message: e.response.data.error_message || '登录失败，请稍后重试',
          type: 'error'
        })
        this.loginLoading = false;
      })
    },
    showDialog() {
      this.visible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page{
  position: relative;
  width: 100%;
  min-width: 800px;
  height: 100%;
  background-image: url("https://assets.ieyecloud.com/imgs/common/bg-chart.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.login-block{
  position: absolute;
  right: 300px;
  top: 50%;
  transform: translateY(-50%);
  width: 340px;
  background-color: #ebebeb;
  border-radius: 6px;
  overflow: hidden;
}
.login-title{
  display: flex;
  align-items: center;
  height: 106px;
  background-color: #14ae67;
  color: #fff;
  font-size: 18px;
  img{
    margin-left: 30px;
    margin-right: 20px;
  }
}
.login-body{
  padding: 30px;
  .input-g{
    display: flex;
    margin-bottom: 20px;
    border-radius: 4px;
    overflow: hidden;
  }
  .form-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 100%;
    background-color: #14ae67;
  }
  .login-submit-btn{
    width: 100%;
  }
  .forget-block{
    margin-top: 30px;
    text-align: right;
  }
  .login-reset-btn{
    color: #14ae67;
    cursor: pointer;
    &:hover{
      opacity: 0.7;
    }
  }
}
</style>