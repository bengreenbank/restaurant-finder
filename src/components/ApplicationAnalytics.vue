<template>
  <div class="container my-10" data-aos="fade-up">
    <h2 class="mb-2 text-3xl font-semibold text-blue">Analytics</h2>

    <!-- I've chosen to use the top results API endpoint -->
    <h3>Top 10 Results, Views</h3>

    <!-- The user can customise the start date of the results by toggling these buttons -->
    <div class="mt-2 flex gap-4">
      <button :class="{ 'text-blue': days === 7 }" @click="changeDays(7)">
        7 days
      </button>

      <button :class="{ 'text-blue': days === 30 }" @click="changeDays(30)">
        30 days
      </button>

      <button :class="{ 'text-blue': days === 60 }" @click="changeDays(60)">
        60 days
      </button>

      <button :class="{ 'text-blue': days === 90 }" @click="changeDays(90)">
        90 days
      </button>
    </div>

    <!-- This table displays 10 results from the API call -->
    <div class="overflow-x-auto" data-aos="fade-up">
      <table
        class="mt-6 w-full max-w-full table-auto border-collapse border border-grey p-3 text-base"
      >
        <thead class="max-w-full bg-blue text-left font-semibold text-white">
          <tr>
            <th class="border border-grey p-3">ID</th>

            <th class="border border-grey p-3">Viewed</th>

            <th class="border border-grey p-3">Clicked</th>

            <th class="border border-grey p-3">CTR</th>

            <th class="border border-grey p-3">Converted</th>

            <th class="border border-grey p-3">CVR</th>
          </tr>
        </thead>

        <!-- I only display the table body if the results have been populated. This is not always instant, especially for users with slow connections. -->
        <!-- If the new date query is 'loading' then I apply an opacity class to illustrate that the data is changing, whilst still keeping the structure (so there are no layout shifts) -->
        <tbody :class="{ 'opacity-30': isLoading }" v-if="hits != null">
          <tr v-for="hit in hits" :key="hit.hit">
            <td class="border border-grey p-3">{{ hit.hit }}</td>

            <td class="border border-grey p-3">{{ hit.count }}</td>

            <td class="border border-grey p-3">{{ hit.clickCount }}</td>

            <td class="border border-grey p-3">
              {{
                hit.clickThroughRate ? hit.clickThroughRate.toFixed(2) : '0'
              }}%
            </td>

            <td class="border border-grey p-3">
              {{ hit.conversionCount }}
            </td>

            <td class="border border-grey p-3">
              {{ hit.conversionRate ? hit.conversionRate.toFixed(2) : '0' }}%
            </td>
          </tr>
        </tbody>

        <!-- If the results are still loading, I inform the user here -->
        <tbody v-else>
          <tr>
            <td class="p-3">Loading your analytics...</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// I use moment to format '7 days ago', '30 days ago' into the correct format for the API request.
import moment from 'moment'

// Import Pinia store
import { useAlgoliaClientStore } from '@/store/AlgoliaClient'

// Import Axios for API requests.
const axios = require('axios').default

export default {
  name: 'ApplicationAnalytics',
  data() {
    return {
      // The hits from the API request populate here.
      hits: null,
      // The start date will be calculated using this integer.
      days: 7,
      // Boolean for whether the API query is running or not. Helps with conditional display for code above.
      isLoading: true,
    }
  },
  setup() {
    const algoliaClientStore = useAlgoliaClientStore()

    return {
      algoliaClientStore,
    }
  },
  methods: {
    // This method changes the start date using the data from each button.
    changeDays(days) {
      this.days = days

      this.getTopHits()
    },
    getTopHits() {
      // When the APi request is running, set the loading state.
      this.isLoading = true

      // I use Axios for the API request.s
      axios
        .get('/hits', {
          baseURL: 'https://analytics.us.algolia.com/2/',
          params: {
            index: 'restaurant-finder_dev',
            clickAnalytics: true,
            startDate: this.startDate,
          },
          headers: {
            'X-Algolia-Application-Id': this.algoliaClientStore.appId,
            'X-Algolia-API-Key': this.algoliaClientStore.analyticsKey,
          },
        })
        .then((response) => {
          this.hits = response.data.hits
          this.isLoading = false
        })
        // I like to output console errors for reference. If I had more time, I could add some kind of warning alert for when there is an error instead.
        .catch((error) => {
          console.error('Error:', error)
        })
    },
  },
  mounted() {
    // We want to get the hits on initial mount.
    this.getTopHits()
  },
  computed: {
    startDate() {
      // This calculates the date x days ago and formats it into what we need for the API request.
      return moment().subtract(this.days, 'days').format('YYYY-MM-DD')
    },
  },
}
</script>
