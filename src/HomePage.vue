<template>
  <NavigationBar />

  <InstantSearch />

  <SubmissionModal />
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import InstantSearch from '@/components/InstantSearch'
import SubmissionModal from '@/components/SubmissionModal'

export default {
  name: 'HomePage',
  components: { SubmissionModal, InstantSearch, NavigationBar },
}
</script>
