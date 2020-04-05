<template>
  <div class="hm-admin-login">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="form.username"
          placeholder="手机号"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          placeholder="密码"
          show-password
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^1\d{4,10}$/,
            message: "请输入正确的格式",
            trigger: ["blur", "change"]
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: ["blur", "change"]
          },
          {
            pattern: /^\d{3,6}$/,
            message: "请输入正确的格式",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
        await this.$refs.form.validate();
        let res = await this.$axios.post(`/login`, this.form);
        console.log(res.data);
        let { statusCode, message, data } = res.data;
        if (statusCode === 200) {
          let token = localStorage.setItem("token", data.token);
          let user = localStorage.setItem("user", JSON.stringify(data.user));
          this.$router.push("/home");
          this.$message(message);
        } else {
          this.$message.error(message);
        }
      } catch (e) {
        console.log(e);
      }
    },
    resetForm() {
      this.$refs.form.resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.hm-admin-login {
  .el-form {
    width: 400px;
    margin: 250px auto;
    background-color: #f0f0f0;
    padding: 18px 18px 5px 5px;
    box-shadow: 2px 2px 2px #ccc;
    .el-button {
      &:first-child {
        margin-right: 80px;
      }
    }
  }
}
</style>
