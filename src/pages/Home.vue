<template>
  <div class="hm-admin-home">
    <el-container>
      <el-aside width="200px">
        <div class="logo">黑马头条</div>
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">文章列表</span>
          </el-menu-item>
          <el-menu-item index="/release">
            <i class="el-icon-s-tools"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <img :src="$axios.defaults.baseURL + info.head_img" alt="" />
          <span>{{ info.nickname }}</span>
          <a href="javascript:;" @click="logout">退出</a>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() {
    let user = JSON.parse(localStorage.getItem("user"));
    this.info = user;
  },
  data() {
    return {
      info: []
    };
  },
  methods: {
    async logout() {
      try {
        await this.$confirm("是否要退出管理", "提示", {
          type: "wanring"
        });
        localStorage.removeItem("token");
        this.$router.push("/login");
      } catch (e) {}
    }
  }
};
</script>

<style lang="less" scoped>
.hm-admin-home {
  position: absolute;
  width: 100%;
  height: 100%;
  .el-container {
    height: 100%;
  }
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  display: flex;
  justify-content: flex-end;
  font-size: 16px;
  line-height: 60px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: block;
    margin-top: 10px;
  }
  span {
    margin: 0 10px;
  }
  a {
    text-decoration: none;
  }
}
.el-aside {
  background-color: #545c64;
  color: #333;
  .logo {
    height: 60px;
    line-height: 60px;
    background-color: #333;
    text-align: center;
    font-size: 24px;
    color: #fff;
    margin-bottom: 20px;
  }
}
</style>
