<template>
  <!-- The menu component is different to the refinement list component, as it only supports one facet for selection at a time. -->
  <!-- This is appropriate in our situation, as the index 'food_type's are only single items, rather than an array of items. -->
  <!-- We display the attributes in 'count' order with the current refinement at the top. This helps the user see what is popular. -->
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
        <!-- For each item we display it's name and the number of items with that facet. -->
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

        <!-- There are a high number of attributes in this index, so we show the 5 most popular by default. -->
        <!-- If the user wishes to show more, they can press the button to toggle. -->
        <li>
          <button
            class="mt-4 flex min-w-max cursor-pointer items-center justify-between gap-2 rounded bg-blue px-3 py-2 text-sm text-white disabled:cursor-auto disabled:opacity-20"
            :disabled="!canToggleShowMore"
            @click="toggleShowMore"
          >
            {{ isShowingMore ? 'Show Less' : `Show All` }}

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
import { AisMenu } from 'vue-instantsearch/vue3/es'

export default {
  name: 'SidebarFacet',
  components: {
    AisMenu,
  },
}
</script>
