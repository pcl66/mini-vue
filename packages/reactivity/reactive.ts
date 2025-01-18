import { track, trigger } from "./effect"

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key)
      // todo 收集依赖
      track(target, key)
      return res
    },
    set(target, key, newValue, receiver) {
      const res = Reflect.set(target, key, newValue)
      // 触发依赖
      trigger(target, key)
      return res
    },
  })
}