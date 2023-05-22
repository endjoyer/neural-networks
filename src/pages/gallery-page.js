import "../pages/gallery-page.css";
import hamburger from "../scripts/hamburger-menu.js";

hamburger();

const cards = Array.from(document.querySelectorAll(".gallery__card"));
const slider = document.querySelector(".slider");
const sliderContainer = document.querySelector(".slider__container");
const picture = Array.from(document.querySelectorAll(".gallery__card__pic"));
const sliderBtnLeft = document.querySelector(".slider__btn_left");
const sliderBtnRight = document.querySelector(".slider__btn_right");
const sliderClose = document.querySelector(".slider__close");

let cardIndex = -1;
let pictureFull;

cards.forEach((card, index) => {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    cardIndex = index;
    pictureFull = picture[cardIndex].cloneNode();
    pictureFull.style.objectFit = "contain";
    sliderContainer.append(pictureFull);
    slider.classList.add("active");
  });
});

sliderBtnLeft.addEventListener("click", (event) => {
  event.preventDefault();
  changePicture("left");
});

sliderBtnRight.addEventListener("click", (event) => {
  event.preventDefault();
  changePicture("right");
});

function changePicture(dir) {
  if (dir === "left") {
    cardIndex = (cardIndex - 1 + cards.length) % cards.length;
  } else if (dir === "right") {
    cardIndex = (cardIndex + 1) % cards.length;
  }
  let newPictureFull = picture[cardIndex].cloneNode();
  newPictureFull.style.objectFit = "contain";
  pictureFull.replaceWith(newPictureFull);
  pictureFull = newPictureFull;
}

sliderClose.addEventListener("click", (event) => {
  event.preventDefault();
  closeSlider();
});

document.addEventListener("mousedown", function (e) {
  if (e.target.closest(".slider__container") === null) {
    closeSlider();
  }
});

function closeSlider() {
  slider.classList.remove("active");
  if (pictureFull) {
    pictureFull.remove();
  }
}
