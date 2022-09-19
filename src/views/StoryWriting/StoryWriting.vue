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
  <div class="frame">
    <div v-if="showModal">
      <Modal :tag="tag" :theme="theme" :exit="exit" @close="selectTag">
        <div class="modal__body">
          <div class="modul__title">
            <span>لطفا دسته بندی موضوعی خود را انتخاب کنید</span>
          </div>

          <select class="modul__select" v-model="tagValue" @change="addTag">
            <option
              v-for="(item, index) in tagList"
              :key="index"
              :value="item.id"
            >
              {{ item.name }}
            </option>
          </select>
          <div class="modul__btn">
            <button class="modul__btn-send" @click="selectTag">تایید</button>
          </div>
        </div>
      </Modal>
    </div>

    <div class="container">
      <form @submit.prevent="addArticle">
        <div class="add-article">
          <figure>
            <img
              src="@/assets/images/add-article-icon.svg"
              alt=""
              class="add-article__icon"
            />
          </figure>
          <span class="add-article__text">ایجاد مطلب جدید</span>
        </div>
        <div class="article-img">
          <figure>
            <img
              src="@/assets/images/uploadimg.svg"
              alt=""
              class="article-img__patern"
              id="uploadPreview"
            />
          </figure>
          <figure>
            <img
              class="change-style-icon"
              src="@/assets/images/Change Style.svg"
              alt=""
            />
          </figure>
          <figure>
            <label for="inp__picture-article"
              ><img
                class="add-pic-icon"
                src="@/assets/images/addpic.svg"
                alt=""
            /></label>
            <input
              type="file"
              id="inp__picture-article"
              accept="image/*"
              class="article-img-input"
              @change="uploadImageArticle"
              :v-model="imgs"
            />
          </figure>
        </div>
        <div class="contents">
          <span class="insert-title">عنوان مطلب خود را وارد کنید</span>

          <input
            class="insert-titleinput"
            v-model="title"
            placeholder="عنوان مطلب خود را وارد کنید "
          />

          <div class="tag-input-container">
            <div class="tag" v-for="(tag, index) in tagNames" :key="index">
              {{ tag }}
            </div>
            <figure class="contents__fig" @click="selectTag">
              <img
                src="@/assets/images/addtext.svg"
                alt=""
                class="contents__fig--icon"
              />
            </figure>
          </div>

          <span class="insert-caption"> متن اصلی خود را وارد کنید</span>
          <textarea
            class="insert-captioninput"
            v-model="caption"
            placeholder="متن اصلی خود را وارد کنید "
          ></textarea>
        </div>
        <button class="send-article" type="submit">انتشار مطلب</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "../../components/common/HeaderCoponent/HeaderCoponent.vue";
import Modal from "../../components/common/ModalContent/ModalContent.vue";
import UserImg from "../../components/common/UserImg/UserImg.vue";
import Popup from "../../components/view/Popup/popup.vue";
import { ref } from "vue";
// import { Ref } from "vue";
export default {
  name: "storywriting",
  setup() {
    const isOpen = ref(false);

    return { isOpen };
  },
  data() {
    return {
      tag: "tag",
      theme: "light",
      exit: "X",
      showModal: false,
      title: "",
      caption: "",
      imgs: "",
      tagValue: "",
      tagName: "",
      tagNames: [],
      tags: [],
      tagList: [],
    };
  },
  components: { Popup, Header, Modal, UserImg },
  methods: {
    onChange(event) {
      console.log(event.target.value);
    },
    addTag() {
      let e = document.getElementsByClassName("modul__select")[0];
      var tagName = e.options[e.selectedIndex].innerText;
      this.tagNames.push(tagName);
      if (!this.tagValue == "") this.tags.push(this.tagValue);
      this.tagValue = "";
    },
    uploadImageArticle() {
      let oFReader = new FileReader();
      let articleImg = document.querySelector(".article-img__patern");
      oFReader.readAsDataURL(
        document.getElementById("inp__picture-article").files[0]
      );

      oFReader.onload = function (oFREvent) {
        // document.getElementById("uploadPreview").src = oFREvent.target.result;
        document.getElementById("uploadPreview").style.borderRadius = "10px";
        document.querySelector(".article-img").style.backgroundImage =
          "url(" + oFREvent.target.result + ")";
        document.querySelector(".article-img").style.backgroundSize = "100%";

        articleImg.remove();
      };
    },
    selectTag() {
      this.showModal = !this.showModal;
    },
    async addArticle() {
      var formData = new FormData();
      var imagefile = document.getElementById("inp__picture-article");
      formData.append("image", imagefile.files[0]);
      formData.append("title", this.title);
      formData.append("content", this.caption);
      formData.append("tags", this.tags);
      const response = axios
        .post("http://87.107.30.143:3001/articles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((response) => {
          if (response.status == 201 && response.statusText == "Created")
            this.$router.push({ name: "HomePage" });
        });
    },
  },
  mounted() {
    //get tag list
    axios
      .get("http://87.107.30.143:3001/tags", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response);
        this.tagList = response.data.data;
        console.log(this.tagList);
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
@import "./StoryWriting.scss";
</style>
