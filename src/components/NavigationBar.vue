<template>
  <header class="container font-sans">
    <div
      class="border-b-solid flex items-center justify-between gap-6 border-b border-b-grey py-6"
    >
      <img
        src="@/assets/img/icons/restaurant-menu.svg"
        alt="Knife & Spoon"
        width="48"
        height="48"
      />

      <nav>
        <ul class="flex items-center gap-6">
          <NavigationItem to="/" text="Search" />

          <NavigationItem to="/add" text="Add" />

          <NavigationItem to="/delete" text="Delete" />
        </ul>
      </nav>

      <a
        class="flex items-center gap-2.5 rounded bg-blue px-3 py-2 text-sm text-white"
        href="https://github.com/bengreenbank/restaurant-finder"
        target="_blank"
      >
        View on GitHub

        <img
          src="@/assets/img/icons/open-in-new--white.svg"
          width="14"
          height="14"
          alt="Open in new tab"
        />
      </a>
    </div>
  </header>
</template>

<script>
import NavigationItem from '@/components/NavigationItem'
export default {
  name: 'NavigationBar',
  components: { NavigationItem },
}
</script>

<style scoped></style>
