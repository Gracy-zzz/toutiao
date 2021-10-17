<template>
  <div class="login-container">
<!--    导航栏-->
    <van-nav-bar
      class="app-nav-bar"
      title="登录 / 注册"
      left-arrow
      @click-left="$router.back()"
    />
    <!--    /导航栏-->
<!--    登录表单-->
<!--    基于vant的表单验证-->
<!--    1.使用van-form组件包裹所有的表单项van-field-->
<!--    2.给van-form绑定submit事件-->
<!--    给单表单提交的时候触发submit事件-->
<!--提示：只有表单验证通过，它才会调用submit-->
<!--    3.使用 Field 的 rules 属性定义校验规则。-->
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFailed"
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        name="mobile"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        name="code"
        :rules="formRules.code"
      >
      <template #button>
        <van-button
          class="send-btn"
          size="small"
          round
          @click.prevent="onSendSms"
        >发送验证码</van-button>
      </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          type="info"
          block
          @click="onLogin"
        >登录
        </van-button>
      </div>
    </van-form>
    <!--    /登录表单-->
  </div>
</template>

<script>
// 2.封装请求方法
import { login, sendSms } from '../../api/user'
// 方法一：需要import
// import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        // 手机号
        mobile: '',
        // 验证码
        code: ''
      },
      formRules: {
        mobile: [
          { required: true, message: '请填写手机号码' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号格式错误' }
        ],
        code: [
          { required: true, message: '请填写验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  computed () {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLogin () {
      // 方法一：需要这样前面import才可以用
      // Toast.loading({
      // 方法二：不需要import，直接用
      this.$toast.loading({
        // 提示文本
        message: '登录中...',
        // 禁止背景点击
        forbidClick: true,
        // 展示时长(ms),值为0时，toast不会消失
        duration: 0
      })
      // 1.找到数据接口
      // 2.封装请求方法
      // 3.请求调用登录
      try {
        const res = await login(this.user)
        // 4.处理响应结果
        console.log(res)
        this.$toast.success('登录成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败，手机号或者验证码错误')
      }
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          // 提示信息
          message: error.errors[0].message,
          // 防止手机键盘太高看不到提示信息
          position: 'top'
        })
      }
    },
    async onSendSms () {
      try {
        await this.$refs['login-form'].validate('mobile')
        // 验证通过，请求发送验证码
        const res = await sendSms(this.user.mobile)
        console.log(res)
      } catch (err) {
        this.$toast({
          // 提示信息
          message: err.message,
          // 防止手机键盘太高看不到提示信息
          position: 'top'
        })
      }
      // this.$refs['login-form'].validate('mobile').then(data => {
      //   console.log(data)
      // })
      // 校验手机号码
      // 验证通过->请求发送验证码->用户接收短信->输入验证码->请求登录
      // 请求发送验证码->隐藏发送按钮，显示倒计时
      // 倒计时结束->隐藏倒计时，显示发送按钮
    }
  }
}
</script>

<style scoped lang="less">
.login-container{
  .send-btn{
    width: 80px;
    height: 23px;
    background-color: #ededed;
    font-size: 11px;
    color: #666666;
  }
  .login-btn-wrap{
    padding: 26px 16px;
    .login-btn{
      background-color: #6db4fb;
      border: none;
      .van-button__text{
        font-size: 15px;
      }
    }
  }
}
</style>
