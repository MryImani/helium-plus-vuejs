<template>
  <router-link
    :to="{ name: 'Single', params: { articleId: this.articleId } }"
    :articleId="articleId"
    class="card-item"
  >
    <figure class="card-item__img">
      <img :src="img" alt="" />
      <div class="overlay"></div>
    </figure>
    <div
      class="card-item__content"
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
            <img :src="authorimg" alt="" />
          </figure>
          <div class="author__info">
            <span class="author__info-name">{{ authorName }}</span>
            <span class="author__info-date"> {{ authorDate }}</span>
          </div>
        </div>
      </router-link>
      <p class="card-item__content-title">
        {{ title }}
      </p>
      <p class="card-item__content-caption">
        {{ caption }}
      </p>
      <div class="details">
        <span class="details__time"> {{ time }} دقیقه مطالعه </span>
        <span class="details__tag">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "cardArticle",
  dta() {
    return {};
  },
  props: {
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
    authorName: {
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
@import "./cardArticle.scss";
</style>
