<template>
  <div class="flex flex-col items-start gap-3 rounded bg-blue p-4 text-white">
    <h2 class="text-md">Own a restaurant?</h2>

    <p class="text-sm">Submit your details to be included in this finder!</p>

    <button
      class="rounded bg-blue-light p-2.5 text-sm"
      @click="submissionModalStore.toggleModal()"
    >
      Submit details
    </button>
  </div>
</template>

<script>
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
