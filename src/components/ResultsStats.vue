<template>
  <!-- The stats show the users how many results there are and how long the search has taken. (Very quick!) -->
  <ais-stats class="max-w-sm">
    <template v-slot="{ nbHits, processingTimeMS }">
      <span class="text-blue">{{ nbHits }} results</span>
      retrieved in <span class="text-blue">{{ processingTimeMS }}ms</span>
    </template>
  </ais-stats>
</template>

<script>
import { AisStats } from 'vue-instantsearch/vue3/es'

export default {
  name: 'ResultsStats',
  components: {
    AisStats,
  },
}
</script>
