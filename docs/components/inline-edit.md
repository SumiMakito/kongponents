# Inline Edit

**KInlineEdit** - A wrapper which adds inline edit capability. Currently only supports single text input.

<Komponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
  <KInlineEdit @changed="newVal => data.inlineText = newVal"><h3>{{ data.inlineText }}</h3></KInlineEdit>
</Komponent>

> The `Komponent` component is used in this example to create state.

```html
<Komponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
  <KInlineEdit>
    <h3>{{ data.inlineText }}</h3>
  </KInlineEdit>
</Komponent>
```

## Props

### ignoreValue

If true, will not set the value of the input when enabled/clicked. This is useful to control placeholder style text

<Komponent :data="{ inlineText: '' }" v-slot="{ data }">
  <KInlineEdit :ignore-value="data.inlineText.length === 0" @changed="newVal => data.inlineText = newVal"><p>{{ data.inlineText || 'cool placeholder' }}</p></KInlineEdit>
</Komponent>

> The `Komponent` component is used in this example to create state.

```html
<Komponent :data="{ inlineText: '' }" v-slot="{ data }">
  <KInlineEdit
    :ignore-value="data.inlineText.length === 0"
    @changed="newVal => data.inlineText = newVal">
    <p>{{ data.inlineText || 'cool placeholder' }}</p>
  </KInlineEdit>
</Komponent>
```

### styleOverrides

Styles to set when the input is active. Useful when styling the default state differently.

<Komponent :data="{ inlineText: '' }" v-slot="{ data }">
  <KInlineEdit :ignore-value="data.inlineText.length === 0" :style-overrides="{color: 'var(--black-85)'}" @changed="newVal => data.inlineText = newVal"><p :class="data.inlineText.length > 0 ? 'color-black-85' :'color-black-45 text-italic'">{{ data.inlineText || 'cool placeholder' }}</p></KInlineEdit>
</Komponent>

> The `Komponent` component is used in this example to create state.

```html
<Komponent :data="{ inlineText: '' }" v-slot="{ data }">
  <KInlineEdit
    :ignore-value="data.inlineText.length === 0"
    :style-overrides="{ color: 'var(--black-85)' }"
    @changed="newVal => data.inlineText = newVal">
    <p :class="data.inlineText.length > 0 ? 'color-black-85' :'color-black-45 text-italic'">
      {{ data.inlineText || 'cool placeholder' }}
    </p>
  </KInlineEdit>
</Komponent>
```

### `@changed`

Emitted blurred away from the editing input or when enter is pressed.

When clicking out of the input `@changed` will fire and emit the value. Can be used to reset the outside data.

:::tip
While the component itself does not protect against returning empty an empty value, it is advised to do a check at the implementation layer to ensure empty & validation are accounted for.
:::

<KCard>
  <template v-slot:body>
    <Komponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
      <div>
        Updated: {{ data.inlineText }}
        <KInlineEdit @changed="newVal => { if(newVal.length) { data.inlineText = newVal } else { alert('cannot be empty') } }">
          <h3>{{ data.inlineText }}</h3>
        </KInlineEdit>
      </div>
    </Komponent>
  </template>
</KCard>

> The `Komponent` component is used in this example to create state.

```html
<Komponent :data="{ inlineText: 'Click to edit me' }" v-slot="{ data }">
  <div>
    Updated: {{ data.inlineText }}
    <KInlineEdit @changed="newVal => { if(newVal.length) { data.inlineText = newVal } else { alert('cannot be empty') } }">
      <h3>{{ data.inlineText }}</h3>
    </KInlineEdit>
  </div>
</Komponent>
```

## Slots

- `default` - Content to be edited

:::warning
An HTML element must be passed in the slot. An error will be thrown if not passed.

```html
<!-- good -->
<KInlineEdit>
  <p>Some text</p>
</KInlineEdit>

<!-- bad -->
<KInlineEdit>
  Some text
</KInlineEdit>
```

:::

## Theming

:lipstick: To theme, reference [KInput](/components/input.html#theming). The input takes up 100% of its parent container. To change, add a class or width styling to the wrapping component.

<Komponent :data="{ inlineText: 'Im 50%!' }" v-slot="{ data }">
  <KInlineEdit class="w-50" @changed="newVal => data.inlineText = newVal"><h3>{{ data.inlineText }}</h3></KInlineEdit>
</Komponent>

```html
<KInlineEdit
  class="w-50"
  @changed="newVal => text = newVal">
  <h3>{{ text }}</h3>
</KInlineEdit>
```

<script>
export default {
  methods: {
    alert(msg) {
      window.alert(msg)
    }
  }
}
</script>

<style>
.text-italic { font-style: italic; }
</style>
