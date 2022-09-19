<template>
  <div class="backgroundmodule" v-show="open">
    <div class="backgroundmodule2">
      <div class="modul">
        <slot />
        <div class="modul__btn">
          <button class="modul__btn-send" @click="$emit('close')">تایید</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {},
  props: {
    open: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "./popup.scss";
</style>
