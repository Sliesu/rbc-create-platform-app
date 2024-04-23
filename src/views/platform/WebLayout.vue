<template>

    <div class="page">
      <el-header :class="headerClass" class="page-header">
        <div class="logo-container">
          <div class="logo">
            <img src='@/assets/logo.png' alt="logo"/>
          </div>
        </div>
        <!--    <div class='page-title'>-->
        <!--      创意设计平台-->
        <!--    </div>-->

        <div class='header-search'>
          <input type='text' placeholder='输入查找内容' />
          <div class='search-icon'>
            <search style="width: 1em; height: 1em; margin-right: 8px;color:#b2aeae" />
          </div>
        </div>
        <top-nav/>
        <i class="el-icon-menu"></i>
        <el-dropdown>
          <div class="block">
            <el-avatar shape="square" :size="50" :src="squareUrl" :key="isReloadData" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="goToUserProfile">个人中心</el-dropdown-item>
              <el-dropdown-item @click="logoutUser">注销用户</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

      </el-header>

      <el-main class="page-content" >
        <transition name="page-transition">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </el-main>

      <el-footer class="page-bottom">
        <t-p-footer/>
      </el-footer>
    </div>

</template>

<script>
import { Search } from "@element-plus/icons";
import TPFooter from "@/views/platform/TPFooter.vue";
import TopNav from "@/views/platform/TopNav.vue";
import { useStore } from 'vuex';
import {useUserStore} from "@/store/user.js";
import router from "@/router/index.js";

export default {
  name: "WebLayout",
  components: {
    TopNav,
    TPFooter,
    Search,
  },

  data() {
    return {
      headerClass: "fixed",
      isReloadData: false, // 定义 isReloadData 变量，默认为 false
      squareUrl:""
    };
  },
  mounted() {
    const userStore = useUserStore();
    const userInfo = userStore.getUserInfo;
    // console.log(userInfo);
    if (userInfo) {
      this.squareUrl = userInfo.avatarUrl;
    }
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  methods: {
    logoutUser() {
      const userStore = useUserStore();
      userStore.setUserInfo(null);
      this.$router.push('/login');
    },
    goToUserProfile() {
      this.$router.push('/user');
    },
    handleScroll() {
      const threshold = 200; // 滚动阈值，根据需要调整

      if (window.pageYOffset < threshold) {
        this.headerClass = "fixed";
      } else {
        this.headerClass ="transparent";
      }
    },
    reloadAvatar() {
      // 重新获取头像地址的方法为
      this.squareUrl = reloadAvatarUrl();
      // 将 isReloadData 变量设置为 true，触发头像标签的重新渲染
      this.isReloadData = true;
    }
  },
};
</script>

<style scoped>

.page {
  width: 100%;
  padding: 0;
  margin: 0;
  height: 100vh; /* 设置元素高度为视口高度 */
  box-sizing: border-box; /* 确保元素的宽度和高度包括内边距和边框 */
  display: flex;
  flex-direction: column; /* 主轴方向为垂直方向 */
  min-height: 100vh; /* 设置最小高度为视口高度 */
}
.page-content {
  width: auto;
  margin : 5%;
  padding : 0;
  min-height: 60%;
  box-sizing: border-box; /* 确保元素的宽度和高度包括内边距和边框 */
  border: none; /* 移除边框 */
  overflow: hidden; /* 隐藏内容溢出部分，确保不出现滚动条 */
  flex-shrink: 0; /* 不随内容的增加而缩小 */
}

.page-header {
  position: fixed;
  top: 0; /* 固定在页面顶部 */
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  /*justify-content: center;*/
  align-items: center;
  height: 75px;
  backdrop-filter: blur(10px); /* 添加高斯模糊效果 */
  transition: background-color 0.3s; /* 添加过渡效果 */
  flex-grow: 1; /* 占据剩余空间，让内容撑开页面 */
}

.transparent {
  /*background-color: transparent !important; !* 设置背景颜色为透明 *!*/
  background-color: rgba(95, 99, 100, 0.28) !important; /* 固定在顶部时设置背景颜色为不透明 */
}


.fixed {
  background-color: rgba(52, 181, 192, 1) !important; /* 固定在顶部时设置背景颜色为不透明 */
}

.page-bottom {
  flex-shrink: 0; /* 不随内容的增加而缩小 */
  width:100%;
  height: auto;
  background-color: #dcdcdc;
  padding: 0 0 0 0 ;
  /*max-width: 1200px;*/
}



.left,
.right {
  margin-bottom: 10px;
}

.left span,
.right span {
  display: block;
}

a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

a:hover {
  color: #fff;
}

.logo-container {
  width: 200px;
  text-align: center;
  align-items: center;
  margin: 0 500px 10px 0;
}

.logo {
  width: 250px;
  height: 100px;
  display: flex;
  margin-top: 10px; /* 添加一个顶部间距 */
}

.logo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.page-title {
  font-size: 180%;
  /*font-family: '华文宋体';*/
  color: #ffffff;
  margin-left: 10px; /* 调整左边距为10px */
  font-weight: bold;
  text-align: left;
  white-space: nowrap;
  align-self: center; /* 使用 align-self 属性使其垂直居中 */
  margin-top: 10px; /* 添加顶部间距，与 logo 分隔开 */
}

.header-search{
  display: flex;
  margin-left: 100px;
  margin-right: 20px;
  height: 64px;
  align-items: center;
}

.header-search input{
  border-radius: 10px 0 0 10px;
  height:36px;
  width:220px;
  padding-left:10px;
  margin-left:20px;
  border:1px solid #ffffff;
}

.header-search .search-icon{
  width:33px;
  height:37px;
  background-color: #cce5ef;
  border-radius: 0 10px 10px 0;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center;
}

.header-search .iconfont{
  font-size:24px;
  color:#fff;
}

@media screen and (max-width: 800px) {
  /*.page-header {*/
  /*  display: flex;*/
  /*  justify-content: center;*/
  /*  align-items: center;*/
  /*}*/
  .logo-container {
    text-align: center;
    max-width:80%; /* 修改为80% */
  }
  .logo {
    display: inline-block;
    max-width:80%; /* 修改为80% */
  }
  .page-title{
    display:none; /* 隐藏搜索框 */
  }
  .header-search{
    display:none; /* 隐藏搜索框 */
  }
}

@media screen and (max-width:500px) { /* 添加一个媒体查询 */

  .logo{
    max-width:60%; /* 修改为60% */
  }
  .page-title{
    display:none; /* 隐藏搜索框 */
  }
  .header-search{
    display:none; /* 隐藏搜索框 */
  }
}

</style>

