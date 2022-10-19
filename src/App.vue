<template>
  <div>
    <div id="root">
      <div class="todo-container">
        <div class="todo-wrap">
          <!-- 监听自定义事件，获取添加的待办事项 -->
          <MyHeader v-on:add-item="addItem"></MyHeader>
          <MyList :todoList="todoList"></MyList>
          <!-- 将计算出来的已完成和总数通过自定义属性props传递给子组件 -->
          <!-- 监听子组件自定义事件，决定是否修改所有的status -->
          <MyFooter :done="doneItem" :total="totalItem" :allDoneBool="allDoneBool" v-on:done-all="doneAll" v-on:clear-done="clearDone"></MyFooter>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader.vue'
import MyList from './components/MyList.vue'
import MyFooter from './components/MyFooter.vue'
// 导入EventBus
// import bus from './EventBus.js'
export default {
  name: 'MyApp',
  data() {
    return {
      todoList: JSON.parse(localStorage.getItem('todoList')) || []
    }
  },
  computed: {
    totalItem() {
      return this.todoList.length
    },
    doneItem() {
      // 使用filter计算某一个状态为真的所有元素
      // return this.todoList.filter((item) => {
      //   return item.status
      // }).length
      // 使用reduce计算某一个状态为真的所有元素
      // 第二个参数指定初始值为0，所以previouseValue第一次迭代值为0，currentValue值为数组的第一个元素
      // 第二次迭代，previouseValue值为上一次迭代的返回值，currentValue为数组的第二个元素
      // 第三次迭代，previouseValue值为上一次迭代的返回值，currentValue为数组的第三个元素
      // 数组长度为3，三次迭代结束，最新的previouseValue作为reduce函数的返回值
      // 注意：如果没有指定初始值，则第一次迭代previouseValue默认为第一个元素，currentValue为第二个元素，第二次迭代previouseValue为第一次迭代的返回值，currentValue为第三个元素，建议总是指定初始值
      return this.todoList.reduce((previouseValue, currentValue) => {
        return previouseValue + (currentValue.status === true ? 1 : 0)
      }, 0)
    },
    // 是否所有的状态都是true
    allDoneBool() {
      return this.totalItem === this.doneItem && this.totalItem > 0
    }
  },
  components: {
    MyHeader,
    MyList,
    MyFooter
  },
  methods: {
    addItem(todoItem, itemID) {
      this.todoList.unshift({ id: itemID, content: todoItem, status: false })
    },
    doneList(allDone) {
      this.todoList.forEach((item) => {
        item.status = allDone
      })
    },
    doneAll(isfull) {
      this.todoList.forEach((item) => {
        item.status = isfull
      })
    },
    clearDone() {
      this.todoList = this.todoList.filter((item) => {
        return !item.status
      })
    }
  },
  created() {
    this.$bus.$on('pop-item', (itemID) => {
      // 添加是否确认删除功能
      if (confirm('确认删除吗？')) {
        // 过滤之后，todolist当中去除掉id为val的元素
        this.todoList = this.todoList.filter((item) => {
          return item.id !== itemID
        })
      }
    })
    this.$bus.$on('change-status', (itemID, itemStatus) => {
      this.todoList.forEach((item) => {
        if (item.id === itemID) {
          item.status = itemStatus
        }
      })
    })
    // 监听事件，得到需要处于编辑状态的项的ID
    this.$bus.$on('edit-item', (itemID) => {
      // 循环todoList给对应ID的todo项增加一个变量，用来控制是否显示input
      for (let i = 0; i < this.todoList.length; i++) {
        if (this.todoList[i].id === itemID) {
          if (Object.prototype.hasOwnProperty.call(this.todoList[i], 'edit')) {
            this.todoList[i].edit = true
            return
          } else {
            this.$set(this.todoList[i], 'edit', true)
            return
          }
        }
      }
    })
    // 监听事件，得到需要修改content的ID和修改内容
    this.$bus.$on('change-content', (itemID, content) => {
      this.todoList.forEach((item) => {
        if (item.id === itemID) {
          item.edit = false
          item.content = content
        }
      })
    })
  },
  beforeDestroy() {
    // 即将销毁的时候解绑$bus上面的事件，不然这个事件一直在$bus上面，容易占用资源
    this.$bus.$off(['pop-item', 'change-status', 'edit-item', 'change-content'])
  },
  watch: {
    todoList: {
      deep: true,
      immediate: true,
      handler(newVal) {
        localStorage.setItem('todoList', JSON.stringify(newVal))
      }
    }
  }
}
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  display: inline-block;
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-edit {
  color: #fff;
  background-color: #2f8ad0;
  border: 1px solid #112dbb;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
