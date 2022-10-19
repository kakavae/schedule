<template>
  <div>
    <ul class="todo-main">
      <!-- 1. 列表渲染todoList，传参给子组件 -->
      <!-- 2. 监听自定义事件popTodoItem, 拿到需要删除项的ID -->
      <!-- <transition-group name="list" enter-active-class="animate__backInLeft" leave-active-class="animate__backOutLeft">
        <MyItem v-for="item of todoList" :key="item.id" :todoItem="item.content" :status="item.status" :itemID="item.id" v-on:change-status="changeStatus" :edit="item.edit" class="animate__animated"></MyItem>
      </transition-group> -->
      <transition-group name="list">
        <MyItem v-for="item of todoList" :key="item.id" :todoItem="item.content" :status="item.status" :itemID="item.id" v-on:change-status="changeStatus" :edit="item.edit"></MyItem>
      </transition-group>
    </ul>
  </div>
</template>

<script>
import MyItem from './MyItem.vue'
import 'animate.css'
// 导入EventBus
export default {
  name: 'MyList',
  components: {
    MyItem
  },
  data() {
    return {
      todoListMyList: this.todoList
    }
  },
  props: ['todoList'],

  methods: {
    changeStatus(itemID, itemStatus) {
      this.todoList.forEach((item) => {
        if (item.id === itemID) {
          item.status = itemStatus
        }
      })
    }
  },
  created() {}
}
</script>

<style scoped>
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-bottom: none;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}

@keyframes show {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

.list-enter-active {
  animation: show 1s linear;
}

.list-leave-active {
  animation: show 1s linear 0s 1 reverse;
}
</style>
