# Switch

**KInputSwitch** is used a like checkbox and is meant to toggle settings on and
off.

<KInputSwitch v-model="defaultChecked" @change="handleToggle" />

```html
<template>
  <KInputSwitch v-model="defaultChecked" @change="handleToggle" />
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  },
  methods: {
    handleToggle(isChecked) {
      // do something, make api call?
    }
  }
}
</script>
```

## Props

### v-model - required

Use `v-model` to bind to the `checked` state of the underlying `<input />`. The
`v-model` binds to the `value` prop of the component and sets current checked
state of toggle switch. You can read more about passing values via `v-model`
[here](https://vuejs.org/v2/guide/components.html#Using-v-model-on-Components).

```html
<KInputSwitch v-model="isChecked" />
```

### label

Will place label text to the right of the switch. Can also be [slotted](#slots).

- `label`

```html
<KInputSwitch v-model="checked" :label="checked ? 'on' : 'off'" />
```

<KInputSwitch v-model="labelPropChecked" :label="labelPropChecked ? 'on' : 'off'" />

### labelPosition

- `label-position`

Position the label to the left or right of the switch, default to `right`.

<KInputSwitch v-model="labelPropChecked" label="Label on the right" />
<br>
<br>
<KInputSwitch v-model="labelPropChecked" label="Label on the left" labelPosition="left" />

```html
<KInputSwitch label="Label on the right" />
<KInputSwitch label="Label on the left" label-position="left" />
```

### disabled

You can add `disabled` to the input to disallow interactivity.

- `disabled`

```html
<KInputSwitch v-model="checked" label="disabled" disabled />
```

<KInputSwitch v-model="labelPropChecked" label="disabled" disabled />

### disabledTooltipText

You can specify tooltip text to be displayed when the switch is disabled.

- `disabledTooltipText`

```html
<KInputSwitch
  v-model="checked"
  label="disabled"
  disabled
  disabledTooltipText="I'm disabled!"
/>
```

<KInputSwitch
  v-model="labelPropChecked"
  label="disabled"
  disabled
  disabledTooltipText="I'm disabled!"
/>

### enabledIcon

Display a check icon when switch is enabled

- `enabledIcon`

```html
<KInputSwitch
  v-model="enabledIconChecked"
  :label="enabledIconChecked ? 'Enabled' : 'Disabled'"
  enabled-icon
/>
```

<KInputSwitch
  v-model="enabledIconChecked"
  :label="enabledIconChecked ? 'Enabled' : 'Disabled'"
  enabled-icon
/>

## Slots

- `label`

<KInputSwitch v-model="labelChecked">
  <template v-slot:label>
    {{ labelText}}
  </template>
</KInputSwitch>

```html
<template>
  <KInputSwitch v-model="checked">
    <template v-slot:label>
      {{ labelText }}
    </template>
  </KInputSwitch>
</template>

<script>
export default {
  data() {
    return {
      checked: false
    }
  },
  computed: {
    labelText() {
      return this.checked ? 'Yay!' : 'Boo'
    }
  }
}
</script>
```

## Theming

| Variable                   | Purpose                           |
| :------------------------- | :-------------------------------- |
| `--KInputSwitchBackground` | Switch off state background color |
| `--KInputSwitchOn`         | Switch on background color        |
| `--KInputSwitchLabel`      | Label font color                  |

\
An Example of changing the success KInputSwitch on color to pink instead of Kong's
primary blue might look like.

> Note: We are scoping the overrides to a wrapper in this example

<template>
  <div class="switch-wrapper">
    <KInputSwitch v-model="themeChecked" />
  </div>
</template>

```html
<template>
  <div class="switch-wrapper">
    <KInputSwitch v-model="checked" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: true
    }
  }
}
</script>

<style>
.switch-wrapper {
  --KInputSwitchOn: hotpink;
  --KInputSwitchBackground: black;
}
</style>
```

<style lang="scss">
.switch-wrapper {
  --KInputSwitchOn: hotpink;
  --KInputSwitchBackground: black;
}
</style>

<script>
export default {
  data () {
    return {
      labelPropChecked: false,
      defaultChecked: false,
      labelChecked: false,
      themeChecked: true,
      enabledIconChecked: true,
    }
  },
  computed: {
    labelText () {
      return this.labelChecked
        ? 'Yay!'
        : 'Boo'
    },
  },
  methods: {
    handleToggle (isChecked) {
      console.log('Toggled to: ' + isChecked)
    }
  }
}
</script>
