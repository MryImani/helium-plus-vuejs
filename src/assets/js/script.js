//slider code
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slider__item");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

//validation input


function checkpassword() {
  var Password = document.getElementById("inp__password").value;
  var returnPassword = document.getElementById("inp__returnPassword").value;
  if (returnPassword !== Password) {
    document.getElementById("inp__returnPassword").classList.add('errorValidation');
    document.getElementById("inp__returnPassword").value = '';
    var error = document.getElementById("inp__returnPassword--error");
    error.textContent = "تکرار رمز عبور مطابقت ندارد!";
  }
  else if (returnPassword === Password) {
    document.getElementById("inp__returnPassword").classList.remove('errorValidation');
  }
}
function focuseInp(event) {
  var val = event.value;
  if (val == '')
  document.querySelector('.form__content__item__span').style.opacity = '0';
  // var error = document.getElementById("inp__returnPassword--error");
  // error.textContent = '';
}

function onChangeInputValue(event) {
  var val = event.value;
  if (val != '')
    document.querySelector('.form__content__item__span').style.opacity = '0';
  else
  {
    document.querySelector('.form__content__item__span').style.opacity = '1';
    this.placeholder = '۰۹۱۵۱۲۳۴۵۶۷';
  }
    
}


//preview image after select
function PreviewImage() {
  var oFReader = new FileReader();
  oFReader.readAsDataURL(document.getElementById("inp__picture").files[0]);

  oFReader.onload = function (oFREvent) {
    document.getElementById("uploadPreview").src = oFREvent.target.result;
    // document.getElementById("uploadPreview").style.borderRadius = '100%';
  };
}


// create modul

function modul() {
  const frame = document.querySelector(".frame")
  const module = document.createElement("div")
  module.innerHTML = `
  <div class=" modul">
  <figure class="modul__cancel" onclick="cancel()"><img src="../assets/images/cross.svg" alt=""></figure>
  <div class="modul__title"><span>لطفا دسته بندی موضوعی خود را انتخاب کنید</span></div>
  <select class="modul__select">
      <option value="nano">نانو تکنولوژی</option>
      <option value="nano">نانو تکنولوژی</option>
      <option value="nano">نانو تکنولوژی</option>
      <option value="nano">نانو تکنولوژی</option>
  </select>
  <div class="modul__btn"><button class="modul__btn-send" onclick="cancel()">تایید</button></div>
</div> 
  `
  module.classList.add("modul")
  document.body.appendChild(module)


  const background = document.createElement("div")
  background.classList.add("background")
  frame.appendChild(background)

}


//cancell modul 


function cancel() {
  const removeModul = document.querySelector(".modul")
  const removeBack = document.querySelector(".background")
  removeModul.remove()
  removeBack.remove()
}


//uploadImageArticle

function uploadImageArticle() {
  let oFReader = new FileReader();
  let articleImg = document.querySelector(".article-img__patern")
  oFReader.readAsDataURL(document.getElementById("inp__picture-article").files[0]);

  oFReader.onload = function (oFREvent) {
    // document.getElementById("uploadPreview").src = oFREvent.target.result;
    document.getElementById("uploadPreview").style.borderRadius = '5px';
    document.querySelector(".article-img").style.backgroundImage = "url(" + oFREvent.target.result + ")";
    document.querySelector(".article-img").style.backgroundSize = "100%";
    articleImg.remove()

  };
}


//ajax step register


