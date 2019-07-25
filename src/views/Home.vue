<template>
  <el-row class="home">
    <el-row>
      <el-form label-width="70px" label-position="left" :model="searchParams" ref="searchForm">
        <el-col :span="4">
          <el-form-item label="包裹状态">
            <el-radio-group v-model="searchParams.status" size="small">
              <el-radio label="1" class="radio-margin">已取件</el-radio>
              <el-radio label="0" class="radio-margin">待取件</el-radio>
              <el-radio label="" class="radio-margin">所有</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="1">&nbsp;</el-col>
        <el-col :span="4">
          <el-form-item label="预约状态">
            <el-radio-group v-model="searchParams.hasOrdered" size="small">
              <el-radio label="1" class="radio-margin">已预约</el-radio>
              <el-radio label="0" class="radio-margin">未预约</el-radio>
              <el-radio label="" class="radio-margin">所有</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :span="2">
        <el-button type="primary" size="small" icon="el-icon-search" class="search-btn" @click="filterPackages">搜索
        </el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" size="small" icon="el-icon-edit" class="search-btn" @click="addPackage">添加</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="allPackages" style="width: 100%" @row-dblclick="editRow">
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
            <span>{{scope.row.status === 1 ? '待取件' : '已取件'}}</span>
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
        searchParams: {
          status: '',
          hasOrdered: ''
        },
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
      async filterPackages() {
        try {
          let response = await getPackagesByParams(this.searchParams);
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
