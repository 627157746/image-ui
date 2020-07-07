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
        登录
      </h1>
      <template v-if="error">
        <v-alert dense type="error">
          {{ error }}
        </v-alert>
      </template>
      <v-text-field
        v-model="loginForm.username"
        append-icon="mdi-email"
        :rules="emailRules"
        label="邮箱"
        required
      />
      <v-text-field
        v-model="loginForm.password"
        :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
        :type="passwordShow ? 'text' : 'password'"
        :rules="passwordRules"
        label="密码"
        required
        @click:append="passwordShow = !passwordShow"
      />
      <v-btn
        color="success"
        class="mr-4"
        :loading="loading"
        @click="login"
      >
        登录
      </v-btn>
      <v-btn text nuxt to="/user/forget" color="blue">
        忘记密码
      </v-btn>
      <v-subheader class="my-3">
        没有账号?立即
        <v-btn text nuxt to="/register" color="pink">
          注册
        </v-btn>
      </v-subheader>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      passwordShow: false,
      emailRules: [
        v => !!v || '登录邮箱不能为空',
        v => /.+@.+\..+/.test(v) || '不是正确的邮箱'
      ],
      passwordRules: [
        v => !!v || '密码不能为空',
        v => (v && v.length > 7) || '密码不能少于7位'
      ]
    }
  },
  computed: {
    error () {
      const error = this.$route.query.error
      return error ? '登录失效，请重新登录' : undefined
    }
  },
  methods: {
    login () {
      const valid = this.$refs.form.validate()
      if (valid) {
        this.loading = true
        this.$store.dispatch('auth/login', this.loginForm).then(() => {
          if (window.history.length <= 1) {
            this.$router.push({ path: '/' })
          } else {
            this.$router.go(-1)
          }
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      }
    }
  },
  head () {
    return {
      title: '登录'
    }
  }
}
</script>

<style>

</style>
