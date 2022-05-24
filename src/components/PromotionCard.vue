<template>
  <!-- This template displays information on how to submit restaurant details using the modal form. -->
  <div class="flex flex-col items-start gap-3 rounded bg-blue p-4 text-white">
    <h2 class="text-md">Own a restaurant?</h2>

    <p class="text-sm">Submit your details to be included in this finder!</p>

    <!-- This button opens the modal (it can't close it, as it is underneath the z-index of the modal when the modal is open). -->
    <button
      class="rounded bg-blue-light p-2.5 text-sm"
      @click="submissionModalStore.toggleModal()"
    >
      Submit details
    </button>
  </div>
</template>

<script>
// I use Pinia to store the state of the modal - so I can access it in multiple components across the app.
import { useSubmissionModalStore } from '@/store/SubmissionModal'

export default {
  name: 'PromotionCard',
  setup() {
    const submissionModalStore = useSubmissionModalStore()

    return {
      submissionModalStore,
    }
  },
}
</script>
