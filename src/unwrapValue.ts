import { ObservableValue, ValueInitializer } from "./types"
import { isFunction } from "lodash"
import { Value } from "./Value"
import { createValue } from "./createValue"

export const unwrapValue = <S>(initialState: ValueInitializer<S | ObservableValue<S>>): ObservableValue<S> => {
  let value = isFunction(initialState) ? initialState() : initialState

  if ( ! (value instanceof Value)) {
    value = createValue(value) as ObservableValue
  }

  return value
}