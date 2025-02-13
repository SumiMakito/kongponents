<template>
  <KButton
    :is-rounded="false"
    :class="[view, { paused: isPaused }]"
    :title="`Toggle to ${view === 'table' ? 'grid' : 'table'} view`"
    size="small"
    appearance="outline"
    class="view-switch-button non-visual-button"
    @click="toggleView"
  >
    <div class="icon">
      <div class="dots">
        <i
          v-for="i in 4"
          :key="i"
        />
      </div>
      <div class="lines">
        <i
          v-for="i in 4"
          :key="i"
        />
      </div>
    </div>
  </KButton>
</template>

<script>
import KButton from '@kongponents/kbutton/KButton.vue'

export default {
  name: 'KViewSwitcher',
  components: { KButton },
  props: {
    view: {
      type: String,
      required: true,
      validator: (val) => ['table', 'grid'].includes(val)
    }
  },

  data () {
    return {
      isPaused: true
    }
  },

  methods: {
    toggleView () {
      // Remove paused animations
      this.isPaused = false
      // Emit new view
      this.$emit(
        'view-changed',
        this.view === 'table' ? 'grid' : 'table'
      )
    }
  }
}
</script>

<style lang="scss">
@import '~@kongponents/styles/variables';
// Originally forked and modified from https://codepen.io/aaroniker/pen/dyoKeMP

.view-switch-button {
  --KButtonPaddingY: 6px;
  --KButtonPaddingX: 6px;
  --KButtonSecondaryHover: var(--white);
  --KButtonSecondaryHoverBorder: var(--blue-300);
  --KButtonSecondaryFocus: none;
  transform: scale(var(--scale, 1)) translateZ(0);

  &.paused .icon i { animation-duration: 0s; }
  .icon {
    width: 1.5rem;
    height: 1.5rem;
    position: relative;
    i {
      position: absolute;
      left: var(--left, 4px);
      top: var(--top, 4px);
      display: block;
      border-radius: 2px;
      width: var(--width, 7px);
      height: var(--height, 7px);
      background-color: var(--grey-500);
      animation: var(--name, var(--dots-name, none)) var(--duration, var(--dots-duration, .5s)) var(--easing, var(--dots-easing, linear)) forwards var(--delay, var(--dots-delay, 0s));
      transition: background-color 200ms ease;
    }
    .dots i {
      &:nth-child(1) {
        --x-middle: -8px;
        --y-middle: 10px;
        --x-end: -2px;
        --y-end: 12px;
        --x-back: 10px;
        --y-back: 7px;
        --x-back-end: 9px;
        --y-back-end: 0;
      }
      &:nth-child(2) {
        --left: 13px;
        --x-middle: -12px;
        --y-middle: 5px;
        --x-end: -11px;
        --y-end: 7px;
        --x-back: -3px;
        --y-back: 1px;
        --x-back-end: -9px;
        --y-back-end: 0;
      }
      &:nth-child(3) {
        --top: 13px;
        --x-middle: 4px;
        --y-middle: -5px;
        --x-end: -2px;
        --y-end: -7px;
        --x-back: -5px;
        --y-back: 0px;
        --x-back-end: 9px;
        --y-back-end: 0;
      }
      &:nth-child(4) {
        --left: 13px;
        --top: 13px;
        --x-middle: 0;
        --y-middle: -10px;
        --x-end: -11px;
        --y-end: -12px;
        --x-back: -14px;
        --y-back: -8px;
        --x-back-end: -9px;
        --y-back-end: 0;
      }
    }
    .lines {
      --name: var(--lines-name, none);
      --duration: var(--lines-duration, 0.15s);
      --easing: var(--lines-easing, linear);
      --delay: var(--lines-delay, 0s);
      i {
        --left: 9px;
        --top: 3px;
        --height: 2px;
        --width: 11px;
        transform-origin: 0 50%;
        transform: translateY(20%) translateZ(0) scaleX(0);
        &:nth-child(2) { --top: 8px; }
        &:nth-child(3) { --top: 13px; }
        &:nth-child(4) { --top: 18px; }
        &:nth-child(3),
        &:nth-child(4) { transform-origin: 100% 50%; }
      }
    }
  }
  &.table {
    --dots-name: back;
    --lines-name: scale-down;
    .lines i {
      transform-origin: 0 50%;
      &:nth-child(3),
      &:nth-child(4) { transform-origin: 100% 50%; }
    }
  }
  &.grid {
    --dots-name: move;
    --lines-name: scale;
    --lines-duration: 0.15s;
    --lines-delay: 0.3s;
    .lines i {
      transform-origin: 100% 50%;
      &:nth-child(3),
      &:nth-child(4) { transform-origin: 0 50%; }
    }
  }
}

@keyframes move {
  50% { transform: translate(var(--x-middle, 0), var(--y-middle, 0)) scale(.4); }
  100% { transform: translate(var(--x-end, 0), var(--y-end, 0)) scale(.4); }
}

@keyframes back {
  0%,
  15% { transform: translate(var(--x-end, 0), var(--y-end, 0)) scale(.4); }
  50% { transform: translate(var(--x-back, 0), var(--y-back, 0)) scale(.5); }
  100% { transform: translate(var(--x-back-end, 0), var(--y-back-end, 0)) scale(1); }
}

@keyframes scale {
  100% { transform: translateY(20%) translateZ(0) scaleX(1); }
}

@keyframes scale-down {
  0% { transform: translateY(20%) translateZ(0) scaleX(1); }
  100% { transform: translateY(20%) translateZ(0) scaleX(0); }
}
</style>
