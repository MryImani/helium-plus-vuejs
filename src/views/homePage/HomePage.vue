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
  <section class="card-news">
    <div class="card-news-item" v-for="(item, index) in cardnews" :key="index">
      <Cardnews
        :articleId="item.id"
        :authorId="item.author_id"
        :authorUsername="item.author_username"
        :authorFirstName="item.author_first_name"
        :authorLastName="item.author_last_name"
        :authorimg="item.auther_profile_image"
        :authorName="item.author_first_name + ' ' + item.author_last_name"
        :authorDate="item.created_at"
        :img="item.image_url"
        :title="item.title"
        :caption="item.content"
        :time="item.read_time_minutes"
        :tag="item.tags"
      />
    </div>
  </section>
  <section class="card-article">
    <div v-for="(item, index) in cardArticles" :key="index">
      <Cardarticle
        :articleId="item.id"
        :authorId="item.author_id"
        :authorUsername="item.author_username"
        :authorFirstName="item.author_first_name"
        :authorLastName="item.author_last_name"
        :authorimg="item.auther_profile_image"
        :authorName="item.author_first_name + ' ' + item.author_last_name"
        :authorDate="item.created_at"
        :img="item.image_url"
        :title="item.title"
        :caption="item.content"
        :time="item.read_time_minutes"
        :tag="item.tags"
      />
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Header from "../../components/common/HeaderCoponent/HeaderCoponent.vue";
import UserImg from "../../components/common/UserImg/UserImg.vue";
import Cardnews from "../../components/common/cardNews/cardNews.vue";
import Cardarticle from "../../components/common/cardArticle/cardArticle.vue";
export default {
  data() {
    return {
      src: "",
      cardnews: [],
      cardArticles: [],
    };
  },
  components: {
    Header,
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
        "??????????????",
        "????????????????",
        "??????????",
        "??????",
        "??????????",
        "????????????",
        "??????",
        "????????",
        "??????",
        "????",
        "????????",
        "??????????",
      ];
      jm = persianMonth[jm - 1];
      return jd + " " + jm + " " + jy;
    },
  },
  mounted() {
    //get article
    axios.get("http://87.107.30.143:3001/articles").then((response) => {
      let regex = /\d{1,4}\.\d{1,4}\.\d{1,4}\.\d{1,4}/;
      let temp = response.data.data;
      temp = temp.slice(temp.length);
      for (let i = 0; i < temp.length; i++) {
        temp[i].image_url = temp[i].image_url.replace(regex, "87.107.30.143");
        temp[i].auther_profile_image = temp[i].auther_profile_image.replace(
          regex,
          "87.107.30.143"
        );
        let tags = temp[i].tags;
        let temps = [];
        for (let i = 0; i < tags.length; i++) {
          temps.push(tags[i].name);
        }
        tags = temps;
        tags = tags.length > 0 ? tags.join(" , ") : "????????????????";
        temp[i].tags = tags;

        let string = temp[i].created_at;
        string = string.split("T")[0].split("-");
        string = string.map(Number);
        temp[i].created_at = this.gregorian_to_jalali(
          string[0],
          string[1],
          string[2]
        );
      }
      this.cardnews = temp;
      this.cardArticles = temp;
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
@import "./home.scss";
</style>
