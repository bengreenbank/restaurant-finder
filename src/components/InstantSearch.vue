<template>
  <ais-instant-search
    index-name="restaurant-finder_dev"
    :search-client="searchClient"
    class="container"
  >
    <SearchBox />

    <ais-hits />
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import SearchBox from '@/components/SearchBox'

export default {
  name: 'InstantSearch',
  components: { SearchBox },
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
