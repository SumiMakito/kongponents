---
pageClass: table-docs
tableOptions:
  headers:
    - label: Name
      key: name
    - label: ID
      key: id
    - label: Enabled
      key: enabled
    - key: actions
      hideLabel: true
  data:
    - name: Basic Auth
      id: 517526354743085
      enabled: true
    - name: Website Desktop
      id: 328027447731198
      enabled: false
    - name: Android App
      id: 405383051040955
      enabled: true
---
# Table (legacy)

Pass an object of headers & data to build a slot-able table.

<KTableLegacy :options="$frontmatter.tableOptions" />

```html
<template>
  <KTableLegacy :options="tableOptions" />
</template>
<script>
export default {
  data() {
    return {
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'ID', key: 'id' },
          { label: 'Enabled', key: 'enabled' },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true'
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false'
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true'
          }
        ]
      }
    }
  }
}
</script>
```

## Props

### Hover

Highlight the table row on hover. By default this is set to true. In the example we can set it to false as well.

<KTableLegacy :options="$frontmatter.tableOptions" :hasHover="false" />
```html
<KTableLegacy
  :options="tableOptions"
  :hasHover="false" />
```

### Small

Lessen the table cell padding

<KTableLegacy :options="$frontmatter.tableOptions" isSmall />
```html
<KTableLegacy
  :options="tableOptions"
  isSmall />
```

### Clickable

Adds `cursor: pointer` and `user-select: none` styling.

<KTableLegacy :options="$frontmatter.tableOptions" isClickable />
```html
<KTableLegacy
  :options="tableOptions"
  isClickable />
```

### hasSideBorder

Adds left border to each table row. By default set to true. The colors can be overridden by themes.
The below example demonstrates the disabled state:

<template>
  <KTableLegacy
    :options="tableOptions"
    :hasSideBorder="false"
    />
</template>

```html
<template>
  <KTableLegacy
    :options="tableOptions"
    :hasSideBorder="false"
    />
</template>
```

## Row Attributes

Add custom properties to individual rows. The row object is passed as a param.

`rowAttrs` - Function that returns an object comprising the attributes.

<template>
  <KTableLegacy
    :options="tableOptionsRowAttrs"
    :rowAttrs="rowAttrsFn"
    />
</template>

```html
<template>
  <KTableLegacy
    :options="tableOptions"
    :rowAttrs="rowAttrsFn"
    />
</template>
<script>
import { defaultSorter } from '@kongponents/KTableLegacy'
export default {
  data() {
    return {
      row: null,
      eventType: '',
      tableOptions: {
        headers: [
          { label: 'Type', key: 'type' },
          { label: 'Value', key: 'value' },
          { label: 'Enabled', key: 'enabled'}
        ],
        data: [
          {
            type: 'desktop',
            value: 'Windows 10',
            enabled: 'true'
          },
          {
            type: 'phone',
            value: 'LineageOS',
            enabled: 'false'
          },
          {
            type: 'tablet',
            value: 'ipadOS',
            enabled: 'true'
          }
        ]
      }
    }
  },
  methods: {
    rowAttrsFn (rowItem) {
      return {
        class: {
          'enabled': rowItem.enabled === 'true',
          'disabled': rowItem.enabled === 'false'
        },
        'data-testid': 'row-item'
      }
    }
  }
}
</script>
<style>
.k-table {
  tr.enabled {
    --KTableLegacyHover: var(--green-200, #ccffe1);
    --KTableLegacyBorder: var(--green-400, #19a654);
  }

  tr.disabled {
    --KTableLegacyHover: var(--yellow-100, #fff9e6);
    --KTableLegacyBorder: var(--yellow-200, #ffdc73);
  }
}
</style>
```

## Cell Attributes

Add custom properties to individual table cells or groups of cells. The cell attributes object is passed as a param.

`cellAttrs` - A function that returns an object comprising the attributes.

### Parameters

| Parameter | Description
|:-------- |:-------
| `headerKey`| The header key of the column containing the cell
| `row` | The contents of the row containing the cell
| `rowIndex` | The zero-based index of the row containing the cell
| `colIndex`| The zero-based index of the cell within a row

<template>
  <KTableLegacy
    :options="tableOptionsCellAttrs"
    :cellAttrs="cellAttrsFn"
    />
