<template>
<div class="register-done">
     <Header></Header>
     <main class="content">
        <section class="register">
           <div class="register__done">           
                <div class="register__done__content">
                    <img src="../../assets/images/registerApproveImg.svg" alt="registerApproveImg">
                    <p class="register__done__content-description" >ثبت نام شما با موفقیت انجام شد.</p>
                </div>
                <div class="register__done__footer">
                    <button class="register__done__footer-button" @click="goToSite">ورود به سایت</button>
                </div>
            </div>
        </section>
    </main>
</div>
</template>

<script>
import Header from "@/components/common/HeaderCoponent/HeaderCoponent.vue";
export default {
  components: {
    Header,},
    methods:{
      goToSite(){
        this.$router.push('/login');
      }  
    }
};
</script>

<style lang="scss">
@import "./RegisterDone.scss";
</style>
