<template>
  <div>
    <chat :list="list" @addMessage="addMessage"></chat>
  </div>
</template>

<script>
import { h } from 'vue';

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    addMessage(message) {
      this.list.push(message);
    }
  },
  components: {
    'chat': {
      props: ['list'],
      emits: ['addMessage'],
      render() {
        let listNode;
        const self = this;
        if (this.list.length) {
          const liNode = [];
          for (let i = 0; i < this.list.length; i++) {
            liNode.push(h('li', {
              style: {
                color: 'blue'
              }
            }, this.list[i]));
          }
          listNode = h('ul', liNode);
        } else {
          listNode = h('p', {
            style: {
              color: 'red'
            }
          }, '暂无内容');
        }
        return h('div', [
          listNode,
          h('input', {
            placeholder: '请输入内容，按回车键发送',
            style: {
              width: '200px'
            },
            onKeyup: function(event) {
              // 回车发送数据
              if (event.keyCode !== 13) return;
              self.$emit('addMessage', event.target.value);
              event.target.value = '';
            }
          })
        ]);
      }
    }
  }
};
</script>

<style>
/* 样式可以在这里添加 */
</style>
