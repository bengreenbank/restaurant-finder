<template>
  <!-- The sidebar is a familiar interface online, which allows users to narrow down their search using Algolia facets. -->
  <div
    class="mb-4 border-r-0 border-solid border-r-grey lg:col-span-3 lg:border-r lg:pr-6"
  >
    <!-- Currently we only use one facet, however the index has multiple useful facets if required in future development. -->
    <h2 class="mb-4 text-lg font-semibold">Filter by Type</h2>

    <sidebar-facet attribute="food_type" />
  </div>
</template>

<script>
import SidebarFacet from '@/components/SidebarFacet'

export default {
  name: 'SearchSidebar',
  components: { SidebarFacet },
}
</script>
