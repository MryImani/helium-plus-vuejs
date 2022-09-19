<template>
  <div class="login-panel">
    <Header></Header>
    <main class="content">
      <section class="register">
        <RegisterForm
          :title="formTitle"
          :description="formDescription"
          @submit.prevent="submitHandle"
        >
          <div class="form__content">
            <form-content-item>
              <labelForInput for="inp__password" :text="labelText"></labelForInput>
              <input-component
                type="password"
                name=""
                id="inp__password"
                v-model="password"
                placeholder="رمز عبور خود را وارد کنید"
                required
              ></input-component>
            </form-content-item>
          </div>
          <div class="form__footer">
            <FormButton :text="buttonText"></FormButton>
          </div>
        </RegisterForm>
      </section>
      <template v-if="showModal">
        <Modal @close="submitHandle" :exit="exit">
          <img class="modal__img" src="../../assets/images/Frame1188.svg" alt="" srcset="">  
          <p>
            در حال حاضر ارتباط با سرور قطع می‌باشد. لطفا بعدا مجدد تلاش کنید.
          </p>
        </Modal>
      </template>
    </main>
  </div>
</template>

<script>
import Header from "@/components/common/HeaderCoponent/HeaderCoponent.vue";
import RegisterForm from "@/components/common/RegisterForm/RegisterForm.vue";
import FormContentItem from "@/components/common/FormContentItem/FormContentItem.vue";
import FormButton from "@/components/common/FormButton/FormButton.vue";
import labelForInput from "@/components/common/LabelForInput/LabelForInput.vue";
import InputComponent from "@/components/common/InputComponent/InputComponent.vue";
import Modal from "@/components/common/ModalContent/ModalContent.vue";
import axios from "axios";
export default {
  name: "register-step1",
  data() {
    return {
      labelText: "رمز عبور",
      buttonText: "ورود",
      formTitle: "ورود",
      password: "",
      showModal: false,
      phone : this.$route.params.phone,
      exit : 'X'
    };
  },
  components: {
    Header,
    RegisterForm,
    FormContentItem,
    FormButton,
    labelForInput,
    InputComponent,
    Modal
  },
  methods:{
   async submitHandle(){
     await axios.post('http://87.107.30.143:3001/auth/login',{
            password : this.password,
            phone_number : this.phone
        })
        .then((response) => {
          if(response.data.accessToken && response.status == 200)
        {
          localStorage.setItem('token', response.data.accessToken);
          this.$router.push('/home-page');
        }
        else if(response.message === 'نام کاربری یا رمز عبور اشتباه است')
        {
          this.showModal =!this.showModal
        }
        })
        .catch((err) => {
          console.log(err.message);
          this.showModal =!this.showModal
        })  
       
    }
  }
};
</script>

<style lang="scss">
@import "./Login.scss";
.modal .modal__img{
  position: absolute;
    top: 25px;
}
.modal p{
  margin-right: 46px;
}
</style>