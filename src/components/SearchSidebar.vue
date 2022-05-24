<template>
  <!-- The sidebar is a familiar interface online, which allows users to narrow down their search using Algolia facets. -->
  <div
    class="mb-4 flex flex-col gap-6 border-r-0 border-solid border-r-grey lg:col-span-3 lg:border-r lg:pr-6"
  >
    <!-- Currently we only use one facet, however the index has multiple useful facets if required in future development. -->
    <h2 class="text-lg font-semibold">Filter by Type</h2>

    <sidebar-facet attribute="food_type" />

    <PromotionCard />
  </div>
</template>

<script>
import SidebarFacet from '@/components/SidebarFacet'
import PromotionCard from '@/components/PromotionCard'

export default {
  name: 'SearchSidebar',
  components: { PromotionCard, SidebarFacet },
}
</script>
