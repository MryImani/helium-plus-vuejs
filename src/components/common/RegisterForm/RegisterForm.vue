<template>
  <form class="form">
    <h3 class="form__title">{{title}}</h3>
    <p class="form__description">{{description}}</p>
    <slot></slot>
  </form>
</template>

<script>

export default {
    props:['title','description'],
    components:{
     
    }
};
</script>

<style>
</style>