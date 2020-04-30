import { isEqual } from "lodash"
import { ValueDiffer } from "./types"

export const defaultDiffer: ValueDiffer<any> = (oldState, newState) => ! isEqual(oldState, newState)