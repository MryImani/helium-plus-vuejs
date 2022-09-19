<template>
  <div class="register-step1">
    <Header></Header>
    <main class="content">
      <section class="register">
        <RegisterForm :title="formTitle" :description="formDescription" @submit.prevent="submitHandle">
          <div class="form__content">
            <form-content-item>
            <labelForInput for="inp__phone" :text="labelText"></labelForInput>
            <input-component type="text" name="" id="inp__phone" v-model="phoneNumber" placeholder="۰۹۱۵۱۲۳۴۵۶۷" pattern="[0-9]{11}" required @focus="focuseInp($event)" ></input-component>
            <span class="form__content__item__span">مثال:</span>
            </form-content-item>
          </div>
          <div class="form__footer">
            <FormButton :text="buttonText"  ></FormButton>
          </div>
        </RegisterForm>
      </section>
    </main>
  </div>
</template>

<script>
import Header from '@/components/common/HeaderCoponent/HeaderCoponent.vue';
import RegisterForm from '@/components/common/RegisterForm/RegisterForm.vue';
import FormContentItem from '@/components/common/FormContentItem/FormContentItem.vue';
import FormButton from '@/components/common/FormButton/FormButton.vue';
import labelForInput from '@/components/common/LabelForInput/LabelForInput.vue'
import InputComponent from '@/components/common/InputComponent/InputComponent.vue'
import axios from 'axios'
export default {
  name: 'register-step1',
  data(){
    return{
        labelText :'لطفا شماره تلفن همراه خود را وارد کنید',
        buttonText : 'ادامه',
        formTitle : 'ورود / ثبت نام',
        phoneNumber : ''
    
    }
  },
  components: {
    Header,
    RegisterForm,
    FormContentItem,
    FormButton,
    labelForInput,
    InputComponent
  },
  methods:{
    focuseInp(event) {
      var val = event.value;
      if (val != "")
        document.querySelector(".form__content__item__span").style.opacity ="0";
      else 
          document.querySelector(".form__content__item__span").style.opacity ="1";
    },
   async submitHandle(){
     const response = await axios.post('http://87.107.30.143:3001/auth/user-exist',{
            phone_number : this.phoneNumber
        });
        if(response.data.isUserExist && response.status == 200)
        {
          localStorage.setItem('token',this.phoneNumber);
           this.$router.push({name : 'LoginPanel',params :{phone: this.phoneNumber}});
        }
        else
        {
          this.$router.push({name : 'Register2',params :{phone: this.phoneNumber}});
        }
       
    }
  }
};
</script>

<style lang="scss">
@import "./Register1.scss";
</style>
