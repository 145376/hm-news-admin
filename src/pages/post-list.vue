<template>
  <div class="post-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" :index="indexMethod"></el-table-column>
      <el-table-column label="标题" prop="title" width="350px"></el-table-column>
      <el-table-column label="创建日期">
        <template v-slot="scope">{{ scope.row.create_date | date }}</template>
      </el-table-column>
      <el-table-column label="封面">
        <template v-slot="scope">
          <img :src="format(scope.row.cover[0].url)" alt />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button type="primary">编辑</el-button>
          <el-button type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :total="total"
      :page-size="pageSize"
      :pager-count="5"
      :current-page="pageIndex"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.getList();
  },
  data() {
    return {
      tableData: [],
      pageSize: 3,
      pageIndex: 1,
      total: 0
    };
  },
  methods: {
    async getList() {
      let res = await this.$axios.get(`/post`, {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      });
      console.log(res.data);
      let { statusCode, data, total } = res.data;
      if (statusCode === 200) {
        this.tableData = data;
        this.total = total;
      }
    },
    format(src) {
      if (src.startsWith("http")) {
        return src;
      } else {
        return this.$axios.defaults.baseURL + src;
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    pageChange(val) {
      console.log(val);
      this.pageIndex = val;
      this.getList();
    }
  }
};
</script>

<style lang="less" scoped>
.el-table {
  margin: 10px 0;
  img {
    width: 200px;
    height: 100px;
    object-fit: cover;
  }
}
</style>
