<template>
  <ais-instant-search
    index-name="restaurant-finder_dev"
    :search-client="searchClient"
  >
    <!-- Widgets -->
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'

export default {
  name: 'InstantSearch',
  data() {
    return {
      searchClient: algoliasearch(
        'DFY2HEF3K2',
        '9848dca93fbcb86c6ad80832b8ce7f75'
      ),
    }
  },
}
</script>
