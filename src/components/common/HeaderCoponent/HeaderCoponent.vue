<template>
  <header class="header">
    <slot>
      <figure class="header__logo">
        <router-link to="/" v-bind:href="logoHref">
          <img src="@/assets/images/Logo_header.svg" alt="logo" />
        </router-link>
      </figure>
    </slot>
    <slot name="login"> </slot>
    <slot name="user"> </slot>
  </header>
</template>

<script>
export default {};
</script>

<style scoped>
.header__logo {
  cursor: pointer;
}
</style>
