<template>
  <label class="k-radio">
    <input
      :checked="isSelected"
      v-bind="$attrs"
      type="radio"
      class="k-input"
      @click="handleClick">
    <slot />
  </label>
</template>

<script>
export default {
  name: 'KRadio',

  inheritAttrs: false,

  model: {
    prop: 'model',
    event: 'change'
  },

  props: {
    model: {
      type: [String, Number, Boolean, Object],
      required: true
    },
    /**
     * Sets whether or not radio is selected
     */
    value: {
      type: [String, Number, Boolean, Object],
      default: 'on'
    }
  },

  computed: {
    isSelected () {
      return this.model === this.value
    }
  },

  methods: {
    handleClick () {
      this.$emit('change', this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '~@kongponents/styles/variables';
  @import '~@kongponents/styles/forms/checkbox-radio';
</style>
