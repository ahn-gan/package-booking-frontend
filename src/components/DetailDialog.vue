<template>
  <el-row>
    <el-button type="primary" size="small" class="search-btn" @click="addPackage">添加</el-button>
    <el-dialog :title="dialogTitle" :visible.sync="dialogVisible" width="500px" top="20px" @close='closeDialog'>
      <el-form label-width="80px" label-position="left" :model="updatePackage" class="dialog-form" ref="insertForm" :rules="rules">
        <el-form-item label="运单号" prop="logisticsNumber">
          <el-input v-model="updatePackage.logisticsNumber"></el-input>
        </el-form-item>
        <el-form-item label="客户姓名">
          <el-input v-model="updatePackage.customer.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="updatePackage.customer.mobilePhone"></el-input>
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
  import {createPackages} from "../util/axiosHttpUtils";
  import {REFRESH_DATA} from "../util/constants";

  export default {
    data() {
      return {
        dialogTitle: '',
        updatePackage: {
          logisticsNumber: '',
          customer: {
            name: '',
            mobilePhone: ''
          }
        },
        dialogVisible: false,
        rules: {
          logisticsNumber: [
            {required: true, message: '请输入运单', trigger: ['blur', 'change']}
          ]
        },
        refreshFlag: false
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
        this.$refs.insertForm.resetFields();
      },
      handleSave() {
        this.$refs.insertForm.validate((valid) => {
          if (!valid) {
            return false;
          } else {
            let mobileNoReg = /^1(?:3\d|4[4-9]|5[0-35-9]|6[67]|7[013-8]|8\d|9\d)\d{8}$/;
            if (!mobileNoReg.test(this.updatePackage.customer.mobilePhone)) {
              this.$alert('请输入正确的手机号码！');
              return false;
            }
            this.addPackageInformation();
          }
        });
      },
      async addPackageInformation() {
        try {
          let response = await createPackages(this.updatePackage);
          if (response) {
            this.dialogVisible = false;
            this.$message.success('保存成功');
            this.$store.commit(REFRESH_DATA, !this.refreshFlag);
          }
        } catch (e) {
          console.log(e);
        }
      },
      addPackage() {
        this.dialogVisible = true;
      }
    }
  }
</script>

<style scoped>

</style>
