<template>
  <!-- This modal is a popup form that uses FormKit (https://formkit.com/) to handle submissions to the index. -->
  <!-- I only display the form if the state is in 'visible' mode. This is handled using a Boolean in the Pinia Store. -->
  <div
    v-show="submissionModalStore.isModalVisible"
    class="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black/60 p-4"
  >
    <!-- I don't want to show the form once the user has made a successful submission, so I use another state to track the submission status. -->
    <!-- On form submission, I check for validation errors and then add the restaurant to the index using the data in the form. -->
    <FormKit
      v-if="!submissionModalStore.isSuccessfulSubmission"
      :config="{
        classes: {
          form: '$reset relative flex w-[600px] overflow-scroll max-h-full flex-col gap-3 rounded-lg bg-white p-10',
        },
      }"
      type="form"
      submit-label="Add my restaurant!"
      @submit="addRestaurant()"
    >
      <!-- I also included a close button here in case the user wants to leave the modal. -->
      <button
        class="absolute top-4 right-4 underline"
        @click="submissionModalStore.toggleModal()"
      >
        Close
      </button>

      <!-- The following inputs are where the user enters the form data. -->
      <!-- There are various validation rules on each input, to ensure the index has consistent data. -->
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
        class="grid gap-x-6 gap-y-3 rounded border border-grey p-4 lg:grid-cols-2"
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
          label="Area*"
          name="area"
          validation="required|alpha-spaces"
        />

        <FormKit
          type="text"
          v-model="city"
          label="City*"
          name="city"
          validation="required|alpha-spaces"
        />

        <!--
          There's no 'easy' way of doing this that I know of. There is no need for this data to be reactive
          (it's not changing any time soon!). So I hard-coded the values.
        -->
        <FormKit
          type="select"
          v-model="state"
          label="State*"
          name="state"
          validation="required"
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

        <!-- Seeing as all 5000 records were inside the US, I decided that this finder would only allow submissions from "US' restaurants. -->
        <!-- Sorry to us Europeans! -->
        <!-- I kept validation here, just in case the user manually enables the input again. -->
        <FormKit
          type="text"
          disabled=""
          v-model="country"
          label="Country*"
          name="country"
          validation="required|is:US"
          help="We only accept submissions from restaurants in the United States."
          :validation-messages="{
            is: 'Sorry, we only accept submissions from restaurants in the US.',
          }"
        />
      </div>

      <!-- There are actually two formats on phone number in the index. However, this is the one I use on the frontend. -->
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
        <!-- I thought a slider would be good here to illustrate that this can be a range from 1-5 -->
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

    <!-- This displays once the submission promise returns successfully. -->
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

// I need to get the Pinia store data and methods.
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

      // Here we save a single object/record to the index using the JS API function.
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
            // I don't allow the user to enter an ID on the frontend. Instead, I allow Algolia to automatically generate one.
            autoGenerateObjectIDIfNotExist: true,
          }
        )
        .then(() => {
          // If the promise resolves, then I can change the successful submission boolean - which then shows the success message.
          this.submissionModalStore.isSuccessfulSubmission = true
        })

      // Remember to update the isDeleted data property, so we can change the state of other parts of the card.
      this.isDeleted = false
    },
  },
}
</script>
