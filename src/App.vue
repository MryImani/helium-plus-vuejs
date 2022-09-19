<template>
  <RouterView />
   <Footer />
</template>

<script>
import Footer from '@/components/common/FooterComponent/FooterComponent.vue';
export default {
  name: "App",
  methods: {},
  components: {
      Footer
  },
};
</script>

<style>
 a{ text-decoration: none; }
</style>
