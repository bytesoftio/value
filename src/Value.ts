import { useEffect, useState } from "react"
import { HookKind, HookValue, ValueCallback, ValueDiffer, ValueSpread } from "./types"
import { ValueListener } from "./ValueListener"
import { defaultDiffer } from "./defaultDiffer"

export class Value<S> implements HookValue<S> {
  initialState: S
  state: S
  differ: ValueDiffer<any>
  listeners: ValueListener<S>[]

  constructor(
    initialState: S,
    differ: ValueDiffer<S> = defaultDiffer,
  ) {
    this.initialState = initialState
    this.state = this.initialState
    this.differ = differ
    this.listeners = []
  }

  get(): S {
    return this.state
  }

  set(newState: S) {
    const isDifferent = this.differ(this.state, newState)

    if (isDifferent) {
      this.state = newState
      this.notify()
    }
  }

  reset(initialState?: S) {
    if (initialState !== undefined) {
      this.initialState = initialState
    }

    this.set(this.initialState)
  }

  listen(callback: ValueCallback<S>) {
    return this.addListener(callback, "plain")
  }

  use(): ValueSpread<S> {
    try {
      const [state, setState] = useState({ state: this.state })

      useEffect(() => {
        // try to hook into a component, whenever the state changes outside of react, it needs to be updated inside
        // react too, this is basically what happens here, returns a clean up function to unsubscribe from the value
        // whenever the component un-mounts
        return this.addListener((newState) => setState({ state: newState }), "react")
      }, [])
    } catch (err) {
    }

    return this.unpack()
  }

  protected unpack(): ValueSpread<S> {
    return [
      this.state,
      (newState) => this.set(newState),
      () => this.reset(),
    ]
  }

  protected addListener(callback: ValueCallback<S>, hookKind: HookKind = "react") {
    const listener = new ValueListener<S>(callback, this, this.differ)
    this.listeners.push(listener)

    if (hookKind === "plain") {
      listener.notify(this.state)
    }

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach(listener => listener.notify(this.state as any))
  }
}