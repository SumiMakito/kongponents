# Multi Select

**KMultiSelect** - This should be a description of the Kongponent.

<KMultiSelect />

```html
<template>
  <KMultiSelect />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props) {
    // ... code goes here
  }
})
</script>
```

## Props

### examplePropName

Description of `examplePropName`

Actual component using examplePropName

<KMultiSelect :examplePropName="true" />

```html
<KMultiSelect examplePropName="variation1" />
<KMultiSelect examplePropName="variation2" />
<KMultiSelect examplePropName="variation3" />
```

## Slots

- `default` - default slot description
- `slotName` - slot description

```html
<KMultiSelect>
  here is some slot content
</KMultiSelect>
```

## Events

- `@changed` - Emitted when...

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KMultiSelectBorderColor`| KMultiSelect border color

An Example of changing the border color of KMultiSelect to lime might look
like:

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="KMultiSelect-wrapper">
    <KMultiSelect />
  </div>
</template>

```html
<template>
  <div class="KMultiSelect-wrapper">
    <KMultiSelect />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup (props) {
    // ... code goes here
  }
})
</script>

<style lang="scss">
.KMultiSelect-wrapper {
  --KMultiSelect-wrapperBorderColor: lime;
}
</style>
```

<style lang="scss">
.KMultiSelect-wrapper {
  --KMultiSelect-wrapperBorderColor: lime;
}
</style>
