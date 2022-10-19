// 导入vue
import Vue from 'vue'
// 导入App组件
import MyApp from './App.vue'
// 取消vue控制台提示
Vue.config.productionTip = false

// 创建vm实例 编译模板，内容是App内容，替换区域是index.html中的#app盒子
new Vue({
  render: (h) => h(MyApp),
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  }
}).$mount('#app')
