<template>
  <ais-instant-search
    index-name="restaurant-finder_dev"
    :search-client="searchClient"
    class="container"
  >
    <ais-configure :hits-per-page.camel="8" />

    <SearchBox />

    <CurrentRefinements />

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <SearchSidebar />

      <ResultsGrid />

      <div class="col-span-9 col-start-4 my-8 flex justify-between">
        <div></div>

        <PaginationButtons />

        <ResultsStats />
      </div>
    </div>
  </ais-instant-search>
</template>

<script>
import { AisInstantSearch, AisConfigure } from 'vue-instantsearch/vue3/es'

import algoliasearch from 'algoliasearch/lite'

// Import our custom components.
import SearchBox from '@/components/SearchBox'
import SearchSidebar from '@/components/SearchSidebar'
import CurrentRefinements from '@/components/CurrentRefinements'
import ResultsGrid from '@/components/ResultsGrid'
import ResultsStats from '@/components/ResultsStats'
import PaginationButtons from '@/components/PaginationButtons'

export default {
  name: 'InstantSearch',
  components: {
    AisInstantSearch,
    AisConfigure,
    PaginationButtons,
    ResultsStats,
    ResultsGrid,
    CurrentRefinements,
    SearchSidebar,
    SearchBox,
  },
  data() {
    return {
      // TODO: Multiple instances of this in diff components. Initialise the search client for Algolia InstantSearch.
      searchClient: algoliasearch(
        'DFY2HEF3K2',
        '9848dca93fbcb86c6ad80832b8ce7f75'
      ),
    }
  },
}
</script>
