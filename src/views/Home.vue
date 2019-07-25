<template>
  <el-row class="home">
    <el-table :data="allPackages" style="width: 100%">
      <el-table-column type="selection" width="40" fixed></el-table-column>
      <el-table-column label="运单号" sortable align="center">
        <template slot-scope="scope">
          <span>{{scope.row.logisticsNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" sortable align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customer.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户手机" sortable align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customer.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" sortable align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status === 1 ? '待取' : '已取'}}</span>
        </template>
      </el-table-column>

    </el-table>
  </el-row>
</template>

<script>
  import {getAllPackages} from "../axiosHttpUtils";

  export default {
    name: 'home',
    data() {
      return {
        allPackages: []
      }
    },
    methods: {
      async getAllPackages() {
        try {
          let response = await getAllPackages();
          if (response) {
            this.allPackages = response;
          }
        } catch (e) {
          console.log(e);
        }
      }

    },
    mounted() {
      this.getAllPackages();
    }
  }
</script>
