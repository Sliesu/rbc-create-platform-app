<template>
  <div class="container">
    <div class="user-profile">
      <div class="avatar" @click="handleAvatarClick">
        <img v-if="showAvatar.show" :src="showAvatar.url" class="avatar"  alt="avatar"/>
        <div v-else class="avatar-placeholder">+</div>
        <el-icon  class="avatar-uploader-icon"><Plus /></el-icon>
      </div>

      <el-form :model="user" :rules="rules" ref="userForm" label-width="80px" class="form">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input-number v-model="user.age" :min="1" placeholder="请输入年龄"></el-input-number>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          {{user.phone}}
<!--          <el-input v-model="user.phone" placeholder="请输入手机号"></el-input>-->
        </el-form-item>
        <el-form-item label="性别" prop="gender" color="#34B5C0FF">
          <el-radio-group v-model="user.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="editProfile" color="#34B5C0FF" style="color: white">提交修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import { ElForm, ElFormItem, ElInput, ElInputNumber, ElButton, ElNotification } from 'element-plus'
import { updateUser, updateAvatar } from "@/api/user.js";
import {useUserStore} from "@/store/user.js";
import { useRouter } from 'vue-router';
const user = ref({
  id: 1,
  username: '',
  password: '',
  phone: '',
  gender: '',
  age: 0,
  avatarUrl: '',
})

const showAvatar = ref({
  url: '',
  show: false,
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符之间', trigger: 'blur' }
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { type: 'number', message: '年龄必须为数字值' }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: 'blur' }
  ],
  gender: [
    { required: true, message: '请选择性别', trigger: 'change' }
  ]
};

const store = useUserStore();
const router = useRouter();
// 在组件加载完成时
onMounted(async () => {
  try {
    const userInfo = store.getUserInfo;
    if (userInfo) {
      if(userInfo.avatarUrl){
        showAvatar.value.url = userInfo.avatarUrl;
        showAvatar.value.show = true;
      }
      Object.assign(user.value, userInfo);
    } else {
      ElNotification({
        title: '提示',
        message: '用户信息丢失，请重新登录',
        type: 'warning',
      });
      await router.replace('/login');
    }
  } catch (error) {
    await router.replace('/login');
  }
});

// onMounted(async () => {
//   try {
//     const userInfo = store.getUserInfo;
//     if (userInfo) {
//       Object.assign(user.value, userInfo);
//       showAvatar.url = userInfo.avatarUrl;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// });

const handleAvatarClick = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/png, image/jpeg, image/jpg';
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {
      const blob = new Blob([file], { type: file.type });
      const blobURL = URL.createObjectURL(blob);
      localStorage.setItem('tempAvatar', blobURL);
      showAvatar.value.url = blobURL; // 设置用户头像预览
      showAvatar.value.show = true;
    }
  });
  fileInput.click();
};


const editProfile = async () => {
  try {
    // 保存用户信息的 API 调用
    const userInfoRes = await updateUser(user.value);
    if (userInfoRes.code === 200) {
      // 如果用户信息保存成功，再调用修改头像的 API
      const tempAvatarURL = localStorage.getItem('tempAvatar');
      if (tempAvatarURL) {
        // 调用修改头像的 API
        const blob = await fetch(tempAvatarURL).then(response => response.blob());
        const newAvatarUrl = await updateAvatar(user.value.id, blobToFile(blob,"new_avatar.jpg") );
        // 更新用户信息
        user.value.avatarUrl = newAvatarUrl.data.avatarUrl;
        showAvatar.value.url = newAvatarUrl.data.avatarUrl;
        // 更新 squareUrl
        // reloadAvatar();
        // store.setUserInfo({ ...user.value }); // 更新 store 中的用户信息
        // 清除临时头像缓存
        localStorage.removeItem('tempAvatar');
      }
      ElNotification({
        title: '提示',
        message: '修改个人信息成功',
        type: 'success',
      });
      // 更新 store 中的用户信息
      store.setUserInfo({ ...user.value });
    } else {
      ElNotification({
        title: '错误',
        message: '修改个人信息失败',
        type: 'error',
      });
    }
  } catch (error) {
    ElNotification({
      title: '错误',
      message: '修改个人信息失败'+'\n'+error.message,
      type: 'error',
    });
  }
}

// Blob 转 File
const blobToFile = (blob, fileName) => {
  const file = new File([blob], fileName, {type: blob.type});
  return file;
};

</script>


<style scoped>
.container {
  max-width: 600px;
  margin: 5% auto;
  padding: 20px;
}

.user-profile {
  display: flex;
  align-items: center;
}

.avatar {
  margin: 0 20px 40px 20px;
  cursor: pointer;
}

.avatar img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: transform 0.2s;
}

.avatar:hover img {
  transform: scale(1.1);
}

.avatar-placeholder {
  width: 100px; /* 设置宽度和高度 */
  height: 100px;
  border-radius: 50%; /* 圆形 */
  border: 2px dashed #000; /* 描边 */
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer; /* 鼠标指针样式 */
  font-size: 20px;
}

.avatar-placeholder:hover {
  background-color: #ccc; /* 悬浮时的背景色 */
}
.form {
  flex: 1;
  margin-bottom: 20px;
}

.action-buttons {
  text-align: center;
}
</style>
