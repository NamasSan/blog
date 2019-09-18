<template>
  <div>
    <top-head></top-head>
    <div class="myform">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
      <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload" v-model="ruleForm.avator">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="name">
          <el-input v-model="ruleForm.mail"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="passW">
          <el-input v-model="ruleForm.passW" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="rePassW">
          <el-input v-model="ruleForm.rePassW" type="password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="保密"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (
          /^(?=.*\d+)(?=.*_+)(?=.*[a-zA-Z]+)(?=.*\W+).{6,16}$/gim.test(value)
        ) {
          if (this.ruleForm.rePassW !== "") {
            this.$refs.ruleForm.validateField("rePassW");
          }
          callback();
        } else {
          callback(new Error("密码须包含字母/数字/下划线/特殊字符,6~16位"));
        }
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.passW) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        passW: "",
        rePassW: "",
        imageUrl: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 6,
            message: "长度在 2 到 6 个字符",
            trigger: "blur"
          }
        ],
        passW: [
          {
            required: true,
            message: "请输入用户密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        rePassW: [
          {
            required: true,
            message: "请重新输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 16,
            message: "长度在 6 到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post("/reg", this.ruleForm)
            .then(response => {
              if (response.data.msg == "username_has_exited") {
                this.$alert("该用户名已注册", "注册失败", {
                  confirmButtonText: "确定",
                  callback: action => {}
                });
              } else {
                this.$message("注册成功");
                this.$router.push({ path: "/" });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          // alert('submit!');
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
  }
  }};
</script>

<style>
.myform {
  width: 60%;
  margin: 60px auto;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
