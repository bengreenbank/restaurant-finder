<template>
  <!--  Simple alert box component with text. Runs 'close' method on button click. -->
  <div
    v-if="show"
    class="fixed bottom-4 left-4 z-50 flex max-w-md flex-col items-start gap-4 rounded-lg border border-grey bg-white p-6 shadow-xl"
    data-aos="fade-up"
  >
    <h1 class="text-xl font-semibold text-blue">{{ heading }}</h1>

    <p>{{ paragraph }}</p>

    <button
      class="flex cursor-pointer items-center justify-center rounded bg-blue px-3 py-1 text-white"
      @click="closeAlert()"
    >
      {{ buttonText }}
    </button>
  </div>
</template>

<script>
// Import AOS library https://www.npmjs.com/package/aos
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'AlertBox',
  props: {
    heading: {
      type: String,
      required: true,
    },
    paragraph: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: 'Ok!',
    },
  },
  data() {
    return {
      // Whether to show the alert banner.
      show: {
        type: Boolean,
        // Starts at false to avoid showing every banner in the app on load.
        default: false,
      },
    }
  },
  mounted() {
    // Initialise Animate On Scroll
    AOS.init()
  },
  methods: {
    // Close the banner by amending the data property.
    closeAlert() {
      this.show = false
    },
  },
}
</script>
