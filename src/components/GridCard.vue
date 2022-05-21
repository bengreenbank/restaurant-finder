<template>
  <li
    v-if="!isDeleted"
    class="relative flex flex-col overflow-hidden rounded border border-grey shadow transition-shadow hover:shadow-lg"
    data-aos="fade-up"
    :data-aos-delay="animationDelay"
  >
    <div
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

    <div
      class="absolute top-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-bl-lg bg-red"
      @click="deleteObject(item.objectID)"
    >
      <img
        src="@/assets/img/icons/bin--white.svg"
        width="20"
        height="20"
        alt="Delete item"
      />
    </div>

    <img :src="item.image_url" class="h-44 w-full object-cover" alt="" />

    <div class="flex grow flex-col p-4">
      <h2 class="mb-1 font-semibold">
        {{ item.name }}
      </h2>

      <p class="mb-3">
        {{ fullAddress }}
      </p>
    </div>

    <div class="mt-auto flex">
      <CardButton
        text="Book"
        :link="'tel:' + item.phone"
        additional-classes="bg-blue-light"
      />

      <CardButton
        text="Call"
        :link="item.reserve_url"
        additional-classes="bg-blue"
      />
    </div>
  </li>

  <AlertBox
    v-if="isDeleted"
    heading="Item deleted"
    :paragraph="`${item.name} was successfully deleted from the index. Please note this may
      take a few moments to reflect on the application.`"
    buttonText="Ok, thanks!"
  />
</template>

<script>
import CardButton from '@/components/CardButton'
import AlertBox from '@/components/AlertBox'

// Import AOS library https://www.npmjs.com/package/aos
import AOS from 'aos'
import 'aos/dist/aos.css'

// Import Algolia JS API
const algoliasearch = require('algoliasearch')

export default {
  name: 'GridCard',
  components: { AlertBox, CardButton },
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isDeleted: false,
    }
  },
  mounted() {
    // Initialise Animate On Scroll
    AOS.init()
  },
  methods: {
    deleteObject(objectID) {
      if (confirm('Are you sure you want to delete this item?')) {
        // Connect and authenticate with Algolia app
        const client = algoliasearch(
          'DFY2HEF3K2',
          'e87e0e6ab2d84a8d6dcce4e391699038'
        )

        // Get index to delete object from
        const index = client.initIndex('restaurant-finder_dev')

        // Delete object from index.
        index.deleteObject(objectID).then(() => {
          this.isDeleted = true
        })
      }
    },
  },
  computed: {
    fullAddress() {
      return `${this.item.address}, ${this.item.area}, ${this.item.postal_code}`
    },
    animationDelay() {
      return this.index * 50
    },
  },
}
</script>
