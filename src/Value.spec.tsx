import React from "react"
import { mount } from "enzyme"
import { createValue, Value } from "./index"
import { act } from "react-dom/test-utils"

describe("Value", () => {
  it("creates value with initial state", () => {
    const value = new Value(1)

    expect(value.get()).toEqual(1)
  })

  it("resets state to initial state", () => {
    const value = new Value(1)
    value.set(2)

    expect(value.get()).toEqual(2)

    value.reset()
    expect(value.get()).toEqual(1)
  })

  it("resets with new initial state", () => {
    const value = new Value(1)
    value.set(2)

    expect(value.get()).toEqual(2)

    value.reset()

    expect(value.get()).toEqual(1)

    value.set(2)
    value.reset(3)

    expect(value.get()).toBe(3)

    value.set(2)
    value.reset()

    expect(value.get()).toBe(3)
  })

  it("listens", () => {
    const value = createValue(1)
    const callback = jest.fn()

    value.listen(callback)

    expect(callback).toHaveBeenCalledWith(1)
    expect(callback).toHaveBeenCalledTimes(1)

    value.set(2)

    expect(callback).toHaveBeenCalledWith(2)
    expect(callback).toHaveBeenCalledTimes(2)
  })

  it("uses state in react", async () => {
    const value = new Value(0)

    let renders = 0
    const Test = () => {
      renders++
      const [state] = value.use()

      return (
        <h1>{state}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("0")

    act(() => value.set(1))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")
  })
})