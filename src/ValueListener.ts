import { ValueCallback, ValueDiffer } from "./types"

export class ValueListener<TState> {
  callback: ValueCallback<TState>
  state: TState
  differ: ValueDiffer<TState>

  constructor(
    callback: ValueCallback<TState>,
    differ: ValueDiffer<TState>,
  ) {
    this.callback = callback
    this.state = undefined as any
    this.differ = differ
  }

  notify(newState: TState) {
    const isDifferent = this.differ(this.state, newState)

    if (isDifferent) {
      this.state = newState
      this.callback(newState)
    }
  }
}
