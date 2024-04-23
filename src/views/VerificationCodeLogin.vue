<template>
  <div class="verification-code-login">
    <el-form>
      <el-form-item>
        <div class="input-with-icon">
          <el-icon class="user-icon"><Iphone /></el-icon>
          <el-input
              v-model="phoneNumber"
              :prefix-icon="Phone"
              placeholder="请输入手机号码"
              class="input"
          >
            <template #prepend>+86</template>
          </el-input>
        </div>
      </el-form-item>
      <el-form-item>
        <div class="input-with-icon">
          <el-icon class="lock-icon"><Message /></el-icon>
          <el-input v-model="verificationCode" placeholder="请输入验证码" class="input-code"/>
          <el-button :disabled="disableGetCode" type="primary" @click="sendVerificationCode" class="get-code-btn">{{ getCodeButtonText }}</el-button>
        </div>
      </el-form-item>
      <el-form-item class="form-item">
        <el-checkbox label="记住我" class="remember-me"/>
        <el-button type="text" class="switch-login-btn" @click="switchToAccountLogin">
          账号登录
        </el-button>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="receiveVerificationCode" class="login-btn">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { Iphone, User, Message } from "@element-plus/icons";
import { loginByPhone, sendVerificationCode } from "@/api/user.js";
import { useUserStore } from "@/store/user.js";
import { ElMessage, ElMessageBox } from "element-plus";

export default {
  name: 'VerificationCodeLogin',
  components: {
    Iphone,
    User,
    Message
  },
  data() {
    return {
      phoneNumber: '',
      verificationCode: '',
      disableGetCode: false, // 获取验证码按钮是否禁用
      countdown: 60 // 倒计时时间
    };
  },
  computed: {
    getCodeButtonText() {
      // 动态显示按钮文本，根据倒计时是否结束
      return this.disableGetCode ? `${this.countdown}秒后重新获取` : '获取验证码';
    }
  },
  created() {
    this.disableGetCode = false; // 初始化按钮状态为可用
  },
  methods: {
    /**
     *  发送验证码
     * @return {Promise<void>}
     */
    async sendVerificationCode() {
      // 检查手机号是否为空
      if (this.phoneNumber === '') {
        this.$message.error('请输入手机号');
        return;
      }

      // 检查手机号格式是否正确
      const phonePattern = /^1[3-9]\d{9}$/;
      if (!phonePattern.test(this.phoneNumber)) {
        this.$message.error('请输入正确的手机号');
        return;
      }

      // 检查是否已禁用获取验证码按钮
      if (this.disableGetCode) {
        this.$message.error('请求过于频繁，请稍后再试');
        return;
      }

      try {
        const res = await sendVerificationCode(this.phoneNumber); // 发送验证码
        if (res.code === 200) {
          console.log('验证码发送成功');
          this.disableGetCode = true; // 禁用按钮
          this.startCountdown(); // 开始倒计时
        } else {
          console.error('验证码发送失败:', res.error.msg);
          this.$message.error('验证码发送失败');
        }
      } catch (error) {
        console.error('发送验证码失败:', error);
        this.$message.error('发送验证码失败');
      }
    },
    // 开始倒计时
    startCountdown() {
      let timer = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown--;
        } else {
          clearInterval(timer);
          this.disableGetCode = false; // 倒计时结束后启用按钮
          this.countdown = 60; // 重置倒计时时间
        }
      }, 1000);
    },
    /**
     *  验证验证码并登录
     * @return {Promise<void>}
     */
    async receiveVerificationCode() {
      try {
        const res = await loginByPhone(this.phoneNumber, this.verificationCode);
        const userStore = useUserStore();
        if (res.code === 200) {
          this.$message({
            message: '验证码登录成功',
            type: 'success'
          });
          userStore.setUserInfo(res.data.user);
          if (res.data.isRegister) {
            this.$router.replace('/home');
          } else {
            ElMessageBox.confirm(
                '当前用户密码还未设置，是否前往设置？',
                '提示',
                {
                  confirmButtonText: '确定',
                  cancelButtonText: '稍后',
                  type: 'warning',
                }
            )
                .then(() => {
                  this.$router.replace('/user');
                })
                .catch(() => {
                  this.$router.replace('/home');
                });
          }
        } else {
          this.$message.error('验证码登录失败，请检查手机号和验证码');
        }
      } catch (error) {
        console.error('验证码登录失败:', error);
        this.$message.error('验证码登录失败，请稍后重试');
      }
    },
    /**
     * 切换到账号密码登录
     */
    switchToAccountLogin() {
      this.$emit('switchToAccountLogin');
    },
  },
};
</script>

<style scoped>
.verification-code-login {
  display: flex;
  justify-content: center;
  position: relative;
  width: 400px;
  flex-direction: column;
  align-items: center;
  margin-top: 0px;
}

.input-with-icon {
  display: flex;
  align-items: center;
  margin-bottom: 10px; /* 添加间距使其居中 */
}

.input, .input-code,.login-btn {
  height: 40px;
}

.input {
  width: 16rem; /* 缩短输入框宽度 */
  margin-right: 20px;
}

.input-code {
  width: 150px; /* 缩短输入框宽度 */
  margin-right: 10px;
}

.get-code-btn {
  width: 100px;
  height: 37px;
  border-radius: 3px; /* 添加圆角 */
}

.login-btn {
  width: 100%;
}

.remember-me {
  margin-left: 0;
}

.switch-login-btn {
  color: #999;
  transition: color 0.3s;
  margin-left: auto; /* 将按钮移到最右侧 */
  cursor: pointer;
}

.switch-login-btn.active {
  color: #25afcb;
}

.el-icon {
  font-size: 20px;
  margin-right: 20px; /* 调整图标和输入框的间距 */
}

.user-icon,
.lock-icon,
.edit-icon {
  margin-right: 20px;
  font-size: 20px;
}
</style>
