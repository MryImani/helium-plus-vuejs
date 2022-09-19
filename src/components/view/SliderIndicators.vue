<template>
   <ol class="slider__indicators">
        <li class="dot" data-slide-to="0" data-target="#myslider" @click="$emit('switch', 1)"></li>
        <li data-slide-to="1" data-target="#myslider" class="dot" @click="$emit('switch', 2)"></li>
        <li data-slide-to="2" data-target="#myslider" class="dot active" @click="$emit('switch', 3)"></li>
        <li data-slide-to="3" data-target="#myslider" class="dot" @click="$emit('switch', 4)"></li>
        <li data-slide-to="4" data-target="#myslider" class="dot" @click="$emit('switch', 5)"></li>
      </ol>
</template>

<script>
export default {
emits:['switch']
}
</script>

<style>

</style>