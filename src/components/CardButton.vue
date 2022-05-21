<template>
  <a
    :href="link"
    :target="target"
    :class="additionalClasses"
    class="mt-auto flex w-1/2 cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm text-white"
  >
    {{ text }}

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
      default: '_blank',
    },
    additionalClasses: {
      type: String,
    },
  },
}
</script>

<style scoped></style>
