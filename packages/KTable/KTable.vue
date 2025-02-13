<template>
  <div>
    <KSkeleton
      v-if="(!testMode || testMode === 'loading') && (isTableLoading || isLoading) && !hasError"
      :delay-milliseconds="0"
      type="table"
    />

    <div
      v-else-if="hasError"
      class="k-table-error-state"
      data-testid="k-table-error-state">
      <slot name="error-state">
        <KEmptyState
          :cta-is-hidden="!errorStateActionMessage || !errorStateActionRoute"
          :icon="errorStateIcon || ''"
          :is-error="true"
          :icon-color="errorStateIconColor"
          :icon-size="errorStateIconSize"
        >
          <template v-slot:title>{{ errorStateTitle }}</template>
          <template v-slot:message>{{ errorStateMessage }}</template>
          <template v-slot:cta>
            <KButton
              v-if="errorStateActionMessage"
              :to="errorStateActionRoute ? errorStateActionRoute : null"
              :data-testid="getTestIdString(errorStateActionMessage)"
              appearance="primary"
              @click="$emit('ktable-error-cta-clicked')"
            >
              {{ errorStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <div
      v-else-if="!hasError && (!isTableLoading && !isLoading) && (data && !data.length)"
      class="k-table-empty-state"
      data-testid="k-table-empty-state">
      <slot name="empty-state">
        <KEmptyState
          :cta-is-hidden="!emptyStateActionMessage || !emptyStateActionRoute"
          :icon="emptyStateIcon || ''"
          :icon-color="emptyStateIconColor"
          :icon-size="emptyStateIconSize"
        >
          <template v-slot:title>{{ emptyStateTitle }}</template>
          <template v-slot:message>{{ emptyStateMessage }}</template>
          <template v-slot:cta>
            <KButton
              v-if="emptyStateActionMessage"
              :to="emptyStateActionRoute ? emptyStateActionRoute : null"
              :data-testid="getTestIdString(emptyStateActionMessage)"
              :icon="emptyStateActionButtonIcon ? emptyStateActionButtonIcon : null"
              :appearance="searchInput ? 'btn-link' : 'primary'"
              @click="$emit('ktable-empty-state-cta-clicked')"
            >
              {{ emptyStateActionMessage }}
            </KButton>
          </template>
        </KEmptyState>
      </slot>
    </div>

    <section
      v-else
      class="k-table-wrapper"
      @scroll.passive="scrollHandler"
    >
      <table
        :class="{'has-hover': hasHover, 'is-clickable': isClickable, 'side-border': hasSideBorder}"
        :data-tableid="tableId"
        class="k-table">
        <thead :class="{ 'is-scrolled': isScrolled }">
          <tr :class="{ 'is-scrolled': isScrolled }">
            <template>
              <th
                v-for="(column, index) in tableHeaders"
                :key="`k-table-${tableId}-headers-${index}`"
                :class="{
                  'sortable': !disableSorting && !column.hideLabel && column.sortable,
                  'active-sort': !disableSorting && !column.hideLabel && column.sortable && column.key === sortColumnKey,
                  [sortColumnOrder]: !disableSorting && column.key === sortColumnKey && !column.hideLabel,
                  'is-scrolled': isScrolled
                }"
                @click="() => {
                  if (!disableSorting && column.sortable) {
                    $emit('sort', {
                      prevKey: sortColumnKey,
                      sortColumnKey: column.key,
                      sortColumnOrder: sortColumnOrder === 'asc' ? 'desc' : 'asc' // display opposite because sortColumnOrder outdated
                    })
                    sortClickHandler(column)
                  }
                }"
              >
                <span class="d-flex align-items-center">
                  <slot
                    :name="`column-${column.key}`"
                    :column="column">
                    <span
                      :class="{'sr-only': column.hideLabel}"
                    >
                      {{ column.label ? column.label : column.key }}
                    </span>
                  </slot>
                  <KIcon
                    v-if="!disableSorting && !column.hideLabel && column.sortable"
                    class="caret ml-2"
                    color="var(--KTableColor, var(--black-70, color(black-70)))"
                    size="12"
                    icon="chevronDown"
                  />
                </span>
              </th>
            </template>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in data"
            :key="`k-table-${tableId}-row-${rowIndex}`"
            :tabindex="isClickable ? 0 : null"
            :role="isClickable ? 'link' : null"
            v-bind="rowAttrs(row)"
          >
            <template>
              <td
                v-for="(value, index) in tableHeaders"
                :key="`k-table-${tableId}-cell-${index}`"
                v-bind="cellAttrs({ headerKey: value.key, row, rowIndex, colIndex: index })"
                v-on="tdlisteners(row[value.key], row)"
              >
                <slot
                  :name="value.key"
                  :row="row"
                  :rowKey="rowIndex"
                  :rowValue="row[value.key]">{{ row[value.key] }}</slot>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
      <KPagination
        v-if="shouldShowPagination"
        :total-count="total"
        :current-page="page"
        :neighbors="paginationNeighbors"
        :page-sizes="paginationPageSizes"
        :initial-page-size="pageSize"
        :disable-page-jump="disablePaginationPageJump"
        :test-mode="testMode ? true : false"
        :pagination-type="paginationType"
        :offset-prev-button-disabled="!previousOffset"
        :offset-next-button-disabled="!offset"
        class="pa-1"
        @pageChanged="pageChangeHandler"
        @pageSizeChanged="pageSizeChangeHandler"
        @getNextOffset="getNextOffsetHandler"
        @getPrevOffset="getPrevOffsetHandler"
      />
    </section>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import KButton from '@kongponents/kbutton/KButton.vue'
