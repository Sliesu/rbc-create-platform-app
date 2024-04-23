<template>
  <body class="page">
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户登录</span>
        <el-button class="button" text>注册新账号</el-button>
      </div>
    </template>
    <div class="login_container">
      <!-- 账号登录界面 -->
      <el-form v-if="!showVerificationCodeLogin" size="large">
        <!-- 用户名 -->
        <el-form-item class="form-item">
          <div class="input-with-icon">
            <el-icon class="user-icon" name="el-icon-user"><User /></el-icon>
            <el-input placeholder="用户名" v-model="loginInfo.id" class="input"></el-input>
          </div>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item class="form-item">
          <div class="input-with-icon">
            <el-icon class="lock-icon" name="el-icon-lock"><Lock/></el-icon>
            <el-input placeholder="密码" show-password v-model="loginInfo.password" class="input"></el-input>
          </div>
        </el-form-item>
        <!-- 记住我 -->
        <el-form-item>
          <el-checkbox label="记住我" class="rememberMe"></el-checkbox>
        </el-form-item>
        <!-- 验证码登录按钮 -->
        <el-form-item>
          <el-button type="text" class="verification-code-login-btn" :class="{ active: showVerificationCodeLogin }" @click="switchToVerificationCodeLogin">
            验证码登录
          </el-button>
        </el-form-item>

        <!-- 登录按钮 -->
        <el-form-item v-if="!showVerificationCodeLogin" style="justify-content: center;display: flex; margin-top: -20px;">
          <el-button type="primary" @click="userLogin" class="login-btn">登 录</el-button>
        </el-form-item>
      </el-form>

      <!-- 验证码登录界面 -->
      <VerificationCodeLogin
          v-else
          @switchToAccountLogin="switchToAccountLogin"
      />

      <Particles />

    </div>
  </el-card>
  </body>
</template>

<script>
import Particles from './Particles.vue';
import { User } from "@element-plus/icons";
import { Lock } from "@element-plus/icons";
import { login } from "@/api/user.js";
import { useUserStore } from '@/store/user.js';
import VerificationCodeLogin from './VerificationCodeLogin.vue';

export default {
  name: 'LoginPage',
  components: {
    Particles,
    User,
    Lock,
    VerificationCodeLogin,
  },
  data() {
    return {
      loginInfo: {
        id: '',
        password: ''
      },
      showVerificationCodeLogin: false,
    };
  },
  methods: {
    /**
     *  账号登录
     * @return {Promise<void>}
     */
    async userLogin() {
      try {
        const res = await login(this.loginInfo);
        const userStore = useUserStore();
        if (res.code === 200) {
          this.$message({
            message: '登录成功',
            type: 'success'
          });
          userStore.setUserInfo(res.data.user);
          this.$router.replace('/home');
        } else {
          this.$message.error('登录失败，请检查用户名和密码');
        }
      } catch (error) {
        console.error('登录失败:', error);
        this.$message.error('登录失败，请稍后重试');
      }
    },
    switchToVerificationCodeLogin() {
      this.showVerificationCodeLogin = true;
    },
    switchToAccountLogin() {
      this.showVerificationCodeLogin = false;
    },
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
  margin-top: 0px;
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

.verification-code-login-btn {
  color: #999;
  transition: color 0.3s;
  margin: -80px 0 0 200px ;
}

.verification-code-login-btn.active {
  color: #409eff;
}
.input{
  width: 16rem;
}
.login-btn{
  width: 100%;
  color: white;
  justify-content: center;
  display: flex;
}
</style>
