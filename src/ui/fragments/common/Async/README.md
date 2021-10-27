# Example usage

```typescript
export interface IAsyncButtonProps {
  buttonProps: IButtonProps
  functionAndArgs?: IAsyncFunctionAndArgsType
}

const LoadingComponent = <div>Loading...</div>
const ErrorComponent = (error: Error) => <div>{error.stack}</div>

export const AsyncButton = (props: IAsyncButtonProps) => {
  const Component = React.useCallback(
    (label: string) => (
      <Button {...props.buttonProps} label={label}></Button>
    ),
    [props.buttonProps]
  )

  const asyncViews: IAsyncViewsPropType = {
    component: Component,
    errorComponent: ErrorComponent,
    loadingComponent: LoadingComponent
  }
  const asyncFunction: IAsyncFunctionAndArgsType = {
    promiseFunction: async () =>
      Promise.resolve()
        .then(PromiseUtils.sleeper(3 * 1000))
        .then(() => 'example data')
  }
  return (
    <AsyncComponent
      views={asyncViews}
      functionAndArgs={props.functionAndArgs ?? asyncFunction}
    />
  )
}
```
