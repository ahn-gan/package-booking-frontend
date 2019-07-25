<template>
  <el-row>
    <el-button type="primary" size="small" class="search-btn" @click="addPackage">添加</el-button>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" top="20px" @close='closeDialog'>
      <el-form label-width="80px" label-position="left" :model="updatePackage" class="dialog-form" ref="updateForm">
        <el-form-item label="运单号">
          <el-input v-model="updatePackage.logisticsNumber"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="updatePackage.customer.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="updatePackage.customer.mobilePhone"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="updatePackage.status">
            <el-radio :label="0">已取件</el-radio>
            <el-radio :label="1">已预约</el-radio>
            <el-radio :label="2">未预约</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </span>
    </el-dialog>
  </el-row>
</template>

<script>
  export default {
    data() {
      return {
        dialogTitle: '',
        updatePackage: {
          logisticsNumber: '',
          status: '',
          customer: {
            name: '',
            mobilePhone: ''
          }
        },
        dialogVisible: false
      }
    },
    methods: {
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
        // try {
        //   let response = await updatePackages(this.updatePackage);
        //   if (response) {
        //     this.dialogVisible = false;
        //     this.$message.success('保存成功');
        //     this.getAllPackages();
        //   }
        // } catch (e) {
        //   console.log(e);
        // }
      },
      addPackage() {
        this.dialogVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
