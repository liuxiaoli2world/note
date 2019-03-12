# forwarding-refs

`props` 可以向下传递，`ref` 不能，有了 `forwardingRef` 就可以了。

```jsx
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

>Note
>
>The second `ref` argument only exists when you define a component with `React.forwardRef`call. Regular function or class components don’t receive the `ref` argument, and ref is not available in props either.
>
>Ref forwarding is not limited to DOM components. You can forward refs to class component instances, too.