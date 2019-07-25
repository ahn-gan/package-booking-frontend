<template>
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
</template>

<script>
  import {ALL_STATUS, BE_TAKEN_STATUS, CHANGE_STATE, HAVED_ORDERED, NO_ORDERED} from "../util/constants";

  export default {
    name: "FilterButton",
    data() {
      return {
        filterStatus: ALL_STATUS
      }
    },
    methods: {
      getAllPackages() {
        this.filterStatus = ALL_STATUS;
      },
      getOrderedPackages () {
        this.filterStatus = HAVED_ORDERED;
      },
      getFetchedPackages() {
        this.filterStatus = BE_TAKEN_STATUS;
      },
      getNoOrderedPackages() {
        this.filterStatus = NO_ORDERED;
      },
      // async filterPackages(status) {
      //   try {
      //     let response = await getPackagesByParams(status);
      //     if (response) {
      //       this.allPackages = response;
      //     }
      //   } catch (e) {
      //     console.log(e);
      //   }
      // },
      addPackage() {
        this.$message.info('to be continue');
        // this.dialogVisible = true;
        // this.formEditable = false;
      }
    },
    watch: {
      filterStatus: function (newValue) {
        this.$store.commit(CHANGE_STATE, newValue);
      }
    }
  }
</script>

<style scoped>

</style>
