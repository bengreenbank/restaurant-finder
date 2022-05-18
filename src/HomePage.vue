<template>
  <navigation-bar />

  <instant-search />
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import InstantSearch from '@/components/InstantSearch'
export default {
  name: 'HomePage',
  components: { InstantSearch, NavigationBar },
}
</script>
