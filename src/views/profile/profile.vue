<template>
  <Header>
    <template v-slot:user>
      <figure>
        <img src="../../assets/images/search-icon.svg" class="search" alt="" />
        <img src="../../assets/images/alert-icon.svg" class="alert" alt="" />
        <UserImg :src="src" />
      </figure>
    </template>
  </Header>
  <div class="userProfile-container">
    <div class="user-profile">
      <div class="user">
        <div class="user__content">
          <img :src="authorImg" class="user__img" alt="" />
          <div>
            <p class="user__name">{{ authorName }}</p>
            <img
              src="../../assets/images/user-square.png"
              alt=""
              srcset=""
              class="user__icon"
            />
            <span class="user__username">{{ authorUsername }}</span>
          </div>
        </div>
      </div>
      <button class="contanct" @click="showDetail">اطلاعات کامل ارتباطی</button>
    </div>
    <figure class="userProfile-pattern">
      <img src="@/assets/images/patternheader.png" />
    </figure>
  </div>
  <section class="section__card">
    <div class="title">
      <span class="title-span">مقالات</span>
    </div>
  </section>
  <section class="card-news">
    <div class="card-news-item" v-for="(item, index) in cardnews" :key="index">
      <Cardnews
        :articleId="item.id"
        :authorId="item.author_id"
        :authorimg="authorImg"
        :authorName="authorName"
        :authorDate="item.created_at"
        :img="item.image_url"
        :title="item.title"
        :caption="item.content"
        :time="item.read_time_minutes"
        :tag="item.tags"
      />
    </div>
  </section>
  <div v-if="showModal">
    <Modal :theme="theme" :exit="exit" @close="showDetail">
      <div class="modal__body">
        <img :src="authorImg" alt="" class="modal__img" />
        <div class="modal__content">
          <h1 class="modal__title">{{ authorName }}</h1>
          <p class="modal__description--bold">{{ authorUsername }}</p>
          <p class="modal__description">
            <img
              src="../../assets/images/sms.png"
              alt=""
              srcset=""
              class="modal__icon"
            />{{ authorEmail }}
          </p>
          <p class="modal__description">
            <img
              src="../../assets/images/mobile.png"
              alt=""
              srcset=""
              class="modal__icon"
            />
            ۰۹۱۵۱۲۳۴۵۶۷
          </p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import Header from "../../components/common/HeaderCoponent/HeaderCoponent.vue";
import Modal from "../../components/common/ModalContent/ModalContent.vue";
import UserImg from "../../components/common/UserImg/UserImg.vue";
import Cardnews from "../../components/common/cardNews/cardNews.vue";
import Cardarticle from "../../components/common/cardArticle/cardArticle.vue";
import axios from "axios";
export default {
  data() {
    return {
      theme: "light",
      exit: "بستن",
      showModal: false,
      src: "",
      authorId: this.$route.params.authorId,
      authorImg: this.$route.params.authorImg,
      authorName:
        this.$route.params.authorFirstName +
        " " +
        this.$route.params.authorLastName,
      authorUsername: this.$route.params.authorUsername,
      authorEmail: "",
      cardnews: [],
    };
  },
  components: {
    Header,
    Modal,
    UserImg,
    Cardnews,
    Cardarticle,
  },
  methods: {
    gregorian_to_jalali(gy, gm, gd) {
      var g_d_m, jy, jm, jd, gy2, days;
      g_d_m = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
      gy2 = gm > 2 ? gy + 1 : gy;
      days =
        355666 +
        365 * gy +
        ~~((gy2 + 3) / 4) -
        ~~((gy2 + 99) / 100) +
        ~~((gy2 + 399) / 400) +
        gd +
        g_d_m[gm - 1];
      jy = -1595 + 33 * ~~(days / 12053);
      days %= 12053;
      jy += 4 * ~~(days / 1461);
      days %= 1461;
      if (days > 365) {
        jy += ~~((days - 1) / 365);
        days = (days - 1) % 365;
      }
      if (days < 186) {
        jm = 1 + ~~(days / 31);
        jd = 1 + (days % 31);
      } else {
        jm = 7 + ~~((days - 186) / 30);
        jd = 1 + ((days - 186) % 30);
      }
      let persianMonth = [
        "فروردین",
        "اردیبهشت",
        "خرداد",
        "تیر",
        "مرداد",
        "شهریور",
        "مهر",
        "آبان",
        "آذر",
        "دی",
        "بهمن",
        "اسفند",
      ];
      jm = persianMonth[jm - 1];
      return jd + " " + jm + " " + jy;
    },
    showDetail() {
      this.showModal = !this.showModal;
    },
  },
  mounted() {
    //get author articles
    const url = `http://87.107.30.143:3001/profile?id=${this.authorId}`;
    axios.get(url).then((response) => {
      let regex = /\d{1,4}\.\d{1,4}\.\d{1,4}\.\d{1,4}/;
      this.authorEmail = response.data.email;
      let card = response.data.articles.data;
      //card news
      for (let i = 0; i < card.length; i++) {
        card[i].image_url = card[i].image_url.replace(regex, "87.107.30.143");
        let tags = card[i].tags;
        let temps = [];
        for (let i = 0; i < tags.length; i++) {
          temps.push(tags[i].name);
        }
        tags = temps;
        tags = tags.length > 0 ? tags.join(" , ") : "تکنولوژی";
        card[i].tags = tags;

        let string = card[i].created_at;
        string = string.split("T")[0].split("-");
        string = string.map(Number);
        card[i].created_at = this.gregorian_to_jalali(
          string[0],
          string[1],
          string[2]
        );
      }
      this.cardnews = card;
    });
  },
  created() {
    //get user img src
    axios
      .get("http://87.107.30.143:3001/user", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        let regex = /\d{1,4}\.\d{1,4}\.\d{1,4}\.\d{1,4}/;
        response.data.image_url = response.data.image_url.replace(
          regex,
          "87.107.30.143"
        );
        this.src = response.data.image_url;
      });
  },
};
</script>

<style lang="scss">
@import "./profile.scss";
</style>
