<template>
  <el-row>
    <el-table :data="allPackages" style="width: 100%" @row-dblclick="editRow">
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
    <DetailDialog></DetailDialog>
  </el-row>
</template>

<script>
  import DetailDialog from './DetailDialog'
  import {getAllPackages, getPackagesByParams} from "../util/axiosHttpUtils";

  export default {
    components: {
      DetailDialog
    },
    data() {
      return {
        allPackages: []
      }
    },
    methods: {
      editRow(row, event) {
        // this.dialogTitle = '修改';
        // this.formEditable = true;
        // this.updatePackage = JSON.parse(JSON.stringify(row));
        // this.dialogVisible = true;
      },
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
