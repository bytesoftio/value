import { useState } from "react"
import { UseValue } from "./types"
import { unwrapValue } from "./unwrapValue"

export const useValue: UseValue = <S>(initialState) => {
  const [value] = useState(() => unwrapValue<S>(initialState))

  return value.use()
}