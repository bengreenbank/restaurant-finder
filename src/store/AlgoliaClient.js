import { defineStore } from 'pinia'
const algoliasearch = require('algoliasearch')

export const useAlgoliaClientStore = defineStore('algoliaClientStore', {
  // State is like data in a Vue component. Here is where I define the data I need across multiple components.
  state: () => {
    return {
      appId: process.env.VUE_APP_ALGOLIA_APP_ID,
      apiKey: process.env.VUE_APP_ALGOLIA_API_KEY,
      analyticsKey: process.env.VUE_APP_ALGOLIA_ANALYTICS_KEY,
    }
  },
  // The search client can be computed from the state of the API Keys above.
  getters: {
    searchClient: (state) => algoliasearch(state.appId, state.apiKey),
  },
})
