<template>
  <!-- Simple button for cards. Support text, URL, icon and window target attribute. -->
  <a
    :href="link"
    :target="target"
    :class="additionalClasses"
    class="mt-auto flex w-1/2 cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-white"
  >
    {{ text }}

    <!-- Alternative text not required, as icons is described by the adjacent text-->
    <img :src="iconUrl" width="25" height="25" alt="" />
  </a>
</template>

<script>
export default {
  name: 'CardButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String,
    },
    target: {
      type: String,
      // Defaults to new window, as all card buttons are external 'conversion' links.
      default: '_blank',
    },
    additionalClasses: {
      type: String,
    },
  },
}
</script>
