<template>
  <!-- Customises Algolia's pagination component for navigation between multiple pages. -->
  <ais-pagination>
    <template
      v-slot="{
        currentRefinement,
        nbPages,
        pages,
        isFirstPage,
        isLastPage,
        refine,
        createURL,
      }"
    >
      <ul class="flex items-center gap-3 lg:gap-4">
        <!-- Button that returns to page 1 (actually page 0) -->
        <li
          v-if="!isFirstPage"
          class="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-blue-light px-3 py-1 text-white"
        >
          <a :href="createURL(0)" @click.prevent="refine(0)"> ‹‹ </a>
        </li>

        <!-- Button that returns to the previous page. -->
        <li
          v-if="!isFirstPage"
          class="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-blue text-white"
        >
          <a
            :href="createURL(currentRefinement - 1)"
            @click.prevent="refine(currentRefinement - 1)"
          >
            ‹
          </a>
        </li>

        <!-- For every page within the (current range of pages) show a link to that page. -->
        <li v-for="page in pages.slice(0, 3)" :key="page">
          <a
            :href="createURL(page)"
            :class="{ 'font-semibold': page === currentRefinement }"
            @click.prevent="refine(page)"
          >
            {{ page + 1 }}
          </a>
        </li>

        <!-- Button that advances to the next page. -->
        <li
          v-if="!isLastPage"
          class="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-blue text-white"
        >
          <a
            :href="createURL(currentRefinement + 1)"
            @click.prevent="refine(currentRefinement + 1)"
          >
            ›
          </a>
        </li>

        <!-- Button that advances to the final page. -->
        <li
          v-if="!isLastPage"
          class="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-blue-light px-3 py-1 text-white"
        >
          <a :href="createURL(nbPages)" @click.prevent="refine(nbPages)">
            ››
          </a>
        </li>
      </ul>
    </template>
  </ais-pagination>
</template>

<script>
import { AisPagination } from 'vue-instantsearch/vue3/es'

export default {
  name: 'PaginationButtons',
  components: {
    AisPagination,
  },
}
</script>
