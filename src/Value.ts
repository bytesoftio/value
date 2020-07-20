import { ObservableValue, ValueCallback, ValueCallbackUnsubscribe, ValueDiffer } from "./types"
import { ValueListener } from "./ValueListener"
import { defaultDiffer } from "./defaultDiffer"

export class Value<TState> implements ObservableValue<TState> {
  initialState: TState
  state: TState
  differ: ValueDiffer<any>
  listeners: ValueListener<TState>[]

  constructor(
    initialState: TState,
    differ: ValueDiffer<TState> = defaultDiffer,
  ) {
    this.initialState = initialState
    this.state = this.initialState
    this.differ = differ
    this.listeners = []
  }

  get(): TState {
    return this.state
  }

  set(newState: TState) {
    const isDifferent = this.differ(this.state, newState)

    if (isDifferent) {
      this.state = newState
      this.notify()
    }
  }

  reset(initialState?: TState) {
    if (initialState !== undefined) {
      this.initialState = initialState
    }

    this.set(this.initialState)
  }

  listen(callback: ValueCallback<TState>, notifyImmediately = true): ValueCallbackUnsubscribe {
    const listener = new ValueListener<TState>(callback, this.differ)

    this.listeners.push(listener)

    if (notifyImmediately) {
      listener.notify(this.state)
    }

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach(listener => listener.notify(this.state))
  }
}
