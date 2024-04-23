<template>
  <div>
    <ele :num="num"></ele><br>
    <button @click="toggleImage">
      切换照片
    </button>
  </div>
</template>

<script>
import {h} from "vue";

export default {
  data() {
    return {
      num: 1
    };
  },
  methods: {
    toggleImage() {
      this.num = this.num === 1 ? 2 : 1;
    }
  },
  components: {
    'ele': {
      props: ['num'],
      render() {
        if (this.num === 1) {
          return h('img', { src: 'src/assets/img/带背景圆润.png' });
        } else {
          return h('img', { src: 'src/assets/img/透明图标第二版——带背景.png' });
        }
      }
    }
  }
};
</script>

<style>
/* 样式可以在这里添加 */
</style>
