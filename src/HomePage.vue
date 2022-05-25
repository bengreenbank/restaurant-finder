<template>
  <NavigationBar />

  <InstantSearch />

  <SubmissionModal />

  <ApplicationAnalytics />
</template>

<script>
import NavigationBar from '@/components/NavigationBar'
import InstantSearch from '@/components/InstantSearch'
import SubmissionModal from '@/components/SubmissionModal'
import ApplicationAnalytics from '@/components/ApplicationAnalytics'

export default {
  name: 'HomePage',
  components: {
    SubmissionModal,
    InstantSearch,
    NavigationBar,
    ApplicationAnalytics,
  },
}
</script>
