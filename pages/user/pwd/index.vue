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
        修改密码
      </h1>
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
        修改
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      loading: false,
      form: {
        newPassword: '',
        newPasswords: ''
      },
      passwordShow: false,
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
    }
  },
  methods: {
    changePassword () {
      const valid = this.$refs.form.validate()
      if (valid) {
        this.loading = true
        this.$store.dispatch('auth/changePassword', this.form).then(() => {
          this.$toast.show('修改成功请重新登录')
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
      title: '修改密码'
    }
  }
}
</script>

<style>

</style>
