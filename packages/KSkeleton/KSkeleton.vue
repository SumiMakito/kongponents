<template>
  <div
    :class="{ 'w-100': type !== 'spinner', 'opacity-0': !isVisible }"
    class="d-flex flex-wrap k-skeleton-container"
  >
    <CardSkeleton
      v-if="type === 'card'"
      :card-count="cardCount"
    >
      <template v-slot:card-header>
        <slot name="card-header" />
      </template>

      <template v-slot:card-content>
        <slot name="card-content" />
      </template>

      <template v-slot:card-footer>
        <slot name="card-footer" />
      </template>
    </CardSkeleton>

    <TableSkeleton
      v-else-if="type === 'table'"
      :columns="tableColumns"
      :rows="tableRows"
    >
      <slot />
    </TableSkeleton>

    <FormSkeleton v-else-if="type === 'form'" />

    <FullScreenKongSkeleton
      v-else-if="type === 'fullscreen-kong'"
      :progress="progress"
    />

    <KIcon
      v-else-if="type === 'spinner'"
      icon="spinner"
      size="16"
      color="#000"
    />

    <Skeleton v-else />
  </div>
</template>

<script>
import Skeleton from './Skeleton'
import CardSkeleton from './CardSkeleton'
import TableSkeleton from './TableSkeleton'
import FormSkeleton from './FormSkeleton'
import FullScreenKongSkeleton from './FullScreenKongSkeleton'
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'KSkeleton',
  components: {
    Skeleton,
    CardSkeleton,
    TableSkeleton,
    FormSkeleton,
    FullScreenKongSkeleton,
    KIcon
  },
  props: {
    delayMilliseconds: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: '',
      validator: (val) => [
        'table',
        'card',
        'form',
        'spinner',
        'fullscreen-kong',
        '' // default Skeleton.vue
      ].indexOf(val) !== -1
    },
    progress: {
      type: Number,
      default: null
    },
    cardCount: {
      type: Number,
      default: 1
    },
    tableColumns: {
      type: Number,
      default: 6
    },
    tableRows: {
      type: Number,
      default: 6
    }
  },
  data () {
    return {
      isVisible: false
    }
  },

  mounted () {
    setTimeout(() => {
      this.isVisible = true
    }, this.delayMilliseconds)
  }
}
</script>

<style lang="scss">
.k-skeleton-container.opacity-0 .box {
  opacity: 0;
}

.k-skeleton-container.opacity-0 .kong-icon {
  display: none;
}

.k-skeleton-container.opacity-0.mr-2 {
  margin-right: 0 !important;
}
</style>
