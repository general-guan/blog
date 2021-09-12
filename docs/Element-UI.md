# Element-UI

## Table

```html
<template>
  <div>
    <h1>表格</h1>
    <el-table
      :data="tableData"
      border
      size="mini"
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" label="选择"></el-table-column>
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="账号" prop="account"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{ id: 1, username: '张三', account: 'zhangsan' }], // 列表数据
      multipleSelection: [], // 选中数据
    };
  },
  methods: {
    // 改变选中数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
```

## Pagination

```html
<template>
  <div>
    <h1>分页</h1>
    <el-pagination
      :current-page="pageIndex"
      :page-sizes="pageSizes"
      :total="pageTotal"
      :page-size="pageSize"
      :layout="pageLayout"
      @current-change="handlePageIndexChange"
      @size-change="handlePageSizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageIndex: 1, // 当前页
      pageSize: 20, // 每页显示条数
      pageSizes: [10, 20, 30, 50], // 每页显示个数选择器的选项设置
      pageTotal: 0, // 总条数
      pageLayout: 'total, sizes, prev, pager, next, jumper', // 组件布局
    };
  },
  methods: {
    // 改变当前页
    handlePageIndexChange(val) {
      this.pageIndex = val;
      console.log(`当前页: ${val}`);
    },

    // 改变每页显示条数
    handlePageSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      console.log(`每页 ${val} 条`);
    },
  },
};
</script>
```

