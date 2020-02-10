<template>
   <div id="app" class="app">
      <HomeView />
   </div>
</template>

<style lang="scss">
@import '@/assets/scss/App.scss';
</style>

<script>
export default {
   name: 'App',
   components: {
      HomeView: () => import('./views/HomeView'),
   },
};
</script>
