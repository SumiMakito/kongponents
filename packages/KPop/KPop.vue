<template>
  <component
    :is="tag"
    :id="$scopedSlots.default ? targetId : null"
    :aria-expanded="$scopedSlots.default ? isOpen : null"
    :aria-controls="$scopedSlots.default ? popoverId : null"
    :role="$scopedSlots.default ? 'button' : null"
    @keydown.enter="e => handleClick(e)"
    @keydown.esc="hidePopper">
    <slot>
      <KButton
        :id="targetId"
        :aria-expanded="isOpen"
        :aria-controls="popoverId"
        data-testid="kpop-button">
        {{ buttonText }}
      </KButton>
    </slot>
    <div
      v-if="isSvg">
      <foreignObject>
        <div
          v-show="isOpen"
          ref="popper"
          :id="popoverId"
          :style="popoverStyle"
          :class="popoverClassObj"
          role="region"
          class="k-popover">
          <div
            v-if="$scopedSlots.title || title || $scopedSlots.actions"
            class="k-popover-header d-flex">
            <div
              v-if="$scopedSlots.title || title"
              class="k-popover-title">
              <slot name="title">{{ title }}</slot>
            </div>
            <div
              v-if="$scopedSlots.actions"
              class="k-popover-actions">
              <slot name="actions" />
            </div>
          </div>
          <div class="k-popover-content">
            <slot name="content"/>
          </div>
          <div
            v-if="$scopedSlots.footer"
            class="k-popover-footer">
            <slot name="footer" />
          </div>
        </div>
      </foreignObject>
    </div>
    <transition
      v-else
      name="fade">
      <div
        v-show="isOpen"
        ref="popper"
        :id="popoverId"
        :style="popoverStyle"
        :class="popoverClassObj"
        role="region"
        class="k-popover">
        <div
          v-if="$scopedSlots.title || title || $scopedSlots.actions"
          class="k-popover-header d-flex">
          <div
            v-if="$scopedSlots.title || title"
            class="k-popover-title">
            <slot name="title">{{ title }}</slot>
          </div>
          <div
            v-if="$scopedSlots.actions"
            class="k-popover-actions">
            <slot name="actions" />
          </div>
        </div>
        <div class="k-popover-content">
          <slot name="content"/>
        </div>
        <div
          v-if="$scopedSlots.footer"
          class="k-popover-footer">
          <slot name="footer" />
        </div>
      </div>
    </transition>
  </component>
</template>

<script>
import Popper from 'popper.js'
import KButton from '@kongponents/kbutton/KButton.vue'
import { uuid } from 'vue-uuid'

export const placements = {
  auto: 'auto',
  top: 'top',
  topStart: 'top-start',
  topEnd: 'top-end',
  left: 'left',
  leftStart: 'left-start',
  leftEnd: 'left-end',
  right: 'right',
  rightStart: 'right-start',
  rightEnd: 'right-end',
  bottom: 'bottom',
  bottomStart: 'bottom-start',
  bottomEnd: 'bottom-end'
}

