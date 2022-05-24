import { defineStore } from 'pinia'

export const useSubmissionModalStore = defineStore('submissionModalStore', {
  // State is like data in a Vue component. Here is where I define the data I need across multiple components.
  state: () => {
    return {
      isModalVisible: false,
      isSuccessfulSubmission: false,
    }
  },
  // Actions are like methods in a Vue component. Here is where I define the functions I need across multiple components.
  actions: {
    toggleModal() {
      // 'Switch' visibility of the modal/
      this.isModalVisible = !this.isModalVisible

      // Once the modal is closed or opened, the form resets. So the submission can no longer be successful.
      this.isSuccessfulSubmission = false
    },
  },
})
