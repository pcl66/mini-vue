import { track, trigger } from "./effect"

export function reactive(raw) {
  return new Proxy(raw, {
    get(target, p, receiver) {
      const res = Reflect.get(target, p)
      // todo 收集依赖
      track(target, p)
      return res
    },
    set(target, p, newValue, receiver) {
      const res = Reflect.set(target, p, newValue)
      trigger(target, p)
      return res
    },
  })
}