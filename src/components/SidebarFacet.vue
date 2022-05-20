<template>
  <ais-menu
    attribute="categories"
    :sort-by="['isRefined', 'count']"
    :limit="5"
    show-more
  >
    <template
      v-slot="{
        items,
        canToggleShowMore,
        isShowingMore,
        toggleShowMore,
        refine,
        createURL,
      }"
    >
      <ul class="flex flex-col gap-2">
        <li v-for="item in items" :key="item.value">
          <a
            :href="createURL(item.value)"
            :class="item.isRefined ? 'font-bold' : ''"
            class="flex items-center justify-between"
            @click.prevent="refine(item.value)"
          >
            <span>
              {{ item.label }}
            </span>

            <span class="text-blue">
              {{ item.count }}
            </span>
          </a>
        </li>

        <li>
          <button
            class="mt-4 flex w-full cursor-pointer items-center justify-between gap-2 rounded bg-blue px-3 py-2 text-sm text-white disabled:cursor-auto disabled:opacity-20"
            :disabled="!canToggleShowMore"
            @click="toggleShowMore"
          >
            {{ isShowingMore ? 'Show Less' : 'Show All' }}

            <img
              src="@/assets/img/icons/chevron--white.svg"
              width="25"
              height="25"
              :class="isShowingMore ? 'rotate-180' : ''"
              alt=""
            />
          </button>
        </li>
      </ul>
    </template>
  </ais-menu>
</template>

<script>
export default {
  name: 'SidebarFacet',
}
</script>

<style scoped></style>
