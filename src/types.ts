export interface HookValue<S = any> {
  state: S
  initialState: S

  get(): S
  set(newState: S): void
  reset(initialState?: S): void

  listen(callback: ValueCallback<S>): void
  use(): ValueSpread<S>
}

export type ValueInitializer<T> = T | (() => T)
export type HookKind = "react" | "plain"
export type ValueCallback<S> = (newState: S) => void
export type ValueSpread<S> = [S, ValueUpdater<S>, ValueReseter]
export type ValueReseter = () => void
export type ValueUpdater<S> = (newValue: S) => void
export type ValueDiffer<S> = (oldState: S, newState: S) => boolean
export type CreateValue = <S>(initialState: S) => HookValue<S>
export type UseValue = <S>(initialState: S | HookValue<S> | (() => S | HookValue<S>)) => ValueSpread<S>