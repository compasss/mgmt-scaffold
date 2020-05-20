<template>
  <el-dialog class="reset-dialog"
    top="20vh"
    width="450px"
    :title="'密码重置'"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    @close="close"
    center>
    <template slot="title">
      <span class="reset-title">密码重置</span>
    </template>
    <div class="block-1" v-show="block1Show">
      <el-form class="reset-form" :model="resetForm" ref="resetForm" :rules="formRules">
        <el-form-item class="login-form-item" prop="phone">
          <el-input v-model="resetForm.phone" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item class="login-form-item" prop="figureCode">
          <el-input class="reset-input" v-model="resetForm.figureCode" placeholder="图形验证码">
            <template slot="append">
              <div class="ver-code-canvas"><verification-code ref="verCode"></verification-code></div>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="login-form-item" prop="code">
          <el-input class="reset-input" v-model="resetForm.code" placeholder="手机验证码">
            <template slot="append">
              <button :disabled="(codeSending||!figureCodeAndPhone)" @click="sendCode" type="button" class="ver-code-btn">{{sendCodeTxt}}</button>
            </template>
          </el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" class="next-step-btn" @click="nextStep" :loading="nextStepLoading">下一步</el-button>
    </div>
    <div class="block-2" v-show="block2Show">
      <el-form class="reset-form" :model="resetForm2" ref="resetForm2" :rules="formRules2">
        <div class="input-g">
          <!-- <img class="input-g-icon" src="~/assets/img/bg_account_number.png" /> -->
          <el-form-item class="login-form-item" prop="prenewpass">
            <el-input v-model="resetForm2.prenewpass" placeholder="新密码（6~16个字符，区分大小写）"></el-input>
          </el-form-item>
        </div>
        <div class="input-g">
          <!-- <img class="input-g-icon" src="~/assets/img/bg_graphical.png" /> -->
          <el-form-item class="login-form-item" prop="newpass">
            <el-input class="reset-input" v-model="resetForm2.newpass" placeholder="重复密码（6~16个字符区分大小写）"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <el-button type="success" class="next-step-btn" @click="resetConfirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import VerificationCode from './VerificationCode.vue'
