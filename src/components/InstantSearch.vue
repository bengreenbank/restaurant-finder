<template>
  <ais-instant-search
    index-name="restaurant-finder_dev"
    :search-client="algoliaClientStore.searchClient"
    :middlewares="middlewares"
    class="container"
  >
    <ais-configure :hits-per-page.camel="8" />

    <SearchBox />

    <CurrentRefinements />

    <div class="flex flex-col gap-6 lg:grid lg:grid-cols-12">
      <SearchSidebar />

      <ResultsGrid />

      <div
        class="my-8 flex flex-col items-center justify-between gap-6 px-4 lg:col-span-9 lg:col-start-4"
      >
        <PaginationButtons />

        <ResultsStats />
      </div>
    </div>
  </ais-instant-search>
</template>

<script>
import { AisInstantSearch, AisConfigure } from 'vue-instantsearch/vue3/es'

// Import our custom components.
import SearchBox from '@/components/SearchBox'
import SearchSidebar from '@/components/SearchSidebar'
import CurrentRefinements from '@/components/CurrentRefinements'
import ResultsGrid from '@/components/ResultsGrid'
import ResultsStats from '@/components/ResultsStats'
import PaginationButtons from '@/components/PaginationButtons'
import { useAlgoliaClientStore } from '@/store/AlgoliaClient'

// Import Insights.
import aa from 'search-insights'
import { createInsightsMiddleware } from 'instantsearch.js/es/middlewares'

const insightsMiddleware = createInsightsMiddleware({
  insightsClient: aa,
})

export default {
  name: 'InstantSearch',
  setup() {
    const algoliaClientStore = useAlgoliaClientStore()

    return {
      algoliaClientStore,
    }
  },
  data() {
    return {
      middlewares: [insightsMiddleware],
    }
  },
  mounted() {
    aa('init', {
      appId: 'DFY2HEF3K2',
      apiKey: '9848dca93fbcb86c6ad80832b8ce7f75',
      useCookie: true,
    })
  },
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
}
</script>
