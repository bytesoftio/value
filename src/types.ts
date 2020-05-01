export interface ObservableValue<S = any> {
  state: S
  initialState: S

  get(): S
  set(newState: S): void
  reset(initialState?: S): void
  listen(callback: ValueCallback<S>, notifyImmediately?: boolean): void
}

export type ValueInitializer<T> = T | (() => T)
export type ValueCallback<S> = (newState: S) => void
export type ValueCallbackUnsubscribe = () => void
export type ValueReseter = () => void
export type ValueUpdater<S> = (newValue: S) => void
export type ValueDiffer<S> = (oldState: S, newState: S) => boolean
export type CreateValue = <S>(initialState: S) => ObservableValue<S>