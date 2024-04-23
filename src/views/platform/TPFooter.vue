<template>
  <div class="footer">
    <div class="footer-content">
      <div class="left">
        <h3 class="footer-title">彩虹云创意设计平台</h3>
        <p class="footer-contact">联系方式：yihang_0913@qq.com</p>
      </div>
      <div class="right">
        <p class="footer-link">相关链接：</p>
        <ul class="footer-menu">
          <li><a href="#">首页</a></li>
          <li><a href="#">关于我们</a></li>
          <li><a href="#">服务</a></li>
          <li><a href="#">作品案例</a></li>
          <li><a href="#">联系我们</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background-color: #f8f9fa; /* 背景颜色 */
  padding: 40px 0; /* 上下内边距 */
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px; /* 最大宽度 */
  margin: 0 auto; /* 居中 */
}

.left {
  flex: 1;
}

.footer-title {
  font-size: 24px;
  color: #333; /* 标题颜色 */
  margin-bottom: 10px; /* 标题底部间距 */
}

.footer-contact {
  color: #666; /* 联系信息颜色 */
}

.right {
  flex: 1;
  text-align: right;
}

.footer-link {
  font-size: 18px;
  color: #333; /* 链接标题颜色 */
  margin-bottom: 10px; /* 链接标题底部间距 */
}

.footer-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.footer-menu li {
  display: inline-block;
  margin-right: 20px; /* 每个链接之间的右边距 */
}

.footer-menu li:last-child {
  margin-right: 0; /* 最后一个链接不设置右边距 */
}

.footer-menu a {
  text-decoration: none;
  color: #666; /* 链接颜色 */
  transition: color 0.3s; /* 链接颜色变化过渡效果 */
}

.footer-menu a:hover {
  color: #007bff; /* 鼠标悬停时链接颜色 */
}
</style>
