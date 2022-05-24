<template>
  <div
    v-show="submissionModalStore.isModalVisible"
    class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/60 p-4"
  >
    <FormKit
      v-if="!submissionSuccess"
      :config="{
        classes: {
          form: '$reset flex w-[600px] overflow-scroll max-h-full flex-col gap-3 rounded-lg bg-white p-10',
        },
      }"
      type="form"
      submit-label="Add my restaurant!"
      @submit="addRestaurant()"
    >
      <FormKit
        type="text"
        v-model="name"
        label="Name*"
        name="name"
        validation="required|alpha-spaces"
      />

      <FormKit
        type="text"
        v-model="foodType"
        label="Food Type*"
        name="foodType"
        validation="required|alpha-spaces"
      />

      <div
        class="grid grid-cols-2 gap-x-6 gap-y-3 rounded border border-grey p-4"
      >
        <FormKit
          type="text"
          v-model="address"
          label="Address*"
          name="address"
          validation="required|alpha-spaces"
        />

        <FormKit
          type="text"
          v-model="neighbourhood"
          label="Neighbourhood"
          name="neighbourhood"
          validation="alpha-spaces"
        />

        <FormKit
          type="text"
          v-model="area"
          label="Area"
          name="area"
          validation="alpha-spaces"
        />

        <FormKit
          type="text"
          v-model="city"
          label="City*"
          name="city"
          validation="required|alpha-spaces"
        />

        <FormKit
          type="select"
          v-model="state"
          label="State*"
          name="state"
          validation="required|"
          :options="{
            AL: 'Alabama',
            AK: 'Alaska',
            AZ: 'Arizona',
            AR: 'Arkansas',
            CA: 'California',
            CO: 'Colorado',
            CT: 'Connecticut',
            DE: 'Delaware',
            FL: 'Florida',
            GA: 'Georgia',
            HI: 'Hawaii',
            ID: 'Idaho',
            IL: 'Illinois',
            IN: 'Indiana',
            IA: 'Iowa',
            KS: 'Kansas',
            KY: 'Kentucky',
            LA: 'Louisiana',
            ME: 'Maine',
            MD: 'Maryland',
            MA: 'Massachusetts',
            MI: 'Michigan',
            MN: 'Minnesota',
            MS: 'Mississippi',
            MO: 'Missouri',
            MT: 'Montana',
            NE: 'Nebraska',
            NV: 'Nevada',
            NH: 'New Hampshire',
            NJ: 'New Jersey',
            NM: 'New Mexico',
            NY: 'New York',
            NC: 'North Carolina',
            ND: 'North Dakota',
            OH: 'Ohio',
            OK: 'Oklahoma',
            OR: 'Oregon',
            PA: 'Pennsylvania',
            RI: 'Rhode Island',
            SC: 'South Carolina',
            SD: 'South Dakota',
            TN: 'Tennessee',
            TX: 'Texas',
            UT: 'Utah',
            VT: 'Vermont',
            VA: 'Virginia',
            WA: 'Washington',
            WV: 'West Virginia',
            WI: 'Wisconsin',
            WY: 'Wyoming',
          }"
        />

        <FormKit
          type="number"
          v-model="postalCode"
          label="Postal Code*"
          name="postalCode"
          validation="required"
          value="1"
          step="1"
        />

        <FormKit
          type="text"
          v-model="country"
          label="Country*"
          name="country"
          validation="required|is:US"
          :validation-messages="{
            is: 'Sorry, we only accept submissions from restaurants in the US.',
          }"
        />
      </div>

      <FormKit
        type="tel"
        label="Phone Number*"
        v-model="phone"
        validation="required|matches:/^[0-9]{10}$/"
        :validation-messages="{
          matches: 'Phone number must be 10 digits without spaces',
        }"
        validation-visibility="dirty"
      />

      <FormKit
        type="checkbox"
        v-model="paymentOptions"
        label="Payment Options*"
        name="paymentOptions"
        validation="required"
        :options="[
          'Visa',
          'Mastercard',
          'AMEX',
          'Discover',
          'Diners Club',
          'JCB',
          'Carte Blanche',
          'Pay with OpenTable',
          'Cash Only',
        ]"
      />

      <div class="flex items-center gap-8">
        <FormKit
          v-model="price"
          type="range"
          label="Price"
          min="1"
          max="5"
          help="Select your price rating. 1 is cheap and 5 is expensive."
        />
        <span>{{ price }}</span>
      </div>

      <FormKit
        type="url"
        label="Opentable Reservation URL"
        placeholder="http://www.opentable.com/single.aspx?rid=..."
        validation="required|url"
        help="This can be found in your OpenTable account."
      />

      <small>
        After clicking, your submission will be available in the index
        immediately - that's the beauty of Algolia!
      </small>
    </FormKit>

    <div
      v-else
      class="flex w-max flex-col items-center gap-6 rounded-lg bg-white p-10"
    >
      Thanks for your submission. It was successfully added to the index!

      <button
        class="rounded bg-blue p-2.5 text-sm text-white"
        @click="submissionModalStore.toggleModal()"
      >
        Return to finder
      </button>
    </div>
  </div>
</template>

<script>
import algoliasearch from 'algoliasearch'
import { useSubmissionModalStore } from '@/store/SubmissionModal'

export default {
  name: 'SubmissionModal',
  setup() {
    const submissionModalStore = useSubmissionModalStore()

    return {
      submissionModalStore,
    }
  },
  data() {
    return {
      // Algolia client is used in 2 methods, so we declare here to avoid repetition.
      client: algoliasearch('DFY2HEF3K2', 'e87e0e6ab2d84a8d6dcce4e391699038'),
      // Form data:
      name: '',
      foodType: '',
      address: '',
      neighbourhood: '',
      area: '',
      city: '',
      state: '',
      country: 'US',
      paymentOptions: [],
      phone: '',
      postalCode: '',
      price: 1,
      reserveUrl: '',
      // Whether submission is successful
      submissionSuccess: false,
    }
  },
  methods: {
    addRestaurant() {
      // Get index to add object to.
      const index = this.client.initIndex('restaurant-finder_dev')

      index
        .saveObject(
          {
            name: this.name,
            food_type: this.foodType,
            address: this.address,
            neighborhood: this.neighbourhood,
            area: this.area,
            city: this.city,
            state: this.state,
            country: this.country,
            paymentOptions: this.paymentOptions,
            phone: this.phone,
            postal_code: this.postalCode,
            price: this.price,
            reserve_url: this.reserveUrl,
          },
          {
            autoGenerateObjectIDIfNotExist: true,
          }
        )
        .catch((formData, node) => {
          console.log(formData)
          console.log(node)
        })
        .then(() => {
          this.submissionModalStore.isSuccessfulSubmission = true
        })

      // Remember to update the isDeleted data property, so we can change the state of other parts of the card.
      this.isDeleted = false
    },
  },
}
</script>
