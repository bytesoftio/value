# @bytesoftio/value

## Installation

`yarn add @bytesoftio/value or `npm install `@bytesoftio/value`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [createValue](#createvalue)
- [ObservableValue](#observablevalue)
- [Usage in React](#usage-in-react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

This package provides a generic observable value that can be used in any environment. Additionally there is the [@bytesoftio/use-value](https://github.com/bytesoftio/use-value) package that provides a seemless integration with React hooks. This allows you to write services that would work inside React, leveraging its hooks api, but also outside of React. It provides a very simple, observable like object `ObservableValue`.

## createValue

Create a simple observable value that can be hooked into any functional component. Returns an instance of `ObservableValue`.

```ts
import { createValue } from "@bytesoftio/value"

const count = createValue(0)
```

##  ObservableValue

Whenever you create a new value through `createValue`, a new instance of `ObservableValue` is created behind the scenes. It provides some convenient methods for working with data.

```tsx
import React from "react"
import { createValue } from "@bytesoftio/value"

const globalCount = createValue(0)

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
```

## Usage in React

To learn how to use this package in combination with React, please refer to [@bytesoftio/use-value](https://github.com/bytesoftio/use-value) package. 