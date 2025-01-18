import { effect } from "../effect"
import { reactive } from "../reactive"

/**
 *
 */
describe('effect', () => {

  // effect主流程
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

  // effect 返回runner函数
  it('show return runner when call effect', () => {
    let foo = 10

    const runner = effect(() => {
      foo++
      return 'foo'
    })

    expect(foo).toBe(11)
    const result = runner()
    expect(foo).toBe(12)
    expect(result).toBe('foo')
  })

  it('scheduler', () => {
    let dummy
    let run

    const scheduler = jest.fn(() => {
      run = runner
    })

    const obj = reactive({foo: 1})
    const runner = effect(() => {
      dummy = obj.foo
    },{
      scheduler
    })
    expect(scheduler).not.toHaveBeenCalled()
    expect(dummy).toBe(1)
    obj.foo++
    // first trigger should call scheduler
    expect(scheduler).toHaveBeenCalledTimes(1)
    // should not run yet
    expect(dummy).toBe(1)
    // manual run
    run()
    expect(dummy).toBe(2)
  })
})