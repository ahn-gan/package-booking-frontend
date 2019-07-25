<template>
  <el-row class="home">
    <el-row>
      <el-col :span="12">&nbsp;</el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" class="search-btn" @click="getAllPackages">ALL</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" class="search-btn" @click="getOrderedPackages">已预约</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" class="search-btn" @click="getFetchedPackages">已取件</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" class="search-btn" @click="getNoOrderedPackages">未预约</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" class="search-btn" @click="addPackage">添加</el-button>
      </el-col>
    </el-row>
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
            <span v-if="scope.row.status === 1"><el-button type="primary" size="small" plain @click="updateStatus(scope.row)">确定收货</el-button></span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" top="20px" @close='closeDialog'>
        <el-form label-width="80px" label-position="left" :model="updatePackage" class="dialog-form" ref="updateForm">
          <el-form-item label="运单号">
            <el-input v-model="updatePackage.logisticsNumber" :disabled="formEditable"></el-input>
          </el-form-item>
          <el-form-item label="客户姓名">
            <el-input v-model="updatePackage.customer.name"></el-input>
          </el-form-item>
          <el-form-item label="手机号码">
            <el-input v-model="updatePackage.customer.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="updatePackage.status">
              <el-radio :label="1">待取件</el-radio>
              <el-radio :label="0">已取件</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
              <el-button @click="closeDialog">取消</el-button>
              <el-button type="primary" @click="handleSave">保存</el-button>
        </span>
      </el-dialog>
    </el-row>
  </el-row>
</template>

<script>
  import {getAllPackages, getPackagesByParams, updatePackages} from "../axiosHttpUtils";

  export default {
    name: 'home',
    data() {
      return {
        allPackages: [],
        filterStatus: -1,
        dialogTitle: '',
        dialogVisible: false,
        formEditable: false,
        updatePackage: {
          logisticsNumber: '',
          status: '',
          customer: {
            name: '',
            mobilePhone: ''
          }
        }
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
      getOrderedPackages () {
        this.filterStatus = 1;
        this.filterPackages(this.filterStatus);
      },
      getFetchedPackages() {
        this.filterStatus = 0;
        this.filterPackages(this.filterStatus);
      },
      getNoOrderedPackages() {
        this.filterStatus = 2;
        this.filterPackages(this.filterStatus);
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
      addPackage() {
        this.$message.info('to be continue');
        this.dialogVisible = true;
        this.formEditable = false;
      },
      editRow(row, event) {
        this.dialogTitle = '修改';
        this.formEditable = true;
        this.updatePackage = JSON.parse(JSON.stringify(row));
        this.dialogVisible = true;
      },
      closeDialog() {
        this.updatePackage = {
          logisticsNumber: '',
          status: '',
          customer: {
            name: '',
            mobilePhone: ''
          }
        };
        this.dialogVisible = false;
      },
      async handleSave() {
        try {
          let response = await updatePackages(this.updatePackage);
          if (response) {
            this.dialogVisible = false;
            this.$message.success('保存成功');
            this.getAllPackages();
          }
        } catch (e) {
          console.log(e);
        }
      },
      updateStatus(rowData) {
        rowData.status = 0;
        this.updatePackage = rowData;
        this.handleSave();
      }
    },
    mounted() {
      this.getAllPackages();
    }
  }
</script>
