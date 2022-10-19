<template>
  <div>
    <li>
      <label>
        <!-- 点击修改当前项的状态之后就传递参数给父组件  注意事件当复选框的状态改变时触发-->
        <!-- 注意，给这个inputv-model的时候，可以同时指定checked属性，两者不会相互冲突 -->
        <input type="checkbox" :checked="status" @change="changeStatus" />
        <span v-show="!edit">{{ todoItem }}</span>
        <input type="text" :value="todoItem" v-show="edit" @blur="changeContent" ref="iptContent" />
      </label>
      <!-- 定义点击事件，点击之后触发自定义事件，将需要删除项的ID传递给父组件 -->
      <button class="btn btn-danger" @click="deleteItem">删除</button>
      <button class="btn btn-edit" @click="editItem" v-show="!edit">编辑</button>
    </li>
  </div>
</template>

<script>
// 导入EventBus
// import bus from '../EventBus.js'
export default {
  name: 'MyItem',
  data() {
    return {
      checkedStatus: this.status
    }
  },
  props: ['todoItem', 'status', 'itemID', 'edit'],
  methods: {
    deleteItem() {
      // 使用EventBus，将需要删除的参数传递给父组件，参数1：删除的ID，参数2： 当前项的状态是否被选中
      // 注意，这里不使用驼峰，因为监测使用v-on:...所有的字母在html中会被转换为小写，检测不到大写字母
      this.$bus.$emit('pop-item', this.itemID)
    },
    changeStatus(e) {
      // 修改了当前项的选中状态，使用EventBus传递给父组件
      this.$bus.$emit('change-status', this.itemID, e.target.checked)
    },
    editItem() {
      // console.log(this.itemID)
      // 将需要编辑的项ID传给App组件，App控制data中的变量从而控制input和span是谁显示
      this.$bus.$emit('edit-item', this.itemID)

      // this.$refs.iptContent.focus()
      //这一段代码并不会主动等到页面渲染出input框之后执行，而是在上一句解析完之后，模板还没有渲染的时候就去执行，回调里面的所有代码都执行完之后才会解析模板

      //API将回调函数中的代码推迟到下一次DOM更新之后进行，用于一些需要操作到最新DOM的代码
      this.$nextTick(function () {
        this.$refs.iptContent.focus()
      })

      // 这种方法也能解决，定时器的任务属于宏任务，异步任务，会
      // setTimeout(() => {
      //   this.$refs.iptContent.focus()
      // }, 0)
    },
    changeContent(e) {
      // 发送ID给App，修改对应项的edit为false，同时，将对应项的content修改为e.target.value
      this.$bus.$emit('change-content', this.itemID, e.target.value)
    }
  },
  mounted() {}
}
</script>

<style scoped>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:hover button {
  display: block;
}

li:before {
  content: initial;
}

/* li:last-child {
  border-bottom: none;
} */
</style>
