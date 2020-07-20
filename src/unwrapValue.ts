import { ObservableValue, ValueInitializer } from "./types"
import { isFunction } from "lodash"
import { Value } from "./Value"
import { createValue } from "./createValue"

export const unwrapValue = <TState>(initialState: ValueInitializer<TState | ObservableValue<TState>>): ObservableValue<TState> => {
  let value = isFunction(initialState) ? initialState() : initialState

  if ( ! (value instanceof Value)) {
    value = createValue(value) as ObservableValue
  }

  return value
}
