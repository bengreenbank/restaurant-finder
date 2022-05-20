<template>
  <ais-instant-search
    index-name="restaurant-finder_dev"
    :search-client="searchClient"
    class="container"
  >
    <SearchBox />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-6">
      <SearchSidebar />

      <ais-hits />
    </div>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import SearchBox from '@/components/SearchBox'
import SearchSidebar from '@/components/SearchSidebar'

export default {
  name: 'InstantSearch',
  components: { SearchSidebar, SearchBox },
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
