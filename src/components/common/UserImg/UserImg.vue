<template>
  <img :src="src" class="profile" alt="" />
</template>

<script>
export default {
  props: ["src"],
};
</script>

<style scoped>
img {
  border-radius: 50%;
}
</style>
