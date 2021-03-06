<template>
  <!-- This is the card component. There is one for each restaurant (or 'item') in the page -->
  <!-- If the item has been deleted from the index by the user, an alternative card will display to explain this -->
  <li
    v-if="!isDeleted"
    class="relative flex flex-col overflow-hidden rounded border border-grey shadow transition-shadow hover:shadow-lg lg:min-h-[345px]"
    data-aos="fade-up"
    :data-aos-delay="animationDelay"
  >
    <!-- Uses the rounded start count from the index to display a simple star rating -->
    <div
      v-show="item.rounded_stars_count"
      class="absolute top-0 left-0 flex items-center gap-1 rounded-br-lg bg-white px-2 py-1"
    >
      {{ item.rounded_stars_count }}

      <img
        src="@/assets/img/icons/star--gold.svg"
        width="20"
        height="20"
        alt=""
      />
    </div>

    <!-- The user has the option to delete the item from the index. This is a very rare case scenario in real life! -->
    <div
      class="absolute top-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-bl-lg bg-red"
      @click="deleteObject()"
    >
      <img
        src="@/assets/img/icons/bin--white.svg"
        width="20"
        height="20"
        alt="Delete item"
      />
    </div>

    <!-- Imagery is important, especially for restaurants! -->
    <img
      v-if="item.image_url"
      :src="item.image_url"
      class="aspect-video w-full object-cover"
      alt=""
    />

    <div
      class="flex grow flex-col gap-1 p-4 text-sm"
      :class="{ 'pt-10': !item.image_url }"
    >
      <h2 class="text-base font-semibold">
        {{ item.name }}
      </h2>

      <!-- The address is a computed value that combines address, city and postcode information. See more below. -->
      <p>
        {{ fullAddress }}
      </p>

      <p>
        <span class="font-semibold">Price: </span>

        <span v-for="index in item.price" :key="index"> $ </span>
      </p>

      <!-- The payment options are a computed value that combines all available payment options from the array. -->
      <p class="mb-3" v-if="getPaymentOptions">
        <span class="font-semibold">Accepts: </span>

        <span>
          {{ getPaymentOptions }}
        </span>
      </p>
    </div>

    <div class="mt-auto flex">
      <!-- I created a custom button component for the conversion actions to avoid repetition. -->
      <CardButton
        class="flex"
        text="Call"
        :link="'tel:' + item.phone"
        additional-classes="bg-blue-light"
        @click="sendEvent('conversion', item, 'Restaurant Called')"
      />

      <!-- There is a mobile reservation URL in the index, however the link doesn't go anywhere. I believe this is because opentable now doesn't have a specific mobile subdomain. -->
      <!-- Therefore I have not rendered this URL -->
      <CardButton
        class="flex"
        text="Reserve"
        :link="item.reserve_url"
        additional-classes="bg-blue"
        @click="sendEvent('conversion', item, 'Restaurant Reserved')"
      />
    </div>
  </li>

  <!-- This is the alternative state that shows if an item has been deleted. This helps the user understand the action. -->
  <li
    v-else
    class="relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded border border-grey shadow transition-shadow"
  >
    Item Deleted

    <!-- They also have the option to undo their action. As we still have access to the 'item' object, we can simply pass the data back to the addObject API method. -->
    <button class="cursor-pointer underline" @click="addObject()">Undo</button>
  </li>

  <!-- We also display an alert box when an item is deleted. This also helps the user understand the action. -->
  <AlertBox
    v-if="isDeleted"
    heading="Item deleted"
    :paragraph="`${item.name} was successfully deleted from the index. Please note this may
      take a few moments to reflect on the application.`"
    buttonText="Ok, thanks!"
  />
</template>

<script>
// Import our custom components.
import CardButton from '@/components/CardButton'
import AlertBox from '@/components/AlertBox'

// Import AOS library https://www.npmjs.com/package/aos
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import Pinia Store
import { useAlgoliaClientStore } from '@/store/AlgoliaClient'

// Import Axios for API requests.
import { default as axios } from 'axios'

export default {
  name: 'GridCard',
  components: { AlertBox, CardButton },
  props: {
    item: {
      type: Object,
      required: true,
    },
    // We use this index to determine the animation on scroll delay for this card.
    index: {
      type: Number,
      required: true,
    },
    // I use this to send click/conversion events to Algolia
    sendEvent: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const algoliaClientStore = useAlgoliaClientStore()

    return {
      algoliaClientStore,
    }
  },
  data() {
    return {
      // Items should not be in the 'deleted' state as default.
      isDeleted: false,
    }
  },
  mounted() {
    // Initialise Animate On Scroll
    AOS.init()
  },
  methods: {
    deleteObject(objectID = this.item.objectID) {
      if (
        // As this is an important action, we ask the user for confirmation.
        // It would also be possible to use a JavaScript promise here, with a custom confirmation modal.
        // However, I chose the confirmation box method instead - for a built-in alert box.
        confirm(
          `Are you sure you want to delete ${this.item.name} from the index?`
        )
      ) {
        axios
          .post('/api/DeleteObject', {
            objectID,
          })
          .then(() => {
            this.isDeleted = true
          })
          // I like to output console errors for reference. If I had more time, I could add some kind of warning alert for when there is an error instead.
          .catch((error) => {
            console.error(error)
          })
      }
    },
    addObject(object = this.item) {
      axios
        .post('/api/AddObject', {
          object,
        })
        .then(() => {
          this.isDeleted = false
        })
        // I like to output console errors for reference. If I had more time, I could add some kind of warning alert for when there is an error instead.
        .catch((error) => {
          console.error(error)
        })
    },
  },
  computed: {
    // Computed property here to avoid doing complex logic in the template.
    // I cannot use an arrow function here, as 'this' would lose context.
    fullAddress() {
      return `${this.item.address}, ${this.item.area}, ${this.item.postal_code}`
    },
    animationDelay() {
      // Animations are calculated in milliseconds. So we multiply by 50ms. E.g. 50, 100, 150.
      // I cannot use an arrow function here, as 'this' would lose context.
      return this.index * 50
    },
    getPaymentOptions() {
      // I use this computed value to make the string of payment options for each item.
      let optionsString = ''
      let options = this.item.payment_options ?? []

      if (options) {
        options.forEach((option, key, options) => {
          optionsString += key < options.length - 1 ? `${option}, ` : option
        })
      }

      return optionsString
    },
  },
}
</script>
