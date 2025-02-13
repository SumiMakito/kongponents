<template>
  <div class="k-tabs">
    <ul
      role="tablist"
      aria-label="ktabs">
      <li
        v-for="(tab, i) in tabs"
        :key="tab.hash"
        :aria-selected="activeTab === tab.hash ? 'true' : 'false'"
        :aria-controls="`panel-${i}`"
        :id="`${tab.hash.replace('#','')}-tab`"
        :class="{ active: activeTab === tab.hash }"
        tabindex="0"
        role="tab"
        class="tab-item"
        @keydown.enter.prevent="handleTabChange(tab.hash)"
        @keydown.space.prevent="handleTabChange(tab.hash)"
        @click="handleTabChange(tab.hash)">
        <a class="tab-link">
          <slot :name="`${tab.hash.replace('#','')}-anchor`">{{ tab.title }}</slot>
        </a>
      </li>
    </ul>

    <div
      v-for="(tab, i) in tabs"
      :key="tab.hash"
      :id="`panel-${i}`"
      :aria-labelledby="`${tab.hash.replace('#','')}-tab`"
      role="tabpanel"
      tabindex="0"
      class="tab-container">
      <slot
        v-if="activeTab === tab.hash"
        :name="tab.hash.replace('#','')" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'KTabs',
  props: {
    /**
     * Array of Tab objects [{hash: '#tab1', title: 'tab1'}, {hash: '#tab2', title: 'tab2'}]
     */
    tabs: {
      type: Array,
      required: true
    },
    /**
     * A set tab hash to use as default
     */
    value: {
      type: String,
      default: '',
      validator (value) {
        return value === '' || (value.includes('#') && !value.includes(' '))
      }
    }
  },

  data () {
    return {
      activeTab: this.value
        ? this.value
        : this.tabs[0].hash
    }
  },

  watch: {
    value (newTabHash) {
      this.activeTab = newTabHash
      this.$emit('changed', newTabHash)
    }
  },

  methods: {
    handleTabChange (tab) {
      this.activeTab = tab
      this.$emit('changed', tab)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.k-tabs {
  ul {
    display: flex;
    margin-bottom: var(--spacing-md, spacing(md));
    padding-left: 0;
    list-style: none;
    font-size: 18px;
    line-height: 20px;
    border-bottom: 2px solid var(--KTabsBottomBorderColor, var(--grey-300, color(grey-300)));

    .tab-item {
      position: relative;
      padding: var(--spacing-md, spacing(md));
      cursor: pointer;
      &:not(:first-of-type) { margin-left: var(--spacing-xs, spacing(xs)); }
      &:not(:last-of-type) { margin-right: var(--spacing-xs, spacing(xs)); }
      &:after {
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 2px;
        display: block;
        content: '';
      }
      &.active,
      &:hover {
        border-bottom: 4px solid var(--KTabBottomBorderColor, var(--teal-300, color(teal-300)));
        .tab-link { color: var(--KTabsActiveColor, var(--black-500, color(black-500))); }
      }
    }
    .tab-link {
      display: block;
      color: var(--KTabsColor, var(--black-45, color(black-45)));
      &:hover {
        text-decoration: none;
        border: none;
      }
    }
  }
}
</style>
