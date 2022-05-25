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
    </div>
  </ais-instant-search>
</template>

<script>
// Tree shaking for optimal build size
import { AisInstantSearch, AisConfigure } from 'vue-instantsearch/vue3/es'

// Import our custom components.
import SearchBox from '@/components/SearchBox'
import SearchSidebar from '@/components/SearchSidebar'
import CurrentRefinements from '@/components/CurrentRefinements'
import ResultsGrid from '@/components/ResultsGrid'
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
      appId: this.algoliaClientStore.appId,
      apiKey: this.algoliaClientStore.apiKey,
      useCookie: true,
    })
  },
  components: {
    AisInstantSearch,
    AisConfigure,
    ResultsGrid,
    CurrentRefinements,
    SearchSidebar,
    SearchBox,
  },
}
</script>
