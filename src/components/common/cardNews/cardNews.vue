<template>
  <div class="card-news__item">
    <router-link
      :to="{ name: 'Single', params: { articleId: this.articleId } }"
      :articleId="articleId"
      :authorId="authorId"
      :authorUsername="authorUsername"
      :authorFirstName="authorFirstName"
      :authorLastName="authorLastName"
    >
      <router-link
        :to="{
          name: 'profile',
          params: {
            authorId: this.authorId,
            authorFirstName: this.authorFirstName,
            authorLastName: this.authorLastName,
            authorUsername: this.authorUsername,
            authorImg: this.authorimg,
          },
        }"
      >
        <div class="author">
          <figure class="author__img">
            <img :src="authorimg" alt="author-img" />
          </figure>
          <div class="author__info">
            <span class="author__info-name">{{ authorName }}</span>
            <span class="author__info-date">{{ authorDate }}</span>
          </div>
        </div>
      </router-link>
      <figure class="card-news__item__img">
        <img :src="img" alt="card-news-img" />
        <span class="overlay"></span>
      </figure>
      <p class="card-news__item-title">
        {{ title }}
      </p>
      <p class="card-news__item-caption">
        {{ caption }}
      </p>
      <div class="details">
        <span class="details__time">{{ time }} دقیقه مطالعه</span>
        <span class="details__tag">{{ tag }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "cardnews",
  data() {},
  methods: {},
  components: {},
  props: {
    authorName: {
      type: String,
      default: "",
    },
    authorFirstName: {
      type: String,
      default: "",
    },
    authorLastName: {
      type: String,
      default: "",
    },
    authorUsername: {
      type: String,
      default: "",
    },
    authorDate: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    caption: {
      type: String,
      default: "",
    },
    time: {
      type: Number,
      default: "",
    },
    caption: {
      type: String,
      default: "",
    },
    authorimg: {
      type: String,
      default: "",
    },
    img: {
      type: String,
      default: "",
    },
    tag: {
      type: String,
      default: "",
    },
    authorId: {
      type: Number,
      default: "",
    },
    articleId: {
      type: Number,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./cardNews.scss";
</style>
