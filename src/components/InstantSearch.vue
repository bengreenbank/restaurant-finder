<template>
  <ais-instant-search
    index-name="restaurant-finder_dev"
    :search-client="searchClient"
    class="container"
  >
    <SearchBox />

    <CurrentRefinements />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <SearchSidebar />

      <div class="col-span-9">
        <ais-hits />
      </div>
    </div>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import SearchBox from '@/components/SearchBox'
import SearchSidebar from '@/components/SearchSidebar'
import CurrentRefinements from '@/components/CurrentRefinements'

export default {
  name: 'InstantSearch',
  components: { CurrentRefinements, SearchSidebar, SearchBox },
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