</template>

```html
<template>
  <KTableLegacy
    :options="tableOptions"
    :cellAttrs="cellAttrsFn"
    />
</template>
<script>
export default {
  data() {
    return {
      row: null,
      eventType: '',
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'Company', key: 'company' },
          { label: 'Description', key: 'description' }
        ],
        data: [
          {
            name: 'SageMaker',
            company: 'Amazon',
            description: 'Amazon SageMaker is a fully-managed service that enables developers and data scientists to quickly and easily build, train, and deploy machine learning models at any scale. Amazon SageMaker removes all the barriers that typically slow down developers who want to use machine learning.',
          },
          {
            name: 'Azure Machine Learning Studio',
            company: 'Microsoft',
            description: 'Azure Machine Learning Studio is a GUI-based integrated development environment for constructing and operationalizing Machine Learning workflow on Azure.',
          },
          {
            name: 'IBM Watson Machine Learning',
            company: 'IBM',
            description: 'IBM Watson Studio accelerates the machine and deep learning workflows required to infuse AI into your business to drive innovation.',
          },
          {
            name: 'TensorFlow',
            company: 'Google',
            description: 'TensorFlow is an open source software library for numerical computation using data flow graphs.',
          },
        ]
      }
    }
  },
  methods: {
    cellAttrsFn ({ headerKey, row, rowIndex, colIndex }) {
      /**
       * Sets cell background color based on data returned in
       * the row parameter and the index of the cell
       */
      const backgroundColor = () => {
        if (row.company && row.company === 'Google') {
          if (colIndex === 0) {
            return '#4285F4'
          } else if (colIndex === 1) {
            return '#DB4437'
          } else {
            return '#F4B400'
          }
        }

        return ''
      }

      /**
       * Returns an object of attributes to be applied to cells
       */
      return {
        class: {
          'truncate': headerKey === 'description' || headerKey === 'name',
        },
        'datatest-id': `row-${rowIndex + 1}-col-${headerKey}`,
        style: {
          'maxWidth': headerKey==='description' ? '50ch' : headerKey === 'name' ? '22ch' : '25ch',
          'backgroundColor': backgroundColor(),
        },
      }
    }
  }
}
</script>
```

## Events

