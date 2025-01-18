import { isType } from "./util"

class Vue {
  constructor(options) {

  }
  $el
  $options
  _data
  $mount() {}
  render() {
    const self = this
    if(isType(self.$options.render) === 'function') {
      self.$el.innerHTML = self.$options.render.call(self)
    }
  }
  _porxyData() {

  }
}