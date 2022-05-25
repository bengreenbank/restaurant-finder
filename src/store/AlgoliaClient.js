import { defineStore } from 'pinia'
const algoliasearch = require('algoliasearch')

export const useAlgoliaClientStore = defineStore('algoliaClientStore', {
  // State is like data in a Vue component. Here is where I define the data I need across multiple components.
  state: () => {
    return {
      appId: 'DFY2HEF3K2',
      apiKey: '9848dca93fbcb86c6ad80832b8ce7f75',
      adminKey: 'e87e0e6ab2d84a8d6dcce4e391699038',
      analyticsKey: '2c8393d48638ce3d3ad9c2f2f866f553',
    }
  },
  // The search client can be computed from the state of the API Keys above.
  getters: {
    searchClient: (state) => algoliasearch(state.appId, state.apiKey),
  },
})