Bind any DOM [events](https://developer.mozilla.org/en-US/docs/Web/Events) to
various parts of the table. We support events on both table rows and cells in addition to click elements inside a row (ie. buttons or hyperlinks) without triggering the a row or cell event. You can also add logic to check for `metakey` to support cmd/ctrl when clicking. Examples highlighted below.

### Rows

`@row:<event>` - returns the `Event`, the row item, and the type: `row`

```html
<KTableLegacy @row:click="rowHandler" @row:dblclick="rowHandler">
```

<KTableLegacy
  :options="tableOptionsLink"
  isClickable
  @row:click="handleRowClick">
  <template v-slot:company="{rowValue}">
    <a v-if="rowValue" @click="linkHander">{{rowValue.label}}</a>
    <span v-else>{{rowValue}}</span>
  </template>
  <template v-slot:actions>
    <div class="float-right">
      <KButton
        appearance="secondary"
        @click="buttonHandler">
        Visit Website
      </KButton>
    </div>
  </template>
</KTableLegacy>

```html{4,6,13,40-56}
<KTableLegacy
  :options="tableOptionsLink"
  isClickable
  @row:click="handleRowClick">
  <template v-slot:company="{rowValue}">
    <a v-if="rowValue" @click="linkHander">{{rowValue.label}}</a>
    <span v-else>{{rowValue}}</span>
  </template>
  <template v-slot:actions>
    <div class="float-right">
      <KButton
        appearance="secondary"
        @click="buttonHandler">
        Visit Website
      </KButton>
    </div>
  </template>
</KTableLegacy>
<script>
import { defaultSorter } from '@kongponents/KTableLegacy'
export default {
  data() {
    return {
      row: null,
      eventType: '',
      tableOptions: {
        headers: [
          { label: 'Company', key: 'company' }
        ],
        data: [
          { company: { href: 'http://www.creative.com', label: 'Creative Labs' } },
          { company: { href: 'http://www.bang-olufsen.com', label: 'Bang &Olufsen' } },
          { company: { href: 'http://www.klipsch.com', label: 'Klipsch' } },
          { company: { href: 'http://www.bose.com', label: 'Bose'} },
          { company: { href: 'http://www.sennheiser.com', label: 'Sennheiser'} }
        ]
      }
    }
  },
  methods: {
    handleRowClick(e, row) {
      const metaKeyPressed = e.metaKey || e.ctrlKey

      if (metaKeyPressed) {
        return window.open(row.company.href)
      } else {
        window.location = row.company.href
      }
    },
    linkHander (e) {
      alert('a link was clicked')
    },
    buttonHandler (e) {
      alert('a button was pressed')
    }
  }
}
</script>
```

### Cells

`@cell:<event>` - returns the `Event`, the cell value, and the type: `cell`

```html
<KTableLegacy @cell:mouseout="cellHandler" @cell:mousedown="cellHandler">
```

<template>
  <div>
    <div v-if="eventType">
      {{eventType}} on: {{row}}
    </div>
    <div v-else>Waiting</div>
    <KTableLegacy
      :options="tableOptions"
      is-clickable
      @row:click="actionRow"
      @cell:mouseover="actionRow"
    />
  </div>
</template>

#### Example

```html
<template>
  <div>
    <div v-if="eventType">
      {{eventType}} on: {{row}}
    </div>
    <div v-else>Waiting</div>
    <KTableLegacy
      :options="tableOptions"
      is-clickable
      @row:click="actionRow"
      @cell:mouseover="actionRow"
    />
  </div>
</template>
<template>
  <KCard>
    <template v-slot:body>
      <div v-if="eventType">
        {{eventType}} on: {{row}}
      </div>
      <div v-else>Waiting</div>
      <KTableLegacy
        :options="$frontmatter.tableOptions"
        is-clickable
        has-hover
        @row:click="actionRow"
        @cell:mouseover="actionRow"
      />
    </template>
  </KCard>
</template>
<script>
export default {
  data() {
    return {
      row: null,
      eventType: ''
    }
  },
  methods: {
    actionRow (e, row, type) {
      this.eventType = e.type
      this.row = row
    }
  }
}
</script>
```

### Sorting

`@sort` - returns header key that was clicked and current `sortOrder`.

There are two props used to make the table sortable; `sortOrder`, which is
either 'ascending' or 'descending' and `sortKey`, which tells the table which
column is currently being sorted. If a sortKey exists, then clicking the table
header will emit an Event called `sort` which must be handled by the parent
component to implement the actual sorting logic. A basic implementation of
`sort` called `defaultSorter` is included in KTableLegacy and can be imported
separately and used with a helper function in the parent. Once a table column
with `sortable` is read, that column header will become clickable. An arrow then
appears beside the table header, the state of the arrow depending on the
sortOrder. In the following example, the `defaultSorter` from KTableLegacy is being
imported, and the table is able to be sorted by any of the three columns by
clicking on the headers.

<template>
  <KTableLegacy
    :options="tableOptions"
    :sort-order="sortOrder"
    :sort-key="sortKey"
    @sort="sortFieldHelper"
    />
</template>

```html
<template>
<!--
  * @param {String} key - the current key to sort by
  * @param {String} previousKey - the previous key used to sort by
  * @param {String} sortOrder - either ascending or descending
  * @param {Array} items - the list of items to sort
  * @return {Object} an object containing the previousKey and sortOrder
-->
<KTableLegacy
    :options="tableOptions"
    :sort-order="sortOrder"
    :sort-key="sortKey"
    @sort="sortFieldHelper"
    />
</template>
<script>
import { defaultSorter } from '@kongponents/KTableLegacy'
export default {
  data() {
    return {
      row: null,
      eventType: '',
      sortOrder: 'ascending',
      sortKey: 'name',
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name', sortable: true },
          { label: 'ID', key: 'id', sortable: true },
          { label: 'Enabled', key: 'enabled', sortable: true },
          { label: 'Theme Colors', key: 'themeColors', sortable: true },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true',
            themeColors: []
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false',
            themeColors: ['blue','violet']
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true',
            themeColors: ['green', 'yellow']
          }
        ]
      }
    }
  },
  methods: {
    sortFieldHelper (key) {
      const {previousKey, sortOrder } = this.defaultSorter(key, this.sortKey, this.sortOrder, this.tableOptions.data)
      this.sortKey = previousKey
      this.sortOrder = sortOrder
    },
    defaultSorter
  }
}
</script>
```

## Slots

Both column cells & header cells are slottable in KTableLegacy. Use slots to gain
access to the row data.

- `column-{column-key}` - Will slot the header cell
- `{column-key}` - Will slot the column cell of a given row

### Column Header

<KTableLegacy :options="$frontmatter.tableOptions">
  <template v-slot:column-name="{ column }">
    {{ column.label.toUpperCase() }}
  </template>
</KTableLegacy>

```html
<template>
  <KTableLegacy :options="tableOptions">
    <!-- Slot column header "name" -->
    <template v-slot:column-name="{ column }">
      {{ column.label.toUpperCase() }}
    </template>
  </KTableLegacy>
</template>
<script>
export default {
  data() {
    return {
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'ID', key: 'id' },
          { label: 'Enabled', key: 'enabled' },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true'
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false'
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true'
          }
        ]
      }
    }
  }
}
</script>
```

### Column Cell

<KTableLegacy :options="$frontmatter.tableOptions">
  <template v-slot:enabled="{rowValue}">
    <span v-if="rowValue" style="color: green">&#10003;</span>
    <span v-else style="color: red">&#10007;</span>
  </template>
  <template v-slot:actions><KButton appearance="btn-link">Edit</KButton></template>
</KTableLegacy>

```html
<template>
  <KTableLegacy :options="tableOptions">
    <!-- Slot each "enabled" cell in each row & add icon if matching value -->
    <template v-slot:enabled="{rowValue}">
      <span v-if="rowValue" style="color: green">&#10003;</span>
      <span v-else style="color: red">&#10007;</span>
    </template>
    <!-- Slot each "actions" cell in each row & link -->
    <template v-slot:actions><a href="">Edit</a></template>
  </KTableLegacy>
</template>
<script>
export default {
  data() {
    return {
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'ID', key: 'id' },
          { label: 'Enabled', key: 'enabled' },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: true
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: false
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true'
          }
        ]
      }
    }
  }
}
</script>
```

## Theming

| Variable | Purpose
|:-------- |:-------
| `--KTableLegacyBorder`| Sets cell border color
| `--KTableLegacyColor` | Font color
| `--KTableLegacyHover`| Hover variant background color
| `--KTableLegacyHeaderSize`| Font size of header th

\
An Example of changing the hover background might look like.

<div class="table-wrapper">
  <KTableLegacy :options="$frontmatter.tableOptions" hasHover />
</div>

```html
<template>
  <KTableLegacy
    :options="tableOptions"
    hasHover />
</template>

<style>
:root {
  --KTableLegacyHover: lavender;
}
</style>
```

<script>
import { defaultSorter } from '../../packages/KTableLegacy/KTableLegacy'
export default {
  data() {
    return {
      row: null,
      eventType: '',
      sortOrder: 'ascending',
      sortKey: 'name',
      tableOptions: {
        headers: [
          { label: 'Name', key: 'name', sortable: true },
          { label: 'ID', key: 'id', sortable: true },
          { label: 'Enabled', key: 'enabled', sortable: true },
          { label: 'Theme Colors', key: 'themeColors', sortable: true },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          {
            name: 'Basic Auth',
            id: '517526354743085',
            enabled: 'true',
            themeColors: []
          },
          {
            name: 'Website Desktop',
            id: '328027447731198',
            enabled: 'false',
            themeColors: ['blue','violet']
          },
          {
            name: 'Android App',
            id: '405383051040955',
            enabled: 'true',
            themeColors: ['green', 'yellow']
          }
        ]
      },
      tableOptionsRowAttrs: {
        headers: [
          { label: 'Type', key: 'type' },
          { label: 'Value', key: 'value' },
          { label: 'Enabled', key: 'enabled'}
        ],
        data: [
          {
            type: 'desktop',
            value: 'Windows 10',
            enabled: 'true'
          },
          {
            type: 'phone',
            value: 'LineageOS',
            enabled: 'false'
          },
          {
            type: 'tablet',
            value: 'ipadOS',
            enabled: 'true'
          }
        ]
      },
      tableOptionsLink: {
        headers: [
          { label: 'Company', key: 'company' },
          { key: 'actions', hideLabel: true }
        ],
        data: [
          { company: { href: 'http://www.creative.com', label: 'Creative Labs' } },
          { company: { href: 'http://www.bang-olufsen.com', label: 'Bang&Olufsen' } },
          { company: { href: 'http://www.klipsch.com', label: 'Klipsch' } },
          { company: { href: 'http://www.bose.com', label: 'Bose'} },
          { company: { href: 'http://www.sennheiser.com', label: 'Sennheiser'} }
        ]
      },
      tableOptionsCellAttrs: {
        headers: [
          { label: 'Name', key: 'name' },
          { label: 'Company', key: 'company' },
          { label: 'Description', key: 'description' }
        ],
        data: [
          {
            name: 'SageMaker',
            company: 'Amazon',
            description: 'Amazon SageMaker is a fully-managed service that enables developers and data scientists to quickly and easily build, train, and deploy machine learning models at any scale. Amazon SageMaker removes all the barriers that typically slow down developers who want to use machine learning.',
          },
          {
            name: 'Azure Machine Learning Studio',
            company: 'Microsoft',
            description: 'Azure Machine Learning Studio is a GUI-based integrated development environment for constructing and operationalizing Machine Learning workflow on Azure.',
          },
          {
            name: 'IBM Watson Machine Learning',
            company: 'IBM',
            description: 'IBM Watson Studio accelerates the machine and deep learning workflows required to infuse AI into your business to drive innovation.',
          },
          {
            name: 'TensorFlow',
            company: 'Google',
            description: 'TensorFlow is an open source software library for numerical computation using data flow graphs.',
          },
        ]
      }
    }
  },
  methods: {
    actionRow (e, row, type) {
      this.eventType = e.type
      this.row = row
    },
    handleRowClick(e, row) {
      const metaKeyPressed = e.metaKey || e.ctrlKey

      if (e.target.tagName !== 'BUTTON') {
        if (metaKeyPressed) {
          return window.open(row.company.href)
        } else {
          window.location = row.company.href
        }
      }
    },
    sortFieldHelper (key) {
      const {previousKey, sortOrder } = this.defaultSorter(key, this.sortKey, this.sortOrder, this.tableOptions.data)
      this.sortKey = previousKey
      this.sortOrder = sortOrder
    },
    linkHander (e) {
      alert('a link was clicked')
    },
    buttonHandler (e) {
      alert('a button was pressed')
    },
    rowAttrsFn (rowItem) {
      return {
        class: {
          'enabled': rowItem.enabled === 'true',
          'disabled': rowItem.enabled === 'false'
        },
        'data-testid': 'row-item'
      }
    },
    defaultSorter,
    cellAttrsFn ({ headerKey, row, rowIndex, colIndex }) {
      /**
       * Sets cell background color based on data returned in
       * the row parameter and the index of the cell
       */
      const backgroundColor = () => {
        if (row.company && row.company === 'Google') {
          if (colIndex === 0) {
            return '#4285F4'
          } else if (colIndex === 1) {
            return '#DB4437'
          } else {
            return '#F4B400'
          }
        }

        return ''
      }

      /**
       * Returns an object of attributes to be applied to cells
       */
      return {
        class: {
          'truncate': headerKey === 'description' || headerKey === 'name',
        },
        'datatest-id': `row-${rowIndex + 1}-col-${headerKey}`,
        style: {
          'maxWidth': headerKey==='description' ? '50ch' : headerKey === 'name' ? '22ch' : '25ch',
          'backgroundColor': backgroundColor(),
        },
      }
    }
  }
}
</script>

<style lang="scss">
  .table-docs .k-table {
    display: table;
    th, tr, td {
      border: unset;
    }
  }

  .table-wrapper {
  --KTableLegacyHover: lavender;
  }

  .k-table {
    tr.enabled {
      --KTableLegacyHover: var(--green-200, #ccffe1);
      --KTableLegacyBorder: var(--green-400, #19a654);
    }

    tr.disabled {
      --KTableLegacyHover: var(--yellow-100, #fff9e6);
      --KTableLegacyBorder: var(--yellow-200, #ffdc73);
    }
  }
</style>
