<template>
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
import GridCard from '@/components/GridCard'
export default {
  name: 'ResultsGrid',
  components: { GridCard },
}
</script>

<style scoped></style>
