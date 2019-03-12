# refs

## 使用场景

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries.

## 创建方式

### 字符串 

> 不推荐这种方式

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    this.myRef = this.refs.myRef;
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```



### 回调函数

```jsx
class MyComponent extends React.Component {
  render() {
    return <div ref={(node)=>this.myRef=node} />;
  }
}
```



### 直接创建

 `React.createRef()`

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```