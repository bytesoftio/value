import { HookValue, ValueCallback, ValueDiffer } from "./types"

export class ValueListener<V> {
  callback: ValueCallback<V>
  value: HookValue<V>
  oldState: V
  differ: ValueDiffer<V>

  constructor(
    callback: ValueCallback<V>,
    value: HookValue<V>,
    differ: ValueDiffer<V>,
  ) {
    this.callback = callback
    this.value = value
    this.oldState = undefined as any
    this.differ = differ
  }

  notify(newState: V) {
    const isDifferent = this.differ(this.oldState, newState)

    if (isDifferent) {
      this.oldState = newState
      this.callback(newState)
    }
  }
}