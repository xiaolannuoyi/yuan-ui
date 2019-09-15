## tip
:::tip
需要注意的是，覆盖字体路径变量是必需的，将其赋值为 Element 中 icon 图标所在的相对路径即可。
:::
## warning
:::warning
Input 为受控组件，它**总会显示 Vue 绑定值**。

通常情况下，应当处理 `input` 事件，并更新组件的绑定值（或使用`v-model`）。否则，输入框内显示的值将不会改变。

不支持 `v-model` 修饰符。
:::

## demo

:::demo
```html
<yuan-test></yuan-test>
```
:::