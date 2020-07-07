<template>
  <div id="login">
    <div class="box">
      <el-form :label-position="labelPosition" label-width="60px">
        <h3>影院售票管理系统</h3>
        <el-form-item label="用户名">
          <el-input v-model="adminName" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        </el-form-item>
        <el-form-item style="margin-top: 30px">
          <el-button @click="reset">重置</el-button>
          <el-button type="primary" size="medium" @click="login" style="margin-left: 30px">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="toregister text-center"  @click="regist">
          <a href="#" class="btn-block" style="color:#409EFF">没有账号,立即注册</a>
      </div>
    </div>
    <!--注册弹框-->
    <div>
      <el-dialog
        :title="dialogTitle"
        :visible.sync="dialogFormVisible"
        :modal-append-to-body="false"
        v-if="dialogFormVisible"
        :show-close="false"
      >
        <el-form
          :label-position="labelPosition"
          :rules="rules"
          label-width="80px"
          :model="adminInfo"
        >
          <el-form-item label="用户名" prop="name">
            <el-col :span="16">
              <el-input v-model="adminInfo.name"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="头像">
            <el-col :span="16">
              <img
                :src="adminInfo.avatar?adminInfo.avatar:server+'/images/avatar/monkey.png'"
                ref="previewImg"
                alt
                width="80px"
                height="80px"
              />
              <div style="position: relative;height: 64px">
                <el-button
                  size="small"
                  type="primary"
                  style="position: absolute;left: 0;top: 0;cursor: pointer"
                >点击上传</el-button>
                <input
                  type="file"
                  id="file"
                  name="file"
                  ref="uploadImg"
                  accept="image/png, image/jpeg, image/gif, image/jpg"
                  style="position: absolute;left: 0;top: 0;opacity: 0;height: 32px;width: 80px;cursor: pointer"
                  @change="changeImg"
                />
                <div
                  slot="tip"
                  class="el-upload__tip"
                  style="position: absolute;left: 0;top: 32px;height: 32px"
                >只能上传jpg/png文件，且不超过500kb（默认为系统头像）</div>
              </div>
            </el-col>
          </el-form-item>
          <el-form-item label="手机" prop="phone">
            <el-col :span="16">
              <el-input v-model="adminInfo.phone"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-col :span="16">
              <el-input v-model="adminInfo.password" show-password></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="性别">
            <el-col :span="16">
              <el-select v-model="adminInfo.sex" placeholder="请选择性别" style="width: 100%">
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="生日">
            <el-col :span="16">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="adminInfo.birthday"
                :picker-options="pickerBirthday"
                style="width: 100%;"
              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="addAdminInfo()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { login, upLoadImg, regist } from "../../api";
import Vue from "vue";
import { Input, Button, Message, Form, FormItem, MessageBox } from "element-ui";
import md5 from 'js-md5';
Vue.use(Input);
Vue.use(Button);
export default {
  name: "Login",
  data() {
    let checkName = (rule, value, callback) => {
      if (!value) {
        callback(new Error("用户名不能为空！"));
      } else {
        callback();
      }
    };
    let checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入手机号码"));
      } else {
        if (/^1[3|4|5|6|7|8][0-9]{9}$/.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确格式的手机号码"));
        }
      }
    };
    let checkPassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      labelPosition: "right",
      adminName: "",
      password: "",
      dialogTitle: "",
      server: "http://localhost:3000",
      adminInfo: {
        name: "",
        avatar: "",
        password: "",
        phone: "",
        sex: "",
        birthday: ""
      },
      dialogFormVisible: false,
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      pickerBirthday: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  methods: {
    reset() {
      this.adminName = "";
      this.password = "";
    },
    regist() {
      this.dialogTitle = "注册";
      this.adminInfo = {};
      this.dialogFormVisible = true;
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    changeImg(e) {
      let reader = new FileReader();
      reader.readAsDataURL(this.$refs.uploadImg.files[0]); //发起异步请求
      let _this = this;
      reader.onload = function() {
        //读取完成后，将结果赋值给img的src
        _this.$refs.previewImg.src = this.result;
        _this.adminInfo.avatar = this.result;
      };
    },
    //注册信息
    async addAdminInfo() {
      console.log(this.adminInfo);
      if (
        !this.adminInfo.name ||
        !/^1[3|4|8|6|7|8][0-9]{9}$/.test(this.adminInfo.phone) ||
        !this.adminInfo.password
      ) {
        Message.error("请完成必填内容！");
        return false;
      } else {
        let formData = new FormData();
        formData.append("file", this.$refs.uploadImg.files[0]);
        let json = await upLoadImg(formData);
        if (json.success_code === 200) {
          if (this.adminInfo.birthday) {
            let date = new Date(this.adminInfo.birthday);
            this.adminInfo.birthday =
              date.getFullYear() +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getDate();
          }
          if (json.data.length) {
            console.log(1);
            this.adminInfo.avatar = "/images/avatar/" + json.data[0].filename;
          }
          json = await regist(
              this.adminInfo.name,
              md5(this.adminInfo.password),
              this.adminInfo.sex,
              this.adminInfo.phone,
              this.adminInfo.birthday,
              this.adminInfo.avatar
            );
            if (json.success_code === 200) {
              this.dialogFormVisible = false;
              Message.success("添加成功！");
            } else if (json.error_code === 1) {
              Message.error(json.message);
            }
        }
      }
    },
    async login() {
      if (!this.adminName) {
        Message.error("请输入用户名！");
      } else if (!this.password) {
        Message.error("请输入密码！");
      } else {
        let json = await login(this.adminName, md5(this.password));
        if (json.success_code === 200) {
          this.$router.push({ path: "/home" });
          Message.success("登录成功!");
        } else {
          Message.error(json.message);
        }
      }
    }
  }
};
</script>

<style>
#login {
  width: 100%;
  height: 100%;
  background: url('./images/back.jpg');
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  color: #fff;
}
.box {
  width: 500px;
  height: 400px;
  background-color: rgba(255, 255, 255, .8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  border-radius: 4px;
  box-shadow: 0 0 8px 8px #ccc;
}
h3 {
  margin-bottom: 40px;
  font-size: 36px;
  letter-spacing: 2px;
  color: #888;
  text-align: center
}
</style>
