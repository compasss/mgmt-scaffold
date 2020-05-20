<template>
  <div>
    <div class="form-wrapper">
      <input-search title="姓名" v-model="nameSearch"></input-search>
      <input-search title="订单" class="p-l-10"></input-search>
    </div>
    <full-table :data="tableData" @change="getOrderList" ref="fullTable">
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="110"></el-table-column>
      <el-table-column prop="price" label="价格" width="110"></el-table-column>
      <el-table-column prop="num" label="数量"></el-table-column>
      <el-table-column prop="createTime" label="下单时间" width="120"></el-table-column>
      <el-table-column prop="userName" label="下单用户" width="80"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" class="row-btn">确定</el-button>
        </template>
      </el-table-column>
    </full-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: {
        data: [],
        totalRecords: 0
      },
      nameSearch: ''
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.$axios({
        api: 'mockOrderList',
        params: {
          page: 1,
          pageSize: 10
        }
      }).then(res => {
        this.tableData.data = res.data;
        this.tableData.totalRecords = res.totalRecodes;
      })
    }
  }
}
</script>