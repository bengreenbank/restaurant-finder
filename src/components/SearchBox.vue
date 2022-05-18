<template>
  <ais-search-box>
    <template v-slot="{ currentRefinement, isSearchStalled, refine }">
      <div class="my-12 mx-auto max-w-lg">
        <div
          class="group flex w-full items-stretch overflow-hidden rounded-md border border-solid border-grey"
        >
          <input
            type="search"
            class="grow p-4 group-focus:shadow group-focus:shadow-blue group-focus:ring-0"
            :value="currentRefinement"
            placeholder="Search for your favorite restaurant..."
            @input="refine($event.currentTarget.value)"
          />
          <span :hidden="!isSearchStalled">Loading...</span>

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
export default {
  name: 'SearchBox',
}
</script>

<style scoped></style>
