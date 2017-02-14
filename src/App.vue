<template>
  <div id="app">
    <header></header>
    <div class="tab">
      I am tab!
    </div>
    <div class="content">
      I am content!
    </div>
  </div>
</template>

<script>
  import header from './components/header/header.vue';

  export default {
      components: {
          header
      }
  };
</script>

<style>
</style>
