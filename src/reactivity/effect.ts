const targetMap = new Map()
let activeEffect

// 抽象出一个ReactiveEffect类
class ReactiveEffect {
  private _fn: any
  constructor(fn) {
    this._fn = fn
  }
  run() {
    activeEffect = this
    return this._fn()
  }
}

export const track = (target, key) => {
  let depsMap = targetMap.get(target)
  if(!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if(!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(activeEffect)
}

export const trigger = (target, key) => {
  const depsMap = targetMap.get(target)
  const deps = depsMap.get(key)
  for(const d of deps) {
    d.run()
  }
}
export const effect = (fn) => {
  const _effect = new ReactiveEffect(fn)
  _effect.run()
  return _effect.run.bind(_effect)
}