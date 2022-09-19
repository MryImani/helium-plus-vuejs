<template>
   <div class="slider__inner">
      <slider-item id="firstSlide">
           <img src="@/assets/images/slide1.svg" alt="" srcset="" class="slider__img" />
      </slider-item>
      <slider-item >
           <img src="@/assets/images/slide1.svg" alt="" srcset="" class="slider__img" />
      </slider-item>
      <slider-item >
           <img src="@/assets/images/slide1.svg" alt="" srcset="" class="slider__img" />
      </slider-item>
      <slider-item >
           <img src="@/assets/images/slide1.svg" alt="" srcset="" class="slider__img" />
      </slider-item>
      <slider-item >
           <img src="@/assets/images/slide1.svg" alt="" srcset="" class="slider__img" />
      </slider-item>
       
      </div>
</template>

<script>
import SliderItem from '../view/SliderItem.vue'
export default {
  components: { SliderItem },

}
</script>

<style>

</style>