<template>
  <el-row>
    <el-table :data="allPackages" style="width: 100%">
      <el-table-column type="selection" width="40" fixed></el-table-column>
      <el-table-column label="运单号" sortable prop="logisticsNumber" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.logisticsNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户姓名" sortable prop="name" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customer.name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="客户手机" sortable prop="mobilePhone" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.customer.mobilePhone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.status === 0 ? '已取件' : scope.row.status === 1 ? '已预约' : '未预约'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.status !== 0"><el-button type="primary" size="small" plain @click="updateStatus(scope.row)">确定收货</el-button></span>
        </template>
      </el-table-column>
    </el-table>
  </el-row>
</template>

<script>
  import {getAllPackages, getPackagesByParams, updatePackages} from "../util/axiosHttpUtils";

  export default {
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
      },
      async filterPackages(status) {
        try {
          let response = await getPackagesByParams(status);
          if (response) {
            this.allPackages = response;
          }
        } catch (e) {
          console.log(e);
        }
      },
      updateStatus(rowData) {
        rowData.status = 0;
        this.handleSave(rowData);
      },
      async handleSave(updatedData) {
        try {
          let response = await updatePackages(updatedData);
          if (response) {
            this.$message.success('保存成功');
            this.getAllPackages();
          }
        } catch (e) {
          console.log(e);
        }
      }
    },
    mounted() {
      this.getAllPackages();
    },
    computed: {
      status() {
        return this.$store.state.status;
      }
    },
    watch: {
      status: function (newValue) {
        this.filterPackages(newValue);
      }
    }
  }
</script>

<style scoped>

</style>
