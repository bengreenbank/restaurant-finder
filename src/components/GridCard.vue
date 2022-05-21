<template>
  <li
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
        icon-url="../../assets/img/icons/book-online--white.svg"
        additional-classes="bg-blue-light"
      />

      <CardButton
        text="Call"
        :link="item.reserve_url"
        icon-url="../../assets/img/icons/call--white.svg"
        additional-classes="bg-blue"
      />
    </div>
  </li>
</template>

<script>
import CardButton from '@/components/CardButton'

// Import AOS library https://www.npmjs.com/package/aos
import AOS from 'aos'
import 'aos/dist/aos.css'

export default {
  name: 'GridCard',
  components: { CardButton },
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
  mounted() {
    // Initialise Animate On Scroll
    AOS.init()
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

<style scoped></style>
