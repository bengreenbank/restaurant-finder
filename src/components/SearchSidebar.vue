<template>
  <div class="mb-4 border-r border-solid border-r-grey pr-6 lg:col-span-1">
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

<style scoped></style>
