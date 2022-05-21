<template>
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
      <ul class="flex items-center gap-4">
        <li
          v-if="!isFirstPage"
          class="flex h-9 w-9 cursor-pointer items-center justify-center rounded bg-blue-light px-3 py-1 text-white"
        >
          <a :href="createURL(0)" @click.prevent="refine(0)"> ‹‹ </a>
        </li>

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

        <li v-for="page in pages" :key="page">
          <a
            :href="createURL(page)"
            :class="{ 'font-semibold': page === currentRefinement }"
            @click.prevent="refine(page)"
          >
            {{ page + 1 }}
          </a>
        </li>

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
export default {
  name: 'PaginationButtons',
}
</script>

<style scoped></style>
