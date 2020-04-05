<template>
  <div class="post-release">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>发布文章</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form :model="form" ref="form" label-width="100px" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
      <el-form-item label="栏目" prop="categories">
        <el-checkbox-group v-model="form.categories">
          <el-checkbox
            :label="item.id"
            v-for="item in tabList"
            :key="item.id"
            >{{ item.name }}</el-checkbox
          >
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="封面" prop="cover">
        <el-upload
          action="http://127.0.0.1:3000/upload"
          list-type="picture-card"
          :on-success="success"
          :headers="header"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="release">发布</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "",
        content: "",
        categories: [],
        cover: [],
        type: 1
      },
      rules: {
        title: [
          {
            required: true,
            message: "内容不能为空",
            trigger: ["blur", "change"]
          }
        ],
        content: [
          {
            required: true,
            message: "内容不能为空",
            trigger: ["blur", "change"]
          }
        ],
        categories: [
          {
            required: true,
            message: "请选择一个栏目",
            trigger: ["blur", "change"]
          }
        ],
        cover: [
          {
            required: true,
            message: "请上传封面",
            trigger: ["blur", "change"]
          }
        ]
      },
      tabList: [],
      header: {
        Authorization: localStorage.getItem("token")
      }
    };
  },
  async created() {
    let res = await this.$axios.get(`/category`);
    let { statusCode, data } = res.data;
    if (statusCode === 200) {
      this.tabList = data.filter(v => v.name !== "关注" && v.name !== "头条");
    }
  },
  methods: {
    success(res) {
      console.log(res);
      let { statusCode, data } = res;
      if (statusCode === 200) {
        this.$refs.form.clearValidate("cover");
        this.form.cover.push({
          id: data.id,
          url: data.url
        });
      }
    },
    async release() {
      try {
        await this.$refs.form.validate();
        //格式化数据
        let categories = this.form.categories.map(v => {
          return {
            id: v
          };
        });
        //提取视频链接
        let data = this.form;
        let div = document.createElement("div");
        div.innerHTML = this.form.content;
        data.content = div.innerText;
        let res = await this.$axios.post(`/post`, {
          ...data,
          categories: categories
        });
        console.log(res.data);
        let { statusCode } = res.data;
        if (statusCode === 200) {
          this.$router.push("/home");
          this.$message("发布成功");
        }
      } catch (e) {}
    }
  },
  watch: {
    "form.content": {
      deep: true,
      handler(value) {
        if (value) {
          this.$refs.form.clearValidate("content");
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.el-form {
  margin: 20px 0;
}
/deep/ .ql-container {
  height: 200px;
}
</style>
