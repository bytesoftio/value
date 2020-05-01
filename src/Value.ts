import { ObservableValue, ValueCallback, ValueCallbackUnsubscribe, ValueDiffer } from "./types"
import { ValueListener } from "./ValueListener"
import { defaultDiffer } from "./defaultDiffer"

export class Value<S> implements ObservableValue<S> {
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

  listen(callback: ValueCallback<S>, notifyImmediately = true): ValueCallbackUnsubscribe {
    const listener = new ValueListener<S>(callback, this, this.differ)

    this.listeners.push(listener)

    if (notifyImmediately) {
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