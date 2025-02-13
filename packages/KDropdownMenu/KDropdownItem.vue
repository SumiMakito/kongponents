<template>
  <li
    :class="{
      'has-divider': type !== 'link' && hasDivider,
      'disabled': type === 'default' && disabled,
      'danger': isDangerous,
      'k-dropdown-selected-option': selected
    }"
    :data-testid="`k-dropdown-item-${label.replace(' ', '-')}`"
    class="k-dropdown-item w-100"
  >
    <router-link
      v-if="type === 'link' && to"
      :to="!disabled ? to : $router.currentRoute.path"
      :class="{ 'disabled': disabled, 'has-divider': hasDivider }"
      class="k-dropdown-item-trigger"
      data-testid="k-dropdown-item-trigger"
    >
      <slot>{{ label }}</slot>
    </router-link>
    <KButton
      v-else-if="type === 'button'"
      :disabled="disabled"
      :is-rounded="false"
      class="k-dropdown-item-trigger btn-link k-button non-visual-button"
      data-testid="k-dropdown-item-trigger"
      v-on="listeners"
      @click="handleClick"
    >
      <slot>{{ label }}</slot>
    </KButton>
    <div
      v-else
      class="k-dropdown-item-trigger"
      data-testid="k-dropdown-item-trigger"
    >
      <slot>{{ label }}</slot>
    </div>
  </li>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'

export default {
  name: 'KDropdownItem',
  components: { KButton },
  props: {
    item: {
      type: Object,
      default: null,
      // Items must have a label
      validator: (item) => item.label !== undefined
    },
    /**
     * Use this prop to add a divider above the item.
     */
    hasDivider: {
      type: Boolean,
      default: false
    },
    isDangerous: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    selected: {
      type: Boolean,
      default: false
    },
    /**
     * Internal use only - for tracking selection in conjunction with items prop.
     */
    selectionMenuChild: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    type () {
      if (this.item && this.item.to) {
        return 'link'
      } else if (this.$listeners.click || this.selectionMenuChild) {
        // checking $listeners since we deleted click from listeners
        return 'button'
      }

      return 'default'
    },
    label () {
      return (this.item && this.item.label) || ''
    },
    to () {
      return (this.item && this.item.to) || undefined
    },
    listeners () {
      const listeners = { ...this.$listeners }

      // use @click in template and emit
      delete listeners['click']

      return listeners
    }
  },
  methods: {
    handleClick (evt) {
      this.$emit('click', evt)

      if (this.selectionMenuChild) {
        this.$emit('change', this.item)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

li.k-dropdown-item {
  display: flex;
  align-items: center;
  font-size: 1rem;
  line-height: 1;

  &.has-divider {
    $k-dropdown-item-divider-container-height: 24px; // set to the same value as --spacing-lg without the units
    $k-dropdown-item-divider-position: -13px; // this should be negative (<container-height> / 2 + 1)
    position: relative;
    margin-top: $k-dropdown-item-divider-container-height;

    &:before {
      position: absolute;
      display: block;
      content: '';
      height: 1px;
      width: 100%;
      top: $k-dropdown-item-divider-position;
      background: var(--grey-200);
    }
  }

  svg {
    margin-right: .75rem;
  }

  &:hover {
    background-color: var(--grey-100);
  }

  .k-dropdown-item-trigger {
    text-align: left;
    padding: var(--spacing-md) var(--spacing-lg);
    text-decoration: none;
    width: 100%;
    color: var(--black-70);

    &:disabled,
    &.disabled {
      cursor: not-allowed !important;
      color: var(--grey-400) !important;

      &:hover {
        background-color: var(--grey-200) !important;
      }
    }
  }

  &.danger {
    button:not(:disabled),
    a:not(:disabled) {
      color: var(--red-500);
      transition: all 300ms;

      &:hover {
        color: var(--red-500);
      }
    }
  }
}
</style>

<style lang="scss">
.k-dropdown-item {
  a, button {
    &.k-dropdown-item-trigger {
      text-decoration: none !important;
    }
  }
}
</style>
