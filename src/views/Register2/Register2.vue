<template>
  <div class="register-step2">
    <Header></Header>
    <main class="content">
      <section class="register">
        <RegisterForm
          :title="formTitle"
          :description="formDescription"
          @submit.prevent="submitHandle()"
        >
          <div class="form__content">
            <form-content-item>
              <labelForInput
                for="inp__phone"
                text="شماره تلفن همراه شما"
              ></labelForInput>
              <input-component
                type="text"
                name=""
                id="inp__phone"
                v-model="phone"
                disabled
              ></input-component>
            </form-content-item>
            <form-content-item>
              <labelForInput for="inp__name" text="نام و نام خانوادگی"
                ><span>*</span></labelForInput
              >
              <input-component
                type="text"
                name=""
                id="inp__name"
                pattern="^[\sآابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$"
                required
                placeholder="نام خود را به فارسی وارد کنید"
                v-model="name"
              ></input-component>
            </form-content-item>
            <form-content-item>
              <labelForInput for="inp__email" text="پست الکترونیکی"
                ><span>*</span></labelForInput
              >
              <input-component
                type="email"
                name=""
                id="inp__email"
                placeholder="example@helium.com"
                pattern="^\w+(\.\w+)*@(\w+\.)+\w{2,4}$"
                required
                v-model="email"
              ></input-component>
              <span class="form__content__item__span">مثال:</span>
            </form-content-item>
          </div>
          <div class="form__footer">
            <FormButton :text="buttonText"></FormButton>
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
name:'register-step2',
  data(){
    return{
        labelText :'',
        buttonText : 'ادامه',
        formTitle : 'شما هنوز در هلیوم ثبت نام نکرده اید.',
        formDescription : 'لطفا اطلاعات زیر را برای ثبت نام تکمیل کنید.',
        phone : this.$route.params.phone,
        name :'',
        email : '',

    
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
    submitHandle(){
      this.$router.push({name : 'Register3',params :{phone: this.phone, name : this.name, email:this.email}});
    }
  }
}
</script>

<style lang="scss">
@import "./Register2.scss";
</style>
