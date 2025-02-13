<template>
  <section
    :class="{ 'is-error': isError }"
    class="empty-state-wrapper"
  >
    <div class="empty-state-title">
      <div
        v-if="isError || icon"
        :class="{ 'warning-icon': isError }"
        class="k-empty-state-icon card-icon mb-3"
      >
        <KIcon
          :size="iconSize"
          :icon="icon ? icon : 'warning'"
          :color="isError ? iconColor || 'var(--black-70)' : iconColor"
          :secondary-color="isError ? 'var(--yellow-400)' : null" />
      </div>
      <div class="k-empty-state-title-header mt-4 mb-4">
        <slot name="title"/>
      </div>
    </div>
    <div class="empty-state-content">
      <div class="k-empty-state-message mb-6">
        <slot name="message"/>
      </div>
      <div class="k-empty-state-cta">
        <slot name="cta">
          <KButton
            v-if="!ctaIsHidden"
            appearance="primary"
            size="small"
            @click.native="() => handleClick && handleClick()">
            {{ ctaText }}
          </KButton>
        </slot>
      </div>
    </div>
  </section>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KEmptyState',
  components: { KButton, KIcon },
  props: {
    isError: {
      type: Boolean,
      default: false
    },
    iconSize: {
      type: String,
      default: '50'
    },
    icon: {
      type: String,
      default: ''
    },
    ctaIsHidden: {
      type: Boolean,
      default: false
    },
    ctaText: {
      type: String,
      default: ''
    },
    handleClick: {
      type: Function,
      default: null
    },
    iconColor: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.empty-state-wrapper {
  padding: 48px 0;
  text-align: center;
  border-radius: 4px;
  background-color: var(--KEmptyBackground, var(--white));
}
.empty-state-wrapper .k-empty-state-title-header {
  color: var(--KEmptyTitleColor, var(--black-500));
  margin: 0 0 14px;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
}
.empty-state-wrapper .k-empty-state-message {
  color: var(--KEmptyContentColor, var(--black-400));
  margin: 0 auto 14px;
  font-size: 13px;
  line-height: 20px;
  max-width: 50%;
}
.empty-state-wrapper .k-empty-state-cta {
  margin: 0;
  margin-left: auto;
  margin-right: auto;
}
</style>
