import { isType } from "./util"

class Vue {
  constructor(options) {
    const self = this
    this.$options = options
    if(isType(options.beforeCreate) === 'function') {
      options.beforeCreate.call(self)
    }
    self._data = isType(options.data) === 'function' ? options.data() : options.data
    self._porxyData()
    if(isType(options.created) === 'function') {
      options.created.call(self)
    }
    self.$mount(options.el)
  }
  $el
  $options
  _data
  _porxyData() {
    const self = this
    Object.keys(self._data).forEach(k => {
      Object.defineProperty(self, k, {
        get(){
          return self._data[k]
        },
        set(newVal){
          self._data[k] = newVal
          if(isType(self.$options.beforeUpdate) === 'function') {
            self.$options.beforeUpdate.call(self)
          }
          self.render()
          if(isType(self.$options.updated) === 'function') {
            self.$options.updated.call(self)
          }
        }
      })
    })
  }
  render() {
    const self = this
    if(isType(self.$options.render) === 'function') {
      self.$el.innerHTML = self.$options.render.call(self)
    }
  }
  $mount(el) {
    const self = this
    self.$el = document.querySelector(el)
    if(isType(self.$options.beforeMount) === 'function') {
      self.$options.beforeMount.call(self)
    }
    self.render()
    if(isType(self.$options.mounted) === 'function') {
      self.$options.created.call(self)
    }
  }
}

// 使用示例
var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello, Vue!'
  },
  beforeCreate: function() {
    console.log('beforeCreate hook');
  },
  created: function() {
    console.log('created hook');
  },
  beforeMount: function() {
    console.log('beforeMount hook');
  },
  mounted: function() {
    console.log('mounted hook');
  },
  beforeUpdate: function() {
    console.log('beforeUpdate hook');
  },
  updated: function() {
    console.log('updated hook');
  },
  render: function() {
    return '<p>' + this.message + '</p>';
  }
});