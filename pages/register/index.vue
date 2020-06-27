<template>
  <v-card>
    <h1 class="text-center">
      注册账号
    </h1>
    <v-form
      ref="form"
      v-model="valid"
      class="mx-auto pa-3"
      style="max-width:500px"
      lazy-validation
    >
      <v-text-field
        v-model="registerForm.email"
        append-icon="mdi-email"
        :rules="emailRules"
        label="邮箱"
        required
      />
      <v-text-field
        v-model="registerForm.nickname"
        append-icon="mdi-account"
        :rules="nicknameRules"
        label="昵称"
        required
      />
      <v-text-field
        v-model="registerForm.password"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        :rules="passwordRules"
        label="密码"
        required
        @click:append="passwordShow = !passwordShow"
      />
      <v-text-field
        v-model="registerForm.passwords"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        :rules="passwordsRules"
        label="再次输入密码"
        required
        @click:append="passwordShow = !passwordShow"
      />
      <div class="d-flex">
        <v-text-field
          v-model="registerForm.captcha"
          class="mr-2"
          append-icon="mdi-fencing"
          :rules="captchaRules"
          label="验证码"
          required
          @click:append="passwordShow = !passwordShow"
        />
        <v-img
          :src="captchaUrl"
          height="50"
          contain
          @click="captchaUrl = '/api/users/captcha?' + new Date()"
        />
      </div>
      <v-btn
        color="success"
        class="mr-4"
        @click="register"
      >
        注册
      </v-btn>
      <v-subheader class="my-3">
        已有账号?立即
        <v-btn text nuxt to="/login" color="pink">
          登录
        </v-btn>
      </v-subheader>
    </v-form>
  </v-card>
</template>

<script>
import { register } from '@/api/user'
export default {
  data: () => ({
    valid: true,
    loading: false,
    captchaUrl: '/api/users/captcha?' + new Date(),
    registerForm: {
      email: undefined,
      nickname: undefined,
      password: undefined,
      captcha: undefined,
      passwords: undefined
    },
    passwordShow: false,
    emailRules: [
      v => !!v || '登录邮箱不能为空',
      v => /.+@.+\..+/.test(v) || '不是正确的邮箱'
    ],
    nicknameRules: [
      v => !!v || '昵称不能为空',
      v => (v && v.length >= 3 && v.length <= 8) || '昵称不能少于3位大于8位'
    ],
    passwordRules: [
      v => !!v || '密码不能为空',
      v => (v && v.length >= 7 && v.length <= 20) || '密码不能少于7大于20位'
    ],
    captchaRules: [
      v => !!v || '验证码不能为空'
    ]
  }),
  computed: {
    passwordsRules () {
      const rules = []
      const rule =
            v => (v === this.registerForm.password) || '两次输入密码不一致'
      rules.push(rule)
      return rules
    }
  },
  methods: {
    async register () {
      const valid = this.$refs.form.validate()
      if (valid) {
        this.loading = true
        const { code } = await register(this.$axios, this.registerForm)
        if (code === 200) {
          this.$toasted.success('注册成功！')
          const loginForm = {
            username: this.registerForm.email,
            password: this.registerForm.password
          }
          await this.$store.dispatch('auth/login', loginForm)
          if (window.history.length <= 1) {
            this.$router.push({ path: '/' })
          } else {
            this.$router.go(-1)
          }
        }
        this.loading = false
      }
    }
  },
  head () {
    return {
      title: '注册'
    }
  }
}
</script>

<style>

</style>
