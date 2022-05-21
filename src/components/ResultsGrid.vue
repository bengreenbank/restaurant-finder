<template>
  <!-- This is the grid of results that displays. It uses our custom grid cards component and passes the items array to the for loop. -->
  <ais-hits class="col-span-9">
    <template v-slot="{ items }">
      <ul class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <GridCard
          :item="item"
          :index="index"
          v-for="(item, index) in items"
          :key="item.objectID"
        />
      </ul>
    </template>
  </ais-hits>
</template>

<script>
import { AisHits } from 'vue-instantsearch/vue3/es'
import GridCard from '@/components/GridCard'

export default {
  name: 'ResultsGrid',
  components: { AisHits, GridCard },
}
</script>
