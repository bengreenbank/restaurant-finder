<template>
  <input
    type="search"
    class="grow p-4 group-focus:shadow group-focus:shadow-blue group-focus:ring-0"
    placeholder="Search for your favorite restaurant..."
    v-model="query"
  />
</template>

<script>
import { connectSearchBox } from 'instantsearch.js/es/connectors'
import { createWidgetMixin } from 'vue-instantsearch/vue3/es'

export default {
  name: 'DebouncedSearchBox',
  mixins: [createWidgetMixin({ connector: connectSearchBox })],
  props: {
    // We define the delay as how long the query takes to send after a keypress. This avoids sending multiple requests for one word.
    delay: {
      type: Number,
      default: 200,
      required: false,
    },
  },
  data() {
    return {
      timerId: null,
      localQuery: '',
    }
  },
  unmounted() {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }
  },
  computed: {
    query: {
      get() {
        return this.localQuery
      },
      set(val) {
        this.localQuery = val
        if (this.timerId) {
          clearTimeout(this.timerId)
        }
        this.timerId = setTimeout(() => {
          this.state.refine(this.localQuery)
        }, this.delay)
      },
    },
  },
}
</script>
