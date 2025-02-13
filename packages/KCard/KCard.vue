<template>
  <section
    :class="[borderVariant, {'hover': hasHover, 'kcard-shadow': hasShadow }]"
    :aria-label="title ? title : null"
    :aria-labelledby="!title && ($scopedSlots.title || $slots.title) ? titleId : null"
    :aria-describedby="contentId"
    class="kong-card">
    <div
      v-if="$scopedSlots.actions || useStatusHatLayout || (!useStatusHatLayout && (title || $scopedSlots.title || $slots.title))"
      :class="{ 'has-status': status || $scopedSlots.statusHat }"
      class="k-card-header d-flex mb-3">
      <div
        v-if="status || $scopedSlots.statusHat"
        class="k-card-status-hat">
        <!-- @slot Use this slot to pass status text above title -->
        <slot name="statusHat">{{ status }}</slot>
      </div>

      <div
        v-if="!useStatusHatLayout && (title || $scopedSlots.title || $slots.title)"
        :id="title ? null : titleId"
        class="k-card-title mb-3">
        <h4>
          <!-- @slot Use this slot to pass title content -->
          <slot name="title">{{ title }}</slot>
        </h4>
      </div>

      <div class="k-card-actions">
        <!-- @slot Use this slot to pass actions to right side of header -->
        <slot name="actions"/>
      </div>
    </div>

    <div
      v-if="useStatusHatLayout && (title || $scopedSlots.title || $slots.title)"
      :id="title ? null : titleId"
      class="k-card-title mb-3">
      <h4>
        <!-- @slot Use this slot to pass title content -->
        <slot name="title">{{ title }}</slot>
      </h4>
    </div>

    <div class="k-card-content d-flex">
      <div
        :id="contentId"
        class="k-card-body">
        <!-- @slot Use this slot to pass in body content -->
        <slot name="body">{{ body }}</slot>
      </div>

      <div
        v-if="$scopedSlots.notifications"
        class="k-card-notifications ml-3">
        <slot name="notifications" />
      </div>
    </div>
  </section>
</template>

<script>
import { uuid } from 'vue-uuid'

export default {
  name: 'KCard',

  props: {
    /**
     * Title string if slot not used, also used for aria-label
     */
    title: {
      type: String,
      default: ''
    },

    /**
     * Pass body string in if slot not used
     */
    body: {
      type: String,
      default: ''
    },
    /**
      * Set top border or no border. If neither set default will have border<br>
      * Options: [borderTop, noBorder]
      */
    borderVariant: {
      type: String,
      default: 'border'
    },
    /**
      * Sets if card has hover state<br>
      */
    hasHover: {
      type: Boolean,
      default: false
    },

    hasShadow: {
      type: Boolean,
      default: false
    },

    /**
     * Add small status text above the card title
     */
    status: {
      type: String,
      default: ''
    },

    /**
     * Test mode - for testing only, strips out generated ids
     */
    testMode: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      titleId: !this.testMode ? uuid.v1() : 'test-title-id-1234',
      contentId: !this.testMode ? uuid.v1() : 'test-content-id-1234'
    }
  },

  computed: {
    useStatusHatLayout () {
      return this.status || this.$scopedSlots.statusHat
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/_variables.scss';

.kong-card {
  padding: var(--KCardPaddingY, var(--spacing-lg)) var(--KCardPaddingX, var(--spacing-lg));
  border-radius: var(--KCardBorderRadius, 3px);
  background-color: var(--KCardBackground, var(--white, color(white)));

  &.noBorder {
    border: none;
  }

  &.border {
    border: var(--KCardBorder, 1px solid var(--black-10, color(black-10)));
    box-shadow: none;
  }

  &.borderTop {
    border-top: var(--KCardBorder, 1px solid var(--black-10, color(black-10)));
  }

  &.hover:hover, &.kcard-shadow {
    box-shadow: var(--KCardShadow, 0 4px 8px var(--black-10, color(black-10)));
  }

  .k-card-header {
    align-items: center;

    &.has-status {
      align-items: flex-start;
    }

    .k-button {
      min-height: 38px;
    }
  }

  .k-card-status-hat {
    font-size: var(--type-xs);
    color: var(--grey-600);
    display: flex;
    align-items: center;
  }

  .k-card-title h4 {
    margin: 0;
    font-size: var(--KCardTitleFontSize, 20px);
    font-weight: 600;
    color: var(--KCardTitleColor, var(--black-500));
  }

  .k-card-actions  {
    margin-left: auto;
  }

  .k-card-body {
    font-size: 13px;
    line-height: 20px;
    color: var(--grey-600);
    width: 100%;
  }

  .k-card-notifications {
    margin-left: auto;
    margin-top: auto;
  }
}
</style>
