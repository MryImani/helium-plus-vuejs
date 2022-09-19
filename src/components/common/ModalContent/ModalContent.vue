<template>
  <div class="backdrop">
    <div class="modal" :class="{  light : theme === 'light' , tag : tag === 'tag'}">
      <span class="modal__close" @click="closeModal">{{exit}}</span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["header", "description", "content", "theme","exit" ,"tag"],
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.backdrop {
  background-color:  rgba(0, 32, 50, 0.3);
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2000;
}
.modal {
  font-family: "Kalame_SemiBold";
  font-weight: 400;
  font-size: 14px;
  margin: 100px auto;
  padding: 10px;
  width: 586px;
  height: 60px;
  background-color:#E54839;
  box-shadow: 0px 10px 20px rgba(204, 36, 20, 0.3);
  border-radius: 8px;
  position: relative;
  color: #fff;
  display: flex;
  align-items: center;
}

.modal span {
  position: absolute;
  left: 12px;
  cursor: pointer;
}

 .modal.light{
            background-color: #FFFFFF;
            box-shadow: 0px 4px 10px rgba(40, 57, 79, 0.1);
          border-radius: 12px;
          width: 450px;
          height: 306px;
          margin: 133px auto 687px;
          
}
.modal.tag{
 display: inherit;
 height: 274px;         
}
</style>

