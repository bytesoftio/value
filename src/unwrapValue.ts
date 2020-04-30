import { HookValue, ValueInitializer } from "./types"
import { isFunction } from "lodash"
import { Value } from "./Value"
import { createValue } from "./createValue"

export const unwrapValue = <S>(initialState: ValueInitializer<S | HookValue<S>>): HookValue<S> => {
  let value = isFunction(initialState) ? initialState() : initialState

  if ( ! (value instanceof Value)) {
    value = createValue(value) as HookValue
  }

  return value
}