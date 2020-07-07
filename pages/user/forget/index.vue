<template>
  <v-card height="100%">
    <v-form
      ref="form"
      v-model="valid"
      class="mx-auto pa-3 pt-sm-12"
      style="max-width:500px"
      lazy-validation
    >
      <h1 class="text-center">
        忘记密码
      </h1>
      <v-text-field
        v-model="form.email"
        append-icon="mdi-email"
        :rules="emailRules"
        label="邮箱"
        required
      />
      <div class="d-flex">
        <v-text-field
          v-model="form.captcha"
          class="mr-2"
          append-icon="mdi-fencing"
          :rules="captchaRules"
          label="验证码"
          required
          @click:append="passwordShow = !passwordShow"
        />
        <v-btn :disabled="disable" class="mt-3" text @click="getCaptcha">
          {{ shwoText }}
        </v-btn>
      </div>
      <v-text-field
        v-model="form.newPassword"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        :rules="newPasswordRules"
        label="新密码"
        required
        @click:append="passwordShow = !passwordShow"
      />
      <v-text-field
        v-model="form.newPasswords"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        :rules="newPasswordsRules"
        label="再次输入新密码"
        required
        @click:append="passwordShow = !passwordShow"
      />
      <v-btn
        color="success"
        class="mr-4"
        :loading="loading"
        @click="changePassword"
      >
        确认
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { sendMail, forgetPassword } from '@/api/user'
export default {
  data () {
    return {
      valid: true,
      loading: false,
      timer: null,
      disable: false,
      count: null,
      form: {
        email: '',
        captcha: '',
        newPassword: '',
        newPasswords: ''
      },
      passwordShow: false,
      emailRules: [
        v => !!v || '邮箱不能为空',
        v => /.+@.+\..+/.test(v) || '不是正确的邮箱'
      ],
      captchaRules: [
        v => !!v || '验证码不能为空'
      ],
      newPasswordRules: [
        v => !!v || '密码不能为空',
        v => (v && v.length >= 7 && v.length <= 20) || '密码不能少于7大于20位'
      ]
    }
  },
  computed: {
    newPasswordsRules () {
      const rules = []
      const rule =
            v => (v === this.form.newPassword) || '两次输入密码不一致'
      rules.push(rule)
      return rules
    },
    shwoText () {
      if (this.count === 0 || this.count === null) {
        return '获取验证码'
      } else {
        return this.count + '秒后获取验证码'
      }
    }
  },
  methods: {
    getCaptcha () {
      if (/.+@.+\..+/.test(this.form.email)) {
        const time = 60
        if (!this.timer) {
          this.count = time
          this.disable = false
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= time) {
              this.count--
              this.disable = true
            } else {
              this.disable = false
              clearInterval(this.timer)
              this.timer = null
            }
          }, 1000)
        }
        sendMail(this.$axios, { email: this.form.email }).then((res) => {
          if (res.code === 200) {
            this.$toast.show('请到邮箱查看验证码,没有找到请在垃圾箱找找', { duration: 4000 })
          }
        })
      } else {
        this.$toast.show('请输入正确邮箱')
      }
    },
    changePassword () {
      const valid = this.$refs.form.validate()
      if (valid) {
        this.loading = true
        forgetPassword(this.$axios, this.form).then(() => {
          this.$toast.show('修改成功请登录')
          this.$router.replace({ path: '/login' })
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    }
  },
  head () {
    return {
      title: '忘记密码'
    }
  }
}
</script>

<style>

</style>
