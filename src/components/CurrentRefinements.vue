<template>
  <!-- Uses custom AIS component to show the user which refinements they have made. Supports multiple attributes, for example cuisine type and rating etc. -->
  <ais-current-refinements>
    <template v-slot="{ items, createURL }">
      <ul class="my-8 flex justify-center gap-4">
        <!-- Group the refinements by attribute type -->
        <li
          v-for="item in items"
          :key="item.attribute"
          class="flex flex-col items-center gap-4 lg:flex-row lg:text-lg"
        >
          <span class="capitalize"> {{ item.label.replace('_', ' ') }}: </span>

          <ul>
            <!-- For each selected refinement in the current items, display the following code: -->
            <li
              v-for="refinement in item.refinements"
              :key="
                [
                  refinement.attribute,
                  refinement.type,
                  refinement.value,
                  refinement.operator,
                ].join(':')
              "
            >
              <a
                class="flex cursor-pointer items-center justify-between gap-2 rounded bg-blue px-3 py-2 text-white"
                :href="createURL(refinement)"
                @click.prevent="item.refine(refinement)"
              >
                {{ refinement.label }}

                <img
                  src="@/assets/img/icons/line--white.svg"
                  width="20"
                  height="20"
                  alt="Remove"
                />
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </template>
  </ais-current-refinements>
</template>

<script>
import { AisCurrentRefinements } from 'vue-instantsearch/vue3/es'

export default {
  name: 'CurrentRefinements',
  components: {
    AisCurrentRefinements,
  },
}
</script>
