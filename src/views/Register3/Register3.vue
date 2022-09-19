<template>
  <div class="register-step3">
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
              <labelForInput for="inp__username" text="نام کاربری"
                ><span>*</span></labelForInput
              >
              <input-component
                type="text"
                name=""
                id="inp__username"
                required
                placeholder="نام کاربری دلخواه خود را به انگلیسی وارد کنید"
                v-model="userName"
              ></input-component>
            </form-content-item>
            <form-content-item>
              <labelForInput for="inp__password" text="رمز عبور"
                ><span>*</span></labelForInput
              >
              <input-component
                type="password"
                name=""
                id="inp__password"
                placeholder="رمز عبور دلخواه خود را وارد کنید"
                required
                v-model="password"
              ></input-component>
            </form-content-item>
            <form-content-item>
              <labelForInput for="inp__returnPassword" text="تکرار رمز عبور"
                ><span>*</span></labelForInput
              >
              <input-component
                type="password"
                name=""
                id="inp__returnPassword"
                placeholder="رمز عبور  خود را مجدد وارد کنید"
                @change="checkpassword()"
                required
                v-model="returnPassword"
              ></input-component>
              <div v-if="passwordError">
                <span id="inp__returnPassword--error" class="errorMessage">{{
                  passwordError
                }}</span>
              </div>
            </form-content-item>
            <form-content-item>
              <labelForInput
                for="inp__file"
                text="انتخاب تصویر پروفایل"
              ></labelForInput>
              <div class="form__content__item__file" id="inp__file">
                <img
                  id="uploadPreview"
                  src="../../assets/images/DefaultAvatar.png"
                  alt="DefaultAvatar"
                  srcset=""
                />
                <labelForInput
                  for="inp__picture"
                  text="بارگذاری تصویر"
                ></labelForInput>
                <input-component
                  type="file"
                  name=""
                  id="inp__picture"
                  @change="PreviewImage()"
                  placeholder=""
                  accept="image/*"
                  v-model="picture"
                ></input-component>
              </div>
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
import Header from "@/components/common/HeaderCoponent/HeaderCoponent.vue";
import RegisterForm from "@/components/common/RegisterForm/RegisterForm.vue";
import FormContentItem from "@/components/common/FormContentItem/FormContentItem.vue";
import FormButton from "@/components/common/FormButton/FormButton.vue";
import labelForInput from "@/components/common/LabelForInput/LabelForInput.vue";
import InputComponent from "@/components/common/InputComponent/InputComponent.vue";
import axios from "axios";
export default {
  name: "register-step2",
  data() {
    return {
      labelText: "",
      buttonText: "ادامه",
      formTitle: "شما هنوز در هلیوم ثبت نام نکرده اید.",
      formDescription: "لطفا اطلاعات زیر را برای ثبت نام تکمیل کنید.",
      phone: this.$route.params.phone,
      name: this.$route.params.name,
      email: this.$route.params.email,
      userName: "",
      password: "",
      returnPassword: "",
      picture: "",
      passwordError: "",
    };
  },
  components: {
    Header,
    RegisterForm,
    FormContentItem,
    FormButton,
    labelForInput,
    InputComponent,
  },
  methods: {
    checkpassword() {
      this.passwordError =
        this.returnPassword !== this.password
          ? "تکرار رمز عبور مطابقت ندارد"
          : "";
    },
    checkpassword() {
      console.log(this.passwordError);
    },
    //preview image after select
    PreviewImage() {
      var oFReader = new FileReader();
      oFReader.readAsDataURL(document.getElementById("inp__picture").files[0]);

      oFReader.onload = function (oFREvent) {
        document.getElementById("uploadPreview").src = oFREvent.target.result;
      };
    },
    async submitHandle() {
      var formData = new FormData();
      var imagefile = document.getElementById("inp__picture");
      const userInfo = this.name.split(" ");
      formData.append("image", imagefile.files[0]);
      formData.append("username", this.userName);
      formData.append("first_name", userInfo[0]);
      formData.append("last_name", userInfo.slice(1).join(" "));
      formData.append("email", this.email);
      formData.append("phone_number", this.phone);
      formData.append("password",this.password);
   
      //validate input password
      this.passwordError =
        this.returnPassword !== this.password
          ? "تکرار رمز عبور مطابقت ندارد"
          : "";
      this.passwordError =
        this.returnPassword === this.password && this.returnPassword.length >= 6
          ? ""
          : "رمز عبور حداقل باید ۶ کاراکتر باشد.";
      if (this.passwordError != "") return false;
      const response = await axios.post(
        "http://87.107.30.143:3001/auth/signup",formData,{
          headers: {
            "Content-Type": "multipart/form-data",
          }}
      );
    
     if(response.status == 201 && response.statusText=="Created")
       this.$router.push({name:'ResterDone' , params :{phone : this.phone}});
    },
  },
};


</script>

<style lang="scss">
@import "./Register3.scss";
</style>
