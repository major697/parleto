<template>
   <button class="filters" @click="$emit('selectFilter', section)">
      {{ section }}
   </button>
</template>

<style lang="scss" scoped>
@import '@/assets/scss/components/Filters/FlterButton.scss';
</style>

<script>
import { mapGetters } from 'vuex';
import { GettersWorkers } from '@/store/modules/Workers/types';

export default {
   name: 'FlterButtonComponent',
   props: {
      section: {
         type: String,
         required: true,
      },
   },
};
</script>
