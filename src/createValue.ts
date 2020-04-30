import { CreateValue } from "./types"
import { Value } from "./Value"

export const createValue: CreateValue = (initialState?) => new Value(initialState)