export default {
  name: 'KPop',
  components: { KButton },
  props: {
    /**
     * The target element to append the popper to
     */
    target: {
      type: String,
      default: ''
    },
    /**
     * The tag to wrap the popover around
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * If not using the default slot, the text on the button
     * that triggers the popover
     */
    buttonText: {
      type: String,
      default: 'OK'
    },
    /**
     * The title of the Popover header
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * The position of the popover
     * 'top' | 'bottom' | 'left' | 'right'
     */
    placement: {
      type: String,
      validator: function (value) {
        return Object.keys(placements).indexOf(value) !== -1
      },
      default: 'auto'
    },
    /**
     * How the Popover will trigger
     * 'click' | 'hover'
     */
    trigger: {
      type: String,
      default: 'click',
      validator: function (value) {
        return [
          'click',
          'hover'
        ].indexOf(value) !== -1
      }
    },
    /**
     * The width of the Popover body
     */
    width: {
      type: String,
      default: '200'
    },
    maxWidth: {
      type: String,
      default: '350'
    },
    /**
     * The maxHeight of the Popover body - undocumented and only used within KSelect
     */
    maxHeight: {
      type: String,
      default: 'auto'
    },
    /**
     * Custom classes that will be applied to the popover
     */
    popoverClasses: {
      type: String,
      default: ''
    },
    /**
     * Custom transition names that will be applied to the popover
     */
    popoverTransitions: {
      type: String,
      default: 'fade'
    },
    /**
    * Custom popover timeout setting
     */
    popoverTimeout: {
      type: Number,
      default: 300
    },
    /**
     * An optional flag passed in to trigger the Popover to hide - useful for external events like zooming or panning
     */
    hidePopover: {
      type: Boolean,
      default: false
    },
    /**
     * A flag for disabling the popover
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
    * A flag indicating whether or not the element in the slot will be an SVG element
    */
    isSvg: {
      type: Boolean,
      default: false
    },
    /**
     * A flag to hide the triangle pointing to the trigger element
     */
    hideCaret: {
      type: Boolean,
      default: false
    },
    /**
     * A custom callback function to call when the popover is already opened and an element inside has been clicked
     */
    onPopoverClick: {
      type: Function,
      default: null
    },
    /**
     * A flag to use fixed positioning of the popover to avoid content being clipped by parental boundaries.
     */
    positionFixed: {
      type: Boolean,
      default: false
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
      popper: null,
      reference: null,
      isOpen: false,
      popoverId: !this.testMode ? uuid.v1() : 'test-popover-id-1234',
      targetId: !this.testMode ? this.$scopedSlots.default && this.$scopedSlots.default.id ? this.$scopedSlots.default.id : uuid.v1() : 'test-target-id-1234'
    }
  },

  computed: {
    popoverStyle: function () {
      return {
        width: this.width === 'auto' || this.width.endsWith('%') || this.width.endsWith('px') ? this.width : this.width + 'px',
        maxWidth: this.maxWidth === 'auto' || this.maxWidth.endsWith('%') || this.maxWidth.endsWith('vw') || this.maxWidth.endsWith('px') ? this.maxWidth : this.maxWidth + 'px',
        maxHeight: this.maxHeight === 'auto' || this.maxHeight.endsWith('%') || this.maxHeight.endsWith('vh') || this.maxHeight.endsWith('px') ? this.maxHeight : this.maxHeight + 'px'
      }
    },
    popoverClassObj: function () {
      return [this.popoverClasses, { 'hide-caret': this.hideCaret }, { 'pb-0': this.$slots.actions }]
    }
  },

  watch: {
    hidePopover: function () {
      // whenever this prop gets updated, hide the popper
      if (this.isOpen) {
        this.hidePopper()
      }
    }
  },

  mounted () {
    if (this.disabled) return

    if (!this.$el.children) {
      this.reference = this.$el
    } else {
      this.reference = this.$el.children[0]
    }

    this.bindEvents()
  },

  beforeDestroy () {
    const popper = this.$refs.popper
    if (popper && this.trigger === 'click') {
      this.reference && this.reference.removeEventListener('click', this.handleClick)
      popper.removeEventListener('click', this.showPopper)
      document.documentElement.removeEventListener('click', this.handleClick)
    } else if (this.reference) {
      this.reference.removeEventListener('mouseenter', this.createInstance)
      this.reference.removeEventListener('mouseleave', this.toggle)
      this.reference.removeEventListener('focus', this.createInstance)
      this.reference.removeEventListener('blur', this.toggle)
    }

    this.destroy()
  },

  methods: {
    hidePopper () {
      if (this.trigger !== 'hover') {
        this.isOpen = false
      }

      this.timer = setTimeout(() => {
        this.isOpen = false
        this.$emit('closed')
        this.destroy()
      }, this.popoverTimeout)
    },

    showPopper () {
      this.isOpen = true
      if (this.timer) clearTimeout(this.timer)
      if (this.popperTimer) clearTimeout(this.popperTimer)
      this.$emit('opened')
    },

    updatePopper () {
      if (this.popper && typeof this.popper.update === 'function') {
        this.popper.update()
      }
    },

    async createInstance () {
      // destroy any previous poppers before creating new one
      this.destroy()

      this.showPopper()
      const placement = placements[this.placement] ? placements[this.placement] : 'auto'
      const popperEl = this.$refs.popper

      const theTarget = this.target && !this.isSvg && !!document.querySelector(this.target) ? document.querySelector(this.target) : document.getElementById(this.targetId)

      if (theTarget) {
        theTarget.appendChild(popperEl)
      }

      await this.$nextTick()
      this.popper = new Popper(this.reference, popperEl, {
        placement,
        // Use positionFixed to avoid popover content being cut off by parent boundaries
        positionFixed: this.positionFixed,
        removeOnDestroy: true,
        modifiers: {
          // Ensures element does not ovflow outside of boundary
          preventOverflow: {
            enabled: true,
            boundariesElement: 'viewport'
          }
        }
      })

      await this.$nextTick()
      this.updatePopper()
    },

    handleClick (e) {
      e.stopPropagation()
      if (this.reference && this.reference.contains(e.target)) {
        if (this.isOpen) {
          this.hidePopper()
        } else {
          this.createInstance()
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target) && this.onPopoverClick) {
        const isOpen = this.onPopoverClick()
        if (isOpen !== undefined) {
          isOpen ? this.showPopper() : this.hidePopper()
        }
      } else if (this.$refs.popper && this.$refs.popper.contains(e.target)) {
        this.showPopper()
      } else if (this.isOpen) {
        this.hidePopper()
      }
    },

    bindEvents () {
      const popper = this.$refs.popper
      if (popper) {
        if (this.trigger === 'hover') {
          this.reference.addEventListener('mouseenter', this.createInstance)
          this.reference.addEventListener('focus', this.createInstance)
          this.reference.addEventListener('mouseleave', this.hidePopper)
          this.reference.addEventListener('blur', this.hidePopper)
          popper.addEventListener('mouseenter', this.showPopper)
          popper.addEventListener('focus', this.showPopper)
          popper.addEventListener('mouseleave', this.hidePopper)
          popper.addEventListener('blur', this.hidePopper)
        }

        popper.addEventListener('click', this.showPopper)
        document.documentElement.addEventListener('click', this.handleClick)
      }
    },

    destroy () {
      if (this.popper) {
        this.isOpen = false
        this.popper.destroy()
        this.popper = null
      }
    }

  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';

.k-popover {
  z-index: 1000;
  max-width: none;
  font-size: var(--KPopBodySize, var(--type-sm, type(sm)));
  text-align: left;
  white-space: normal;
  color: var(--KPopColor, var(--black-400, color(black-400)));
  background-color: var(--KPopBackground, var(--white, color(white)));
  border: 1px solid var(--KPopBorder, var(--black-10, color(black-10)));
  border-radius: 4px;
  -webkit-box-shadow: 0px 4px 20px var(--black-10);
  box-shadow: 0px 4px 20px var(--black-10);
  padding: var(--KPopPaddingY, 28px) var(--KPopPaddingX, var(--spacing-md, spacing(md)));

  .k-popover-header {
    align-items: baseline;
    margin-bottom: 28px;

    .k-popover-title {
      color: var(--KPopColor, var(--black-500, color(black-500)));
      font-size: var(--KPopHeaderSize, var(--type-md, type(md)));
      font-weight: 600;
    }

    .k-popover-actions {
      margin-left: auto;
    }
  }

  .k-popover-footer {
    margin: 14px 0;
  }

  &[x-placement^="bottom"] {
    margin-top: var(--spacing-md, spacing(md));

    &:after, &:before {
      bottom: 100%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-bottom-color: var(--KPopBackground, var(--white, color(white)));
      border-width: 10px;
      margin-left: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-bottom-color: var(--KPopBorder, var(--black-10, color(black-10)));
      border-width: 11px;
      margin-left: -11px;
    }
  }

  &[x-placement^="top"] {
    margin-bottom: var(--spacing-md, spacing(md));

    &:after, &:before {
      top: 100%;
      left: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-top-color: var(--KPopBackground, var(--white, color(white)));
      border-width: 10px;
      margin-left: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-top-color: var(--KPopBorder, var(--black-10, color(black-10)));
      border-width: 11px;
      margin-left: -11px;
    }
  }

  &[x-placement^="left"] {
    margin-right: var(--spacing-md, spacing(md));

    &:after, &:before {
      left: 100%;
      top: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-left-color: var(--KPopBackground, var(--white, color(white)));
      border-width: 10px;
      margin-top: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-left-color: var(--KPopBorder, var(--black-10, color(black-10)));
      border-width: 11px;
      margin-top: -11px;
    }
  }

  &[x-placement^="right"] {
    margin-left: var(--spacing-md, spacing(md));

    &:after, &:before {
      right: 100%;
      top: 50%;
      border: solid transparent;
      content: " ";
      height: 0;
      width: 0;
      position: absolute;
      pointer-events: none;
    }

    &:after {
      border-color: rgba(255, 255, 255, 0);
      border-right-color: var(--KPopBackground, var(--white, color(white)));
      border-width: 10px;
      margin-top: -10px;
    }

    &:before {
      border-color: rgba(250, 250, 250, 0);
      border-right-color: var(--KPopBorder, var(--black-10, color(black-10)));
      border-width: 11px;
      margin-top: -11px;
    }
  }

  &[x-placement^="top-start"],
  &[x-placement^="bottom-start"] {
    &:after, &:before { left: 11px; }
  }

  &[x-placement^="top-end"],
  &[x-placement^="bottom-end"] {
    &:after, &:before { left: calc(100% - 11px); }
  }

  &[x-placement^="right-start"],
  &[x-placement^="left-start"] {
    &:after, &:before { top: 11px; }
  }

  &[x-placement^="right-end"],
  &[x-placement^="left-end"] {
    &:after, &:before { top: calc(100% - 11px); }
  }

  &.hide-caret {
    &:after,
    &:before {
      display: none;
    }
  }
}

/** Animations */
$transition-speed: .3s !default;

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-enter-active,
.fadeIn,
.fade-leave-active,
.fadeOut {
  animation-duration: $transition-speed;
  animation-fill-mode: both;
}
.fade-enter-active,
.fadeIn {
  animation-name: fadeIn;
}
.fade-leave-active,
.fadeOut {
  animation-name: fadeOut;
}
</style>
