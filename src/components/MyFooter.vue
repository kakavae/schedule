<template>
  <div>
    <div class="todo-footer" v-if="total">
      <label>
        <input type="checkbox" :checked="allDoneBool" @change="doAll" />
      </label>
      <span>
        <span>已完成{{ done }}</span> / 全部{{ total }}
      </span>
      <button class="btn btn-danger" @click="clearDone">清除已完成任务</button>
    </div>
  </div>
</template>

<script scoped>
export default {
  name: 'MyFooter',
  data() {
    return {}
  },
  props: ['done', 'total', 'allDoneBool'],
  methods: {
    doAll(e) {
      this.$emit('done-all', e.target.checked)
    },
    clearDone() {
      this.$emit('clear-done')
    }
  },
  created() {
    // 通过eventBus监听事件，只要事件触发了就将数据渲染到页面上
    // 注意，不是vue管理的函数要写成箭头函数，这样this才会指向vue
  }
}
</script>

<style>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>
