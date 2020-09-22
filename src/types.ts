export interface ObservableValue<TState = any> {
  state: TState
  initialState: TState

  get(): TState
  set(newState: TState): void
  reset(initialState?: TState): void
  listen(callback: ValueCallback<TState>, notifyImmediately?: boolean): ValueCallbackUnsubscribe
}

export type ValueInitializer<TState> = TState | (() => TState)
export type ValueCallback<TState> = (newState: TState) => void
export type ValueCallbackUnsubscribe = () => void
export type ValueDiffer<TState> = (oldState: TState, newState: TState) => boolean
export type CreateValue = <TState>(initialState: TState) => ObservableValue<TState>
