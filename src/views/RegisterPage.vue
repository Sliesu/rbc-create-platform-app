<template>
  <body class="page">
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户注册</span>
        <el-button class="button" text @click="goToLoginPage">返回登录</el-button>
      </div>
    </template>
    <div class="login_container">
      <!-- 注册表单区域 -->
      <el-form size="large">
        <!-- 用户名 -->
        <el-form-item class="form-item">
          <div class="input-with-icon">
            <el-icon class="user-icon" name="el-icon-user"><User /></el-icon>
            <el-input placeholder="用户名" v-model="registerInfo.username"></el-input>
          </div>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="form-item">
          <div class="input-with-icon">
            <el-icon class="lock-icon" name="el-icon-lock"><Lock/></el-icon>
            <el-input placeholder="密码" show-password v-model="registerInfo.password"></el-input>
          </div>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item class="form-item">
          <div class="input-with-icon">
            <el-icon class="lock-icon" name="el-icon-lock"><Lock/></el-icon>
            <el-input placeholder="确认密码" show-password v-model="confirmPassword"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <!-- 注册按钮 -->
      <el-form-item style="justify-content: center;display: flex;">
        <el-button type="primary" @click="userRegister">注册</el-button>
      </el-form-item>
    </div>
  </el-card>
  </body>
</template>

<script>
import { User } from "@element-plus/icons";
import { Lock } from "@element-plus/icons";
import { register } from "@/api/user.js";

export default {
  name: 'RegisterPage',
  components: {
    User,
    Lock
  },
  data() {
    return {
      registerInfo: {
        username: '',
        password: ''
      },
      confirmPassword: ''
    };
  },
  methods: {
    userRegister() {
      if (this.registerInfo.password !== this.confirmPassword) {
        this.$message.error('两次输入的密码不一致');
        return;
      }

      register(this.registerInfo)
          .then(res => {
            console.log(res);
            if (res.code === 200) {
              this.$message({
                message: '注册成功',
                type: 'success'
              });
              // Redirect the user to login page after successful registration
              this.$router.push('/login');
            } else {
              this.$message.error('注册失败，请稍后重试');
            }
          })
          .catch(error => {
            console.error('注册失败:', error);
            this.$message.error('注册失败，请稍后重试');
          });
    },
    goToLoginPage() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-image: url("@/assets/login-bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.login_container {
  display: flex;
  justify-content: center;
  position: relative;
  width: 400px;
  flex-direction: column;
  align-items: center;
}

.box-card {
  background-color: rgba(255, 255, 255, 0.66);
  backdrop-filter: blur(10px);
  float: left;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  font-size: 14px;
}

.code {
  flex: 1;
}

.rememberMe {
  margin-left: 0;
}


.form-item {
  display: flex;
  align-items: center;
}

#input{
  width: 400px;
}

.input-with-icon {
  display: flex;
  align-items: center;
  margin-right: 20px;
  font-size: 20px;
}

.user-icon,
.lock-icon,
.edit-icon {
  margin-right: 20px;
  font-size: 20px;
}
</style>
