import { defineStore } from 'pinia'

export const useSubmissionModalStore = defineStore('submissionModalStore', {
  state: () => {
    return {
      isModalVisible: false,
      isSuccessfulSubmission: false,
    }
  },
  actions: {
    toggleModal() {
      this.isModalVisible = !this.isModalVisible
      this.isSuccessfulSubmission = false
    },
  },
})
