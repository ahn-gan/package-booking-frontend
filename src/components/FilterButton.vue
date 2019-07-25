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
      <DetailDialog></DetailDialog>
    </el-col>
  </el-row>
</template>

<script>
  import {ALL_STATUS, BE_TAKEN_STATUS, CHANGE_STATE, HAVED_ORDERED, NO_ORDERED} from "../util/constants";
  import DetailDialog from './DetailDialog'

  export default {
    components: {
      DetailDialog
    },
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
