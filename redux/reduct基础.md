# redux 基础

## 核心概念

### store

`store` 是一棵树，存储了所有的 `state`。

```javascript
import { createStore } from 'redux';

let store = createStore(reducer, defaultState);
let { getState, subscribe, dispatch } = store;
```


### reducer

`reducer` 是个纯函数，接收旧的 `state` 和 `action`，返回新的 `state`

```javascript
function todoApp(state=initialState, action) {
  switch(action.type) {
    case 'type1':
      return { ...state, action.payload };
    default:
      return state;
  }
}
```

永远不要在 `reducer` 里面做如下操作：

- 修改传入参数
- 执行有副作用的操作，如修改系统变量
- 调用非纯函数，如 `Date.now()` 或 `Math.random`

注意：

- 不要修改 `state` 的值，用 `Object.assign({}, state, {***})` 或 解构 赋值的方式
- 在 `default` 情况下返回旧的 `state`。在遇到未知的 `action` 时，一定要返回旧的 `state`。

### action

`action` 是个对象，必须包含 `type` 属性，其它属性随意，但是最好遵循 [Flux 标准 Action](https://github.com/redux-utilities/flux-standard-action)。

```javascript
{
  type: 'type1',
  payload: {

  },
  meta: {},
  error: {}
}
```


## 三大原则

- 单一数据源
- state 是只读的
- 使用纯函数来执行修改