export default {
  components: { VerificationCode },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    const self = this;
    return {
      block1Show: true,
      block2Show: false,
      codeSending: false,
      figCodeValidate: false,
      codeSendingSeconds: 60,
      nextStepLoading: false,
      resetForm: {
        phone: "",
        figureCode: "",
        code: ""
      },
      resetForm2: {
        prenewpass: "",
        newpass: ""
      },
      formRules: {
        phone: [{
          required: true,
          message: '必填项'
        }, {
          pattern: /^1[3|4|5|6|7|8|9][0-9]{9}?$/,
          message: '手机号码格式错误',
          trigger: 'blur'
        }],
        figureCode: [{
          required: true,
          message: '必填项'
        }, {
          trigger: 'blur',
          validator: function(rule, value, callback) {
            if (value.length != 4) {
              callback(['图形验证码格式错误'])
            } else {
              callback();
            }
          }
        }, {
          trigger: 'change',
          validator: function(rule, value, callback) {
            if (value.length > 4) {
              callback(['图形验证码格式错误'])
            } else if (value.length == 4) {
              if (self.$refs.verCode.validateCode(self.resetForm.figureCode)) {
                self.figCodeValidate = true;
                callback();
              } else {
                self.figCodeValidate = false;
                callback(['图形验证码验证失败'])
              }
            } else {
              callback();
            }
          }
        }],
        code: [{
          required: true,
          message: '必填项'
        }],
      },
      formRules2: {
        prenewpass: [{
          required: true,
          message: '必填项'
        }, {
          max: 16,
          message: '密码不得超过16位'
        }, {
          trigger: "blur",
          min: 6,
          message: '密码不得少于6位'
        }, ],
        newpass: [{
          required: true,
          message: '必填项'
        }, {
          max: 16,
          message: '密码不得超过16位'
        }, {
          min: 6,
          trigger: "blur",
          message: '密码不得少于6位'
        }, {
          trigger: "blur",
          validator: function(rule, value, callback) {
            if (value != self.resetForm2.prenewpass) {
              callback(['密码不一致'])
            } else {
              callback();
            }
          }
        }]
      }
    }
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set(value) {
        this.$emit('update:visible', value)
      }
    },
    sendCodeTxt() {
      return this.codeSending ? this.codeSendingTxt : "发送验证码"
    },
    codeSendingTxt() {
      return "" + this.codeSendingSeconds + "s后重新发送";
    },
    figureCodeAndPhone() {
      let self = this;
      if (self.resetForm.phone && /^1[3|4|5|6|7|8|9][0-9]{9}?$/.test(self.resetForm.phone) && self.figCodeValidate) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    sendCode() {
      let self = this;
      this.$axios({
        api: 'mockSendSms',
        method: 'POST',
        data: JSON.stringify({
          appId: 'yjk_ezhan',
          phone: self.resetForm.phone
        })
      }).then(res => {
        self.$message({
          type: "success",
          message: '验证码发送成功',
        });
        action();
      }).catch(e => {
        let errorData = e.response.data || {}
        let errTxt = '';
        if (errorData.error_code.toString() === '160038') {
          errTxt = '短信发送过于频繁，请稍后重试。';
        } else if (errorData.error_code.toString() === '160039' || errorData.error_code.toString() === '160040' || errorData.error_code.toString() === '160041') {
          errTxt = '验证码发送超过限制，请明天重试。';
        } else {
          errTxt = errorData.error_message || '获取验证码失败';
        }
        self.$message({
          type: "error",
          message: errTxt
        });
      })

      function action() {
        self.codeSendingSeconds = 60;
        self.codeSending = true;
        clearInterval(self.codeInterval)
        self.codeInterval = setInterval(function() {
          self.codeSendingSeconds--;
          if (self.codeSendingSeconds == 0) {
            clearInterval(self.codeInterval)
            self.codeSending = false;
          }
        }, 1000)
      }
    },
    nextStep() {
      // 重置密码下一步
      const self = this;
      self.$refs['resetForm'].validate((valid) => {
        if (valid) {
          self.nextStepLoading = true
          self.$axios({
            api: 'mockVerifySms',
            method: 'POST',
            data: JSON.stringify({
              'appId': "yjk_ezhan",
              'code': self.resetForm.code,
              'phone': self.resetForm.phone
            })
          }).then(res => {
            self.block1Show = false;
            setTimeout(function() {
              self.block2Show = true;
            }, 200)
          }).catch(e => {
            self.$message({
              type: "error",
              message: e.response.data.error_message,
            });
          }).finally(() => {
            self.nextStepLoading = false;
          })
        }
      })
    },
    resetConfirm() {
      // 重置密码最后一步
      const self = this;
      self.$refs['resetForm2'].validate((valid) => {
        if (valid) {
          self.$axios({
            api: 'mockResetPassword',
            method: 'PUT',
            data: JSON.stringify({
              'newPassword': self.resetForm2.newpass,
              'phone': self.resetForm.phone,
              'type': 'op'
            })
          }).then(res => {
            self.$message({
              type: "success",
              message: '重置成功',
            });
            setTimeout(function() {
              self.dialogVisible = false;
            }, 1000)
          }).catch(e => {
            self.$message({
              type: "error",
              message: e.response.data.error_message,
            });
          })
        }
      })
    },
    close() {
      this.block1Show = true
      this.block2Show = false
      this.codeSending = false
      this.figCodeValidate = false
      this.nextStepLoading = false
      this.resetForm = {
        phone: "",
        figureCode: "",
        code: ""
      }
      this.resetForm2 = {
        prenewpass: "",
        newpass: ""
      }
      this.$refs['resetForm'].resetFields()
      this.$refs['resetForm2'].resetFields()
      if (this.codeInterval) {
        clearInterval(this.codeInterval)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.reset-title{
  color: #14ae67;
  font-size: 22px;
}
.block-1{
  padding: 0 25px;
  .next-step-btn{
    width: 100%;
  }
}
.block-2{
  padding: 0 25px;
  .next-step-btn{
    width: 100%;
  }
}
.reset-form{
  border-bottom:1px solid transparent;
  .ver-code-canvas{
    width: 120px;
    height: 38px;
  }
  .ver-code-btn{
    width: 120px;
    height: 38px;
    cursor: pointer;
    border: 0;
    color: #FFF;
    background: #14ae67;
    &:disabled{
      background: #e0e0e0;
    }
    &:active{
      border: 0;
    }
  }
}
</style>