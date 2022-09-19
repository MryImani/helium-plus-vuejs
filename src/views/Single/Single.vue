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
  <main class="content">
    <section class="post">
      <router-link
        :to="{
          name: 'profile',
          params: {
            authorId: this.author_id,
            authorFirstName: this.author_first_name,
            authorLastName: this.author_last_name,
            authorUsername: this.authorUsername,
            authorImg: this.authorimg,
          },
        }"
      >
        <div class="author">
          <figure class="author__img">
            <img :src="authorimg" alt="" />
          </figure>
          <div class="author__info">
            <span class="author__info-name">{{ authorname }}</span>
            <span class="author__info-date"> {{ time }}</span>
          </div>
        </div>
      </router-link>
      <div class="post__title">
        {{ title }}
      </div>
      <div class="post__details">
        <span class="post__details-time"> {{ timetoread }} دقیقه مطالعه </span>
        <span class="post__details-tag">{{ tag }}</span>
      </div>
      <figure class="post__img">
        <img :src="image1" class="post__img-one" alt="" />
      </figure>

      <p class="post__content">{{ content }}</p>
      <p class="text-bold">{{ boldcontent }}</p>
      <p class="post__content">{{ content }}</p>
      <figure class="post__img">
        <img :src="image2" class="post__img-two" alt="" />
      </figure>

      <p class="post__content">{{ content }}</p>
    </section>

    <section class="section__card">
      <div class="title">
        <span class="title-span">از همین نویسنده</span>
      </div>
    </section>

    <section class="card-news">
      <div
        class="card-news-item"
        v-for="(item, index) in articles"
        :key="index"
      >
        <Cardnews
          :articleId="articleId"
          :authorId="item.author_id"
          :authorUsername="authorUsername"
          :authorFirstName="author_first_name"
          :authorLastName="author_last_name"
          :authorimg="authorimg"
          :authorName="authorname"
          :authorDate="item.created_at"
          :img="item.image_url"
          :title="item.title"
          :caption="item.title"
          :time="item.read_time_minutes"
          :tag="item.tags"
        />
      </div>
    </section>
    <section class="section__comment">
      <div class="title">
        <span class="title-span">نظرات</span>
      </div>
      <div class="comments">
        <div
          class="comments-item"
          v-for="(item, index) in comments"
          :key="index"
        >
          <Comment
            :writer="item.first_name + ' ' + item.last_name"
            :date="item.created_at"
            :description="item.content"
          />
        </div>
        <div class="comments__insert">
          <h3>نظر دادن</h3>
          <form class="comments__form" @submit.prevent="inserComment">
            <div class="comments__input">
              <div class="comments__input--name">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="نام*"
                  v-model="user_firstName"
                />
              </div>
              <div class="comments__input--family">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="نام خانوادگی*"
                  v-model="user_lastName"
                />
              </div>
              <div class="comments__input--email">
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="پست الکترونیک*"
                  v-model="user_email"
                />
              </div>
            </div>
            <div class="comments__input">
              <textarea
                name=""
                id=""
                placeholder="نظردادن*"
                cols="100"
                v-model="user_comment"
              ></textarea>
            </div>
            <div class="comments__button">
              <button type="submit">ثبت نظر</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Header from "../../components/common/HeaderCoponent/HeaderCoponent.vue";
import UserImg from "../../components/common/UserImg/UserImg.vue";
import Cardnews from "../../components/common/cardNews/cardNews.vue";
import Comment from "../../components/common/CommentItem/CommentItem.vue";
import axios from "axios";
export default {
  name: "single",
  data() {
    return {
      src: "",
      authorimg: "",
      authorname: "",
      authorUsername: "",
      author_last_name: "",
      author_first_name: "",
      author_id : "",
      time: "",
      title: "",
      timetoread: "",
      tag: "",
      image1: "",
      image2: "",
      content: "",
      boldcontent: "",
      articleId: this.$route.params.articleId,
      user_firstName: "",
      user_lastName: "",
      user_email: "",
      user_comment: "",

      articles: [],
      comments: [],
    };
  },
  components: {
    Header,
    UserImg,
    Cardnews,
    Comment,
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
    async inserComment() {
      const response = await axios
        .post("http://87.107.30.143:3001/comments", {
          article_id: parseInt(this.articleId),
          first_name: this.user_firstName,
          last_name: this.user_lastName,
          email: this.user_email,
          content: this.user_comment,
          reply_to: null,
        })
        .then((response) => {
          console.log(response);
          if (response.status == 201 && response.statusText == "Created")
            this.$router.push({
              name: "Single",
              params: { articleId: this.articleId },
            });
          this.$router.reload();
        });
    },
  },
  mounted() {
    //get single article
    const url = `http://87.107.30.143:3001/articles?id=${this.articleId}`;
    axios.get(url).then((response) => {
      let regex = /\d{1,4}\.\d{1,4}\.\d{1,4}\.\d{1,4}/;
      let data = response.data.data;
      this.authorimg = data.auther_profile_image.replace(
        regex,
        "87.107.30.143"
      );
      this.image1 = data.image_url.replace(regex, "87.107.30.143");
      this.image2 = data.image_url.replace(regex, "87.107.30.143");
      this.authorname = data.author_first_name + " " + data.author_last_name;
      this.author_first_name = data.author_first_name;
      this.author_last_name = data.author_last_name;
      this.authorUsername = data.author_username;
      this.author_id = data.author_id;
      let string = data.created_at;
      string = string.split("T")[0].split("-");
      string = string.map(Number);
      this.time = this.gregorian_to_jalali(string[0], string[1], string[2]);
      this.title = data.title;
      this.timetoread = data.read_time_minutes;
      let tags = data.tags;
      let temps = [];
      for (let i = 0; i < tags.length; i++) {
        temps.push(tags[i].name);
      }
      tags = temps;
      tags = tags.length > 0 ? tags.join(" ") : "تکنولوژی";
      this.tag = tags;
      this.content = data.content;
      this.boldcontent = data.content;
      // article fromThisUser
      let fromThisUser = data.fromThisUser;

      for (let i = 0; i < fromThisUser.length; i++) {
        fromThisUser[i].image_url = fromThisUser[i].image_url.replace(
          regex,
          "87.107.30.143"
        );
        let tags = fromThisUser[i].tags;
        let temps = [];
        for (let i = 0; i < tags.length; i++) {
          temps.push(tags[i].name);
        }
        tags = temps;
        tags = tags.length > 0 ? tags.join(" , ") : "تکنولوژی";
        fromThisUser[i].tags = tags;

        let string = fromThisUser[i].created_at;
        string = string.split("T")[0].split("-");
        string = string.map(Number);
        fromThisUser[i].created_at = this.gregorian_to_jalali(
          string[0],
          string[1],
          string[2]
        );
      }
      this.articles = fromThisUser;

      // comments
      let Comments = data.comments;
      for (let i = 0; i < Comments.length; i++) {
        let string = Comments[i].created_at;
        string = string.split("T")[0].split("-");
        string = string.map(Number);
        Comments[i].created_at = this.gregorian_to_jalali(
          string[0],
          string[1],
          string[2]
        );
      }
      this.comments = Comments;
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
@import "./Single.scss";
</style>
