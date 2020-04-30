# @bytesoftio/use-value

## Installation

`yarn add @bytesoftio/use-value` or `npm install @bytesoftio/use-value`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [Usage](#usage)
  - [createValue](#createvalue)
  - [HookValue](#hookvalue)
  - [useValue](#usevalue)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

This package provides an abstraction on top of `setState`. It can be used as a
drop in replacement. It allows you to write services that will work inside
React, leveraging its hooks api, but also outside of React. It provides a
very simple, observable like object `HookValue`.

## Usage

### createValue

Create a simple observable value that can be hooked into any functional
component. Returns an instance of `HookValue`.

```ts
import React from "react"
import { createValue } from "@bytesoftio/use-value"

const globalCount = createValue(0)
```

###  HookValue

Whenever you create a new value through `createValue` or `useValue`, a new
instance of `HookValue` is created behind the scenes. It provides some useful
methods like `get`, `set`, `reset`, `listen` and `use`. Take a look at the
TypeScript definition to learn more about it.

```tsx
import React from "react"
import { createValue } from "@bytesoftio/use-value"

const globalCount = createValue(0)

// listen to value changes
globalCount.listen(newState => console.log(newState))

// get current state of 0
globalCount.get()

// change state to 3
globalCount.set(3)

// reset state back to its initial value of  0
globalCount.reset()

// change initial value to 2 and reset state
globalCount.reset(2)

// listen to state changes outside of React
globalCount.listen((state) => console.log(state))

// use value similar to how it's used in React
const [state, setState, resetState] = globalCount.use()

// use globalCount inside a component
const Component = () => {
  const [count, setCount] = globalCount.use()
  const increment = () => setCount(count + 1)
  
  return <button onClick={increment}>count: {count}</button>
}
```

### useValue

For convenience, this helper can be used to hook up a value inside a
component, similar to `HookValue.use()`.

```tsx
import React from "react"
import { useValue, createValue } from "@bytesoftio/use-value"

const globalCount = createValue(0)

const Component = () => {
  // hook up a new value, creates a new instance of HookValue behind the scenes
  const [count1, setCount1] = useValue(0)
  // use an initializer / factory
  const [count2, setCount2] = useValue(() => 0)
  // use an existing instance of HookValue
  const [count3, setCount3] = useValue(globalCount)
  
  const increment = () => setCount1(count1 + 1)

  return <button onClick={increment}>count: {count1}</button>
}
```