<template>
  <div>
    <el-table
      :data="data.data"
      border
      tooltip-effect="light"
      class="table-wrapper"
      size="small"
      :empty-text="emptyText"
    >
      <slot></slot>
    </el-table>
    <el-pagination
      class="page-wrapper"
      @size-change="_handleSizeChange"
      @current-change="_handleCurrentChange"
      :background="true"
      layout="total,sizes,prev, pager, next"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :current-page="page"
      :total="data.totalRecords">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'fullTable',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {
        return {
          data: [],
          totalRecords: 0
        }
      }
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    }
  },
  data () {
    return {
      page: 1,
      pageSize: 10
    }
  },
  methods: {
    _handleSizeChange (pageSize) {
      /**
       * 每页条数变更
       */
      this.pageSize = pageSize
      this.$emit('change', {
        page: this.page,
        pageSize: pageSize
      })
    },
    _handleCurrentChange (page) {
      /**
       * 页数变更
       */
      this.page = page
      this.$emit('change', {
        page: page,
        pageSize: this.pageSize
      });
    },
    getPageObj () {
      /**
       * 返回翻页参数
       */
      return {
        page: this.page,
        pageSize: this.pageSize
      }
    },
    resetPage () {
      /**
       * 重置页数
       */
      this.page = 1
    }
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper{
  padding: 10px 0;
  text-align: center;
  background-color: #FFF;
}
.table-wrapper{
  width: 100%;
}
</style>