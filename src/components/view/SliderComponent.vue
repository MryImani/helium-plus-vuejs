<template>
  <section class="slider" id="myslider">
    <slider-note />
    <slider-indicators @switch="currentSlide($event)"/>
    <slider-inner />
     <a
    href="#"
    class="slider-control-prev"
    role="button"
    data-slide="prev"
    @click="plusSlides(1)"
  >
    <img src="@/assets/images/prev.svg" alt="prev" />
  </a>

  <a
    href="#"
    class="slider-control-next"
    role="button"
    data-slide="next"
    @click="plusSlides(-1)"
  >
    <img src="@/assets/images/next.svg" alt="next" />
  </a>
  </section>
</template>

<script>
import SliderInner from '../view/SliderInner.vue';
import SliderIndicators from '../view/SliderIndicators.vue';
import SliderNote from '../view/SliderNote.vue';

export default {
  data() {
    return {
      slideIndex: 1
    };
  },
  components: {
    SliderInner,
    SliderIndicators,
    SliderNote
  },
  methods: {
    showSlides(n) {
      let i;
      let slides = document.getElementsByClassName('slider__item');
      let dots = document.getElementsByClassName('dot');
      if (n > slides.length) {
        this.slideIndex = 1;
      }
      if (n < 1) {
        this.slideIndex = slides.length;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
      }
      for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(' active', '');
      }
      slides[this.slideIndex - 1].style.display = 'block';
      dots[this.slideIndex - 1].className += ' active';
    },
  plusSlides(n) {
  this.showSlides(this.slideIndex += n);
},
 currentSlide(n) {
  this.showSlides(this.slideIndex = n);
}
  },
  mounted(){
    this.showSlides(this.slideIndex);
  }
};
</script>

<style>
</style>