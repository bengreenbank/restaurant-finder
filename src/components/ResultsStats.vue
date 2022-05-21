<template>
  <ais-stats class="max-w-sm">
    <template v-slot="{ nbHits, processingTimeMS }">
      <span class="text-blue">{{ nbHits }} results</span>
      retrieved in <span class="text-blue">{{ processingTimeMS }}ms</span>
    </template>
  </ais-stats>
</template>

<script>
export default {
  name: 'ResultsStats',
}
</script>

<style scoped></style>
