<template>
  <li>
    <router-link
      :to="to"
      class="decoration-blue decoration-2 underline-offset-4 transition-all hover:underline"
    >
      {{ text }}
    </router-link>
  </li>
</template>

<script>
export default {
  name: 'NavigationItem',
  props: {
    to: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
}
</script>
