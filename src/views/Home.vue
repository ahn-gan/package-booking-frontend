<template>
  <el-row class="home">
    <el-row>
      <el-form label-width="70px" label-position="left" :model="searchParams" ref="searchForm">
        <el-col :span="4">
          <el-form-item label="包裹状态">
            <el-radio-group v-model="searchParams.status" size="small">
              <el-radio label="1" class="radio-margin">已取件</el-radio>
              <el-radio label="0" class="radio-margin">代取件</el-radio>
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
        <el-col :span="2">
          <el-button type="primary" size="small" icon="el-icon-search" class="search-btn" @click="filterPackages">搜索</el-button>
        </el-col>
      </el-form>
    </el-row>
    <el-row>
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
  </el-row>
</template>

<script>
  import {getAllPackages, getPackagesByParams} from "../axiosHttpUtils";

  export default {
    name: 'home',
    data() {
      return {
        allPackages: [],
        searchParams: {
          status: '',
          hasOrdered: ''
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
      async filterPackages () {
        try {
          let response = await getPackagesByParams(this.searchParams);
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
