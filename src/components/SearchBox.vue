<template>
  <!-- The search box allows the user to type a custom query. This will search the 'searchable attributes' in the Algolia index. -->
  <ais-search-box>
    <template v-slot="{ isSearchStalled }">
      <div class="my-12 mx-auto max-w-lg">
        <div
          class="group flex w-full items-stretch overflow-hidden rounded-md border border-solid border-grey"
        >
          <!-- We use debouncing to optimise the number of search queries. More info in the component. -->
          <DebouncedSearchBox />

          <!-- For slow connections, such as a mobile device with poor service. -->
          <span :hidden="!isSearchStalled">Loading...</span>

          <!-- This helps illustrate the function of the search box as a whole. As we use 'instant' search, this does not need to be a functional button. -->
          <div class="flex w-14 items-center justify-center bg-blue">
            <img
              src="@/assets/img/icons/search--white.svg"
              alt="Search"
              width="30"
              height="30"
            />
          </div>
        </div>
      </div>
    </template>
  </ais-search-box>
</template>

<script>
// Tree shaking for optimal build size
import { AisSearchBox } from 'vue-instantsearch/vue3/es'
import DebouncedSearchBox from '@/components/DebouncedSearchBox'

export default {
  name: 'SearchBox',
  components: {
    DebouncedSearchBox,
    AisSearchBox,
  },
}
</script>
