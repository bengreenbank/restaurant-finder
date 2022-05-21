<template>
  <ais-current-refinements>
    <template v-slot="{ items, createURL }">
      <ul class="my-8 flex justify-center gap-4">
        <li
          v-for="item in items"
          :key="item.attribute"
          class="flex items-center gap-4 text-lg"
        >
          <span class="capitalize"> {{ item.label.replace('_', ' ') }}: </span>

          <ul>
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
export default {
  name: 'CurrentRefinements',
}
</script>

<style scoped></style>
