import { effect } from "../effect"
import { reactive } from "../reactive"

describe('effect', () => {
  it('happy path', () => {
    const raw = {foo: 1}
    const reactiveData = reactive(raw)
    let nextData
    effect(() => {
      nextData = reactiveData.foo + 1
    })
    expect(nextData).toBe(2)
    reactiveData.foo++
    expect(nextData).toBe(3)
  })
})