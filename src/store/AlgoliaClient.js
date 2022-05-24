import { defineStore } from 'pinia'
const algoliasearch = require('algoliasearch')

export const useAlgoliaClientStore = defineStore('algoliaClientStore', {
  // State is like data in a Vue component. Here is where I define the data I need across multiple components.
  state: () => {
    return {
      searchClient: algoliasearch(
        'DFY2HEF3K2',
        '9848dca93fbcb86c6ad80832b8ce7f75'
      ),
    }
  },
})
