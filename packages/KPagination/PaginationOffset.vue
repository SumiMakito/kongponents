<template>
  <div class="pagination-offset-button-container mb-0 pa-0">
    <KButton
      :class="{ disabled: prevButtonDisabled }"
      class="pagination-button"
      data-testid="prev-btn"
      aria-label="Go to the previous page"
      @click.prevent="getPrevOffset"
    >
      <template v-slot:icon>
        <KIcon
          :color="prevButtonDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
          icon="arrowLeft"
          size="16"
          view-box="0 0 16 16"
        />
      </template>
    </KButton>
    <KButton
      :class="{ disabled: nextButtonDisabled }"
      class="pagination-button"
      data-testid="next-btn"
      aria-label="Go to the next page"
      @click.prevent="getNextOffset"
    >
      <template v-slot:icon>
        <KIcon
          :color="nextButtonDisabled ? 'var(--grey-500)' : 'var(--blue-400)'"
          icon="arrowRight"
          size="16"
          view-box="0 0 16 16"
        />
      </template>
    </KButton>
  </div>
</template>

<script>
import KIcon from '@kongponents/kicon/KIcon.vue'

export default {
  name: 'PaginationOffset',
  components: {
    KIcon
  },
  props: {
    prevButtonDisabled: {
      type: Boolean,
      default: false
    },
    nextButtonDisabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getNextOffset () {
      if (this.nextButtonDisabled) {
        return
      }

      this.$emit('getNextOffset')
    },
    getPrevOffset () {
      if (this.prevButtonDisabled) {
        return
      }

      this.$emit('getPrevOffset')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@kongponents/styles/variables';
.pagination-offset-button-container {
  display: flex;

  .pagination-button.k-button {
    width: 34px;
    height: 34px;
    color: var(--grey-500);
    border: 1px solid var(--grey-300);
    background-color: white;
    border-radius: 4px;
    margin: 0 6px;
    padding: 6px;

    &:focus,
    &:hover {
      color: var(--blue-500);
      border-color: var(--blue-500);
      border-radius: 4px;
    }

    &.disabled:focus,
    &.disabled:hover {
      color: var(--black-45);
      border-color: var(--grey-200);
      box-shadow: none;
      cursor: default;
    }

    &.active {
      outline: none;
      color: var(--blue-500);
      border-color: var(--blue-200);
      border-radius: 4px;
      background-color: var(--blue-100);
    }
  }
}
</style>
