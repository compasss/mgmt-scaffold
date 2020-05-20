<template>
  <canvas id="verification-code" class="verification-code" @click="changeCode"></canvas>
</template>

<script>
export default {
  data () {
    return {
      code: ''
    }
  },
  created () {
    this.$nextTick(() => {
      this.createCode()
    })
  },
  methods: {
    randomColor(min, max) {
      // 生成一个随机色
      let r = this.randomNum(min, max);
      let g = this.randomNum(min, max);
      let b = this.randomNum(min, max);
      return 'rgb(' + r + ',' + g + ',' + b + ')';
    },
    randomNum(min, max) {
      // 生成一个随机数
      return Math.floor(Math.random() * (max - min) + min);
    },
    createCode() {
      // 生成随机码
      this.code = '';
      //验证码的长度
      let codeLength = 4;
      const checkCode = document.getElementById('verification-code');
      const codeChars = [];
      // 验证码所需数字和字母的集合
      for (let i = 0; i < 26; i++) {
        if (i < 10) {
          codeChars.push(String.fromCharCode(i + 48));
        }
        codeChars.push(String.fromCharCode(i + 97));
        codeChars.push(String.fromCharCode(i + 65));
      }
      // 组合数字和字母
      for (let i = 0; i < codeLength; i++) {
        let charNum = Math.floor(Math.random() * 52);
        this.code += codeChars[charNum];
      }
      if (checkCode) {
        this.drawVerify(checkCode, this.code);
      }
    },
    drawVerify(cEle, value) {
      // 绘制验证码图形
      const [ctx, width, height] = [cEle.getContext('2d'), cEle.width, cEle.height];

      // 清空画布
      ctx.clearRect(0, 0, width, height);
      // 绘制背景色
      ctx.fillStyle = this.randomColor(180, 240);
      ctx.fillRect(0, 0, width, height);
      // 填充字体
      ctx.font = '80px Arial';
      ctx.fillStyle = this.randomColor(50, 160);
      ctx.fillText(value, 50, 100);
      // 绘制干扰线
      for (var i = 0; i < 2; i++) {
        ctx.strokeStyle = this.randomColor(40, 180);
        ctx.beginPath();
        ctx.moveTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.lineTo(this.randomNum(0, width), this.randomNum(0, height));
        ctx.stroke();
      }
      // 绘制干扰点
      for (var i = 0; i < 30; i++) {
        ctx.fillStyle = this.randomColor(0, 255);
        ctx.beginPath();
        ctx.arc(this.randomNum(0, width), this.randomNum(0, height), 1, 0, 2 * Math.PI);
        ctx.fill();
      }
    },
    validateCode(value) {
      // 验证
      if (value.toUpperCase() == this.code.toUpperCase()) {
        return true
      } else {
        return false
      }
    },
    changeCode () {
      this.createCode()
    }
  }
}
</script>

<style lang="scss" scoped>
.verification-code{
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>