import KEmptyState from '@kongponents/kemptystate/KEmptyState.vue'
import KSkeleton from '@kongponents/kskeleton/KSkeleton.vue'
import KPagination from '@kongponents/kpagination/KPagination.vue'
import KIcon from '@kongponents/kicon/KIcon.vue'
import { clientSideSorter, useDebounce, useRequest } from '@kongponents/utils/utils.js'

/**
 * @deprecated
 * @param {String} key - the current key to sort by
 * @param {String} previousKey - the previous key used to sort by
 * @param {String} sortOrder - either ascending or descending
 * @param {Array} items - the list of items to sort
 * @return {Object} an object containing the previousKey and sortOrder
 */
export const defaultSorter = (key, previousKey, sortOrder, items) => {
  return clientSideSorter(key, previousKey, sortOrder, items)
}

export default defineComponent({
  name: 'KTable',
  components: {
    KEmptyState,
    KSkeleton,
    KPagination,
    KIcon,
    KButton
  },
  props: {
    /**
     * @deprecated in favor of the "fetcher" prop
     * Object containing data which creates rows and columns.
     * @param {Object} options - Options to initialize the component with
     * @param {Array} options.headers - Array of Objects defining Table Headers
     * @param {Array} options.data - Array of Objects defining column data
     */
    options: {
      type: Object,
      required: false
    },
    /**
     * TODO: this is experimental until we figure out what's wrong with the client
     * side sort function
     *
     * Enable client side sort - only do this if using a fetcher
     * that returns static data
     */
    enableClientSort: {
      type: Boolean,
      default: false
    },
    /**
     * Enables hover highlighting to table rows
     */
    hasHover: {
      type: Boolean,
      default: true
    },
    /**
     * @deprecated
     * the sort order for the table.
     */
    sortOrder: {
      type: String,
      default: '',
      validator: function (value) {
        return ['ascending', 'descending', ''].indexOf(value) > -1
      }
    },
    /**
     * @deprecated
     * the key of the column that's currently being sorted
     */
    sortKey: {
      type: String,
      default: ''
    },
    /**
     * A function that conditionally specifies row attributes on each row
     */
    rowAttrs: {
      type: Function,
      default: () => ({})
    },
    /**
     * A prop that enables a side border with a themable color to it.
     */
    hasSideBorder: {
      type: Boolean,
      default: false
    },
    /**
     * A function that conditionally specifies cell attributes
     */
    cellAttrs: {
      type: Function,
      default: () => ({})
    },
    /**
     * A prop that enables a loading skeleton
     */
    isLoading: {
      type: Boolean,
      default: false
    },
    /**
     * A prop to pass in a custom empty state title
     */
    emptyStateTitle: {
      type: String,
      default: 'No Data'
    },
    /**
     * A prop to pass in a custom empty state message
     */
    emptyStateMessage: {
      type: String,
      default: 'There is no data to display.'
    },
    /**
     * A prop to pass in a custom empty state action route
     */
    emptyStateActionRoute: {
      type: Object | String,
      default: ''
    },
    /**
     * A prop to pass in a custom empty state action message
     */
    emptyStateActionMessage: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a custom empty state action message
     */
    emptyStateActionButtonIcon: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a custom empty state icon
     */
    emptyStateIcon: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a color for the empty state icon
     */
    emptyStateIconColor: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a size for the empty state icon
     */
    emptyStateIconSize: {
      type: String,
      default: '50'
    },
    /**
     * A prop that enables the error state
     */
    hasError: {
      type: Boolean,
      default: false
    },
    /**
     * A prop to pass in a custom error state title
     */
    errorStateTitle: {
      type: String,
      default: 'An error occurred'
    },
    /**
     * A prop to pass in a custom error state message
     */
    errorStateMessage: {
      type: String,
      default: 'Data cannot be displayed due to an error.'
    },
    /**
     * A prop to pass in a custom error state action route
     */
    errorStateActionRoute: {
      type: Object | String,
      default: ''
    },
    /**
     * A prop to pass in a custom error state action message
     */
    errorStateActionMessage: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a custom error state icon
     */
    errorStateIcon: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a color for the error state icon
     */
    errorStateIconColor: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a size for the error state icon
     */
    errorStateIconSize: {
      type: String,
      default: '50'
    },
    /**
     * A prop to pass in a fetcher function to enable server-side search, sort
     * and pagination
     */
    fetcher: {
      type: Function,
      default: undefined
    },
    /**
     * A prop to trigger a revalidate of the fetcher function. Modifying this value
     * will trigger a manual refetch of the table data.
     */
    fetcherCacheKey: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a search string for server-side search
     */
    searchInput: {
      type: String,
      default: ''
    },
    /**
     * A prop to pass in a an array of headers for the table
     */
    headers: {
      type: Array,
      default: () => []
    },
    /**
     * A prop to pass in a an object of intial params for the initial fetcher function call
     */
    initialFetcherParams: {
      type: Object,
      default: null
    },
    /**
     * A prop to pass in a the number of pagination neighbors used by the pagination component
     */
    paginationNeighbors: {
      type: Number,
      default: 1
    },
    /**
     * A prop to pass in an array of page sizes used by the pagination component
     */
    paginationPageSizes: {
      type: Array,
      default: () => ([15, 30, 50, 75, 100]),
      validator: (pageSizes) => pageSizes.length && pageSizes.every(i => typeof i === 'number')
    },
    /**
     * A prop to pass the total number of items in the set for the pagination text
     */
    paginationTotalItems: {
      type: Number,
      default: null
    },
    disablePaginationPageJump: {
      type: Boolean,
      default: false
    },
    disableSorting: {
      type: Boolean,
      default: false
    },
    disablePagination: {
      type: Boolean,
      default: false
    },
    /**
     * A prop to pass to hide pagination for total table records is less than or equal to pagesize
     */
    hidePaginationWhenOptional: {
      type: Boolean,
      default: false
    },
    /**
     * for testing only, strips out generated ids and avoid loading state in tests.
     * 'true' - no id's no loading
     * 'loading' - no id's but allow loading
     */
    testMode: {
      type: String,
      default: ''
    },
    sortHandlerFn: {
      type: Function,
      default: () => ({})
    },
    paginationType: {
      type: String,
      default: 'default',
      validator: (value) => ['default', 'offset'].includes(value)
    }
  },
  data: function () {
    return {
      tableId: !this.testMode ? uuid.v1() : 'test-table-id-1234'
    }
  },
  setup (props, ctx) {
    const defaultFetcherProps = {
      pageSize: 15,
      page: 1,
      query: '',
      sortColumnKey: '',
      sortColumnOrder: 'desc',
      offset: null
    }

    const data = ref([])
    const tableHeaders = ref([])
    const total = ref(0)
    const isScrolled = ref(false)
    const isTableLoading = ref(true)
    const page = ref(1)
    const pageSize = ref(15)
    const filterQuery = ref('')
    const sortColumnKey = ref('')
    const sortColumnOrder = ref('desc')
    const offset = ref(null)
    const offsets = ref([])
    const isClickable = ref(false)
    const hasInitialized = ref(false)
    const nextPageClicked = ref(false)

    /**
     * Grabs listeners from this.$listeners matching a prefix to attach the
     * event that is dynamic. e.g. `v-on:cell:click`, `@row:focus` etc.
     * @param {String} prefix - event listener prefix e.g. `row:`, `cell:`
     * @param {any} $listeners - this.$listeners on the vue instance to pluck from
     * @returns {Function} - returns a function that can pass an entity to the
                             listener callback function.
    */
    const pluckListeners = (prefix, $listeners) => {
      return (entity, type) =>
        Object.keys($listeners).reduce((acc, curr) => {
          if (curr.indexOf(prefix) === 0) {
            const parts = curr.split(prefix)

            acc[parts[1]] = (e) => $listeners[curr](e, entity, type)
          }

          return acc
        }, {})
    }

    const tdlisteners = computed(() => {
      return (entity, rowData) => {
        const rowListeners = pluckListeners('row:', ctx.listeners)(rowData, 'row')
        const cellListeners = pluckListeners('cell:', ctx.listeners)(entity, 'cell')
        const ignoredElements = ['a', 'button', 'input', 'select']

        if (rowListeners.click) {
          isClickable.value = true
        }

        return {
          ...rowListeners,
          ...cellListeners,
          click (e) {
            const targetClasses = e.target.className
            let isIgnored = ignoredElements.includes(e.target.tagName.toLowerCase())
            let isPopoverContent = false

            // check for popover class
            if (typeof targetClasses === 'string' || Array.isArray(targetClasses)) {
              isPopoverContent = targetClasses.includes('k-popover')
            } else if (typeof targetClasses === 'object') {
              isPopoverContent = Object.keys(targetClasses).includes('k-popover')
            }

            // check parent for popover class
            if (e.target.closest('.k-popover-content') !== null) {
              isPopoverContent = true
            }

            // check parent of target is not an ignored elem
            for (let i = 0; i < ignoredElements.length; i++) {
              if (e.target.closest(ignoredElements[i]) !== null) {
                isIgnored = true
                break
              }
            }

            // ignore click if it is from the popover, or is a non-disabled ignored element
            if ((!isIgnored || e.target.hasAttribute('disabled')) &&
                 !isPopoverContent && (rowListeners.click || cellListeners.click)) {
              if (cellListeners.click) {
                ctx.emit('cell-click', { data: entity })
                cellListeners.click(e, entity, 'cell')
              } else {
                ctx.emit('row-click', { data: rowData })
                rowListeners.click(e, rowData, 'row')
              }
            }
          }
        }
      }
    })

    const fetchData = async () => {
      isTableLoading.value = true
      const searchInput = props.searchInput
      const res = await props.fetcher({
        pageSize: pageSize.value,
        page: page.value,
        query: searchInput || filterQuery.value,
        sortColumnKey: sortColumnKey.value,
        sortColumnOrder: sortColumnOrder.value,
        offset: offset.value
      })

      data.value = res.data
      total.value = props.paginationTotalItems || res.total || res.data.length

      if (props.paginationType === 'offset') {
        if (!res.pagination || !res.pagination.offset) {
          offset.value = null

          // reset to first page if no pagiantion data is returned unless the "next page" button was clicked
          // this will ensure buttons display the correct state for cases like search
          if (!nextPageClicked.value) {
            page.value = 1
          }
        } else {
          offset.value = res.pagination.offset

          if (!offsets.value[page.value]) {
            offsets.value.push(res.pagination.offset)
          }
        }
      }

      if (props.fetcher) {
        if (props.enableClientSort && sortColumnKey.value && sortColumnOrder.value) {
          defaultSorter(sortColumnKey.value, '', sortColumnOrder.value, data.value)
        }
      } else if (props.options && props.options.data && props.options.data.length) {
        data.value = props.options.data
        total.value = props.options.data.length
      }

      isTableLoading.value = false
      nextPageClicked.value = false

      return res
    }

    const initData = async () => {
      // set up fetcher props
      const fetcherParams = {
        ...defaultFetcherProps,
        ...props.initialFetcherParams
      }

      page.value = fetcherParams.page
      pageSize.value = fetcherParams.pageSize
      filterQuery.value = fetcherParams.query
      sortColumnKey.value = fetcherParams.sortColumnKey
      sortColumnOrder.value = fetcherParams.sortColumnOrder

      if (props.paginationType === 'offset') {
        offset.value = fetcherParams.offset
        offsets.value.push(fetcherParams.offset)
      }

      // get table headers
      if (props.headers && props.headers.length) {
        tableHeaders.value = props.headers
      } else if (props.options && props.options.headers && props.options.headers.length) {
        tableHeaders.value = props.options.headers
      }

      hasInitialized.value = true
    }

    const previousOffset = computed(() => offsets.value[page.value - 1])

    // once `initData()` finishes fetch data
    const tableFetcherCacheKey = computed(() => {
      if (!props.fetcher || !hasInitialized.value) {
        return ''
      }

      return `k-table_${Math.floor(Math.random() * 1000)}_${props.fetcherCacheKey}`
    })

    const { query, search } = useDebounce('', 350)
    const { revalidate } = useRequest(
      () => tableFetcherCacheKey.value,
      () => fetchData(),
      { revalidateOnFocus: false }
    )

    const sortClickHandler = (header) => {
      const { key, useSortHandlerFn } = header
      let prevKey = sortColumnKey.value + '' // avoid pass by ref

      page.value = 1

      if (sortColumnKey.value) {
        if (key === sortColumnKey.value) {
          if (sortColumnOrder.value === 'asc') {
            sortColumnOrder.value = 'desc'
          } else {
            sortColumnOrder.value = 'asc'
          }
        } else {
          sortColumnKey.value = key
          sortColumnOrder.value = 'asc'
        }
      } else {
        sortColumnKey.value = key
        sortColumnOrder.value = 'asc'
      }

      // Use deprecated sort function to sort data passed in via
      // the deprecated options.data prop
      if ((props.options && props.options.data) || props.enableClientSort) {
        if (useSortHandlerFn && props.sortHandlerFn) {
          props.sortHandlerFn({
            key,
            prevKey,
            sortColumnOrder: sortColumnOrder.value,
            data: data.value
          })
        } else {
          defaultSorter(key, prevKey, sortColumnOrder.value, data.value)
        }
      } else if (props.paginationType !== 'offset') {
        revalidate()
      }
    }

    const pageChangeHandler = ({ page: newPage }) => {
      page.value = newPage
    }

    const pageSizeChangeHandler = ({ pageSize: newPageSize }) => {
      offsets.value = [null]
      offset.value = null
      pageSize.value = newPageSize
      page.value = 1
    }

    const scrollHandler = (event) => {
      if (event && event.target && event.target.scrollTop) {
        if (event.target.scrollTop > 1) {
          isScrolled.value = true
        } else if (event.target.scrollTop) {
          isScrolled.value = !isScrolled.value
        }
      }
    }

    const getTestIdString = (message) => {
      return message.toLowerCase().replace(/[^[a-z0-9]/gi, '-')
    }

    const getNextOffsetHandler = () => {
      page.value++
      nextPageClicked.value = true
    }

    const getPrevOffsetHandler = () => {
      page.value--
      offset.value = previousOffset.value
    }

    // fetcher must be defined, disablePagination must be false
    // if using standard pagination with hidePaginationWhenOptional
    //  - hide if total <= min pagesize
    // if using offset-based pagination with hidePaginationWhenOptional
    //  - hide if neither previous/next offset exists and current data set count is <= min pagesize
    const shouldShowPagination = computed(() => {
      return props.fetcher && !props.disablePagination &&
        !(props.paginationType !== 'offset' && props.hidePaginationWhenOptional && total.value <= props.paginationPageSizes[0]) &&
        !(props.paginationType === 'offset' && props.hidePaginationWhenOptional && !previousOffset.value && !offset.value && data.value.length <= props.paginationPageSizes[0])
    })

    watch(() => props.searchInput, (newValue) => {
      search(newValue)
    }, { immediate: true })

    watch(() => [query.value, page.value, pageSize.value], () => {
      revalidate()
    }, { immediate: true })

    onMounted(() => {
      initData()
    })

    return {
      data,
      isScrolled,
      isTableLoading,
      page,
      pageChangeHandler,
      pageSizeChangeHandler,
      pageSize,
      scrollHandler,
      sortClickHandler,
      sortColumnKey,
      sortColumnOrder,
      isClickable,
      tableHeaders,
      tdlisteners,
      total,
      getTestIdString,
      getNextOffsetHandler,
      getPrevOffsetHandler,
      previousOffset,
      offset,
      shouldShowPagination
    }
  }
})
</script>

<style scoped lang="scss">
@import '~@kongponents/styles/variables';

.k-table-wrapper {
  width: 100%;
  // max-height: 400px;
  overflow: auto;
}

.k-table {
  width: 100%;
  max-width: 100%;
  margin-top: 0;
  border-collapse: collapse;

  th,
  td {
    padding: var(--spacing-sm, spacing(sm)) var(--spacing-md, spacing(md));
    vertical-align: middle;
    white-space: nowrap;
  }
  thead {
    height: 60px;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    border-bottom: 1px solid var(--KTableBorder, var(--grey-200, color(grey-200)));

    &.is-scrolled {
      border-bottom: none;
    }

    tr {
      position: relative;

      &:after {
        opacity: 0;
        transition: opacity 0.2s ease-in-out;
        content: '';
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
        box-shadow: none;
        left: 0;
        // Super-important to allow clicking on table rows in Safari.
        // This allows clicks to pass through the "invisible" :after layer
        pointer-events: none;
      }

      &.is-scrolled {
        border-bottom: none;

        &:after {
          box-shadow:
            0px 0.2px 0.6px rgba(0, 0, 0, 0.031),
            0px 0.6px 1.8px rgba(0, 0, 0, 0.045),
            0px 1.5px 4.2px rgba(0, 0, 0, 0.059),
            0px 5px 14px rgba(0, 0, 0, 0.09)
          ;
          opacity: 1;
          transition: opacity 0.2s ease-in-out;
        }
      }
    }

    th {
      padding: var(--spacing-sm, spacing(sm)) var(--spacing-md, spacing(md));
      text-align: left;
      font-size: var(--KTableHeaderSize, var(--type-sm, type(sm)));
      font-weight: 600;

      &.active-sort {
        color: var(--blue-500);
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }

      .caret {
        top: 2px;
        position: relative;
        transform: rotate(0deg);
      }

      &.sortable {
        cursor: pointer;

        &.asc .caret {
          top: -4px;
          transform: rotate(-180deg);
        }
      }
    }
  }
  tbody {
    tr {
      height: 44px;

      &:not(:last-of-type) {
        border-bottom: 1px solid var(--KTableBorder, var(--grey-200, color(grey-200)));
      }
    }
    td {
      color: var(--KTableColor, var(--black-70, color(black-70)));
      white-space: nowrap;

      a {
        color: var(--blue-500, color(blue-500));
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
      button,
      .k-button {
        margin-top: calc(-1 * var(--KButtonPaddingY, var(--spacing-xs)));
        margin-bottom: calc(-1 * var(--KButtonPaddingY, var(--spacing-xs)));
      }
    }
  }

  // Variants
  &.has-hover {
     tbody tr:hover {
        background-color: var(--KTableHover, var(--blue-100, color(blue-100)));
      }
  }

  &.is-clickable {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    tbody tr {
      cursor: pointer;
    }
  }

  &.side-border {
    border-collapse: separate;
    border-spacing: 0 2px;

    tbody tr {
      border-bottom: none;
    }

    tbody tr td:first-child {
      border-left: 3px solid var(--KTableBorder, var(--steel-200, color(steel-200)));
    }

    &.has-hover {
      tbody tr:hover td:first-child {
        border-left: 3px solid var(--KTableBorder, var(--steel-300, color(steel-300)));
      }
    }
  }
}
</style>
