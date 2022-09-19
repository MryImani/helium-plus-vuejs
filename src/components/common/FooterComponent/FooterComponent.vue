<template>
  <footer class="footer">
    <div class="footer-content">
      <router-link to="/">
        <figure class="logo">
          <img
            src="@/assets/images/Logo-footer.svg"
            alt=""
            class="logo__shape"
          />
        </figure>
      </router-link>
      <p class="footer-content__introduction" v-text="Description"></p>
      <ul class="footer-content__list">
        <li><a href="#" v-text="Links.link1"></a></li>
        <li><a href="#" v-text="Links.link2"></a></li>
        <li><a href="#" v-text="Links.link3"></a></li>
        <li><a href="#" v-text="Links.link4"></a></li>
      </ul>
    </div>
    <img
      src="@/assets/images/footerPat.png"
      alt=""
      class="footer__background"
    />
  </footer>
</template>

<script>
export default {
  data() {
    return {
      Description:
        "هلیوم بستری برای به اشتراک گذاری ایده ها و فکر افراد پشرو در زمینه هلم و دانش است. در هلیوم میتوانید به جدیدترین مقالات علمی در کشور دسترسی داشته باشید و خود نیز در ترویج علم و دانش نقشی داشته باشید.",
      Links: {
        link1: "بنویسید",
        link2: "راهنما",
        link3: "معرفی به دوستان",
        link4: "قوانین",
      },
    };
  },
};
</script>

<style></style>
