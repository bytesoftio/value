import React from "react"
import { mount } from "enzyme"
import { createValue, useValue } from "./index"
import { act } from "react-dom/test-utils"

describe("useValue", () => {
  it("uses new value", async () => {
    let receivedSetState

    let renders = 0
    const Component = () => {
      const [state, setState] = useValue(0)
      receivedSetState = setState
      renders++

      return (
        <h1>{state}</h1>
      )
    }

    const wrapper = mount(<Component/>)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("0")

    act(() => receivedSetState(1))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")

    act(() => receivedSetState(1))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")
  })

  it("uses new value with initializer", () => {
    const initializer = () => 1

    const Test = () => {
      const [value] = useValue(initializer)

      return (
        <h1>{value}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("1")
  })

  it("uses value", () => {
    const value = createValue(1)

    const Test = () => {
      const [count] = useValue(value)

      return (
        <h1>{count}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("1")
  })

  it("uses value with initializer", () => {
    const initializer = () => createValue(1)

    const Test = () => {
      const [count] = useValue(initializer)

      return (
        <h1>{count}</h1>
      )
    }

    const wrapper = mount(<Test/>)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("1")
  })
})