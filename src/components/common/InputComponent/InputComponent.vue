<template>
  <input class="form__content__item__input" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue']
}
</script>

<style>

</style>