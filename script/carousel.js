const carouselEL = document.querySelector(".carousel");
const carouselContentEL = document.querySelector(".carousel-content");
const btnLeft = document.querySelector(".btn--left");
const btnRight = document.querySelector(".btn--right");
const dotsEL = document.querySelector(".dots");

let index = 0;

class Carousel {
  constructor(
    image,
    imageAlt,
    testimonialText,
    testimonialAuthor,
    testimonialJob
  ) {
    this.image = image;
    this.imageAlt = imageAlt;
    this.testimonialText = testimonialText;
    this.testimonialAuthor = testimonialAuthor;
    this.testimonialJob = testimonialJob;
    this.renderDot();
  }
  render() {
    carouselContentEL.innerHTML = ` <img class ="carousel-img" src="${this.image}" alt="${this.imageAlt}" />
    <blockquote class="testimonial">
      <p class="testimonial-text">
      ${this.testimonialText}
      </p>
      <p class="testimonial-author">${this.testimonialAuthor}</p>
      <p class="testimonial-job">${this.testimonialJob}</p>
    </blockquote>`;
  }
  renderDot() {
    dotsEL.insertAdjacentHTML(
      "beforeend",
      `<button class="dot">&nbsp;</button>`
    );
  }
}

let slides = [];

fetch("db/carousel.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((el, id) => {
      slides.push(
        new Carousel(
          Object.values(el)[0],
          Object.values(el)[1],
          Object.values(el)[2],
          Object.values(el)[3],
          Object.values(el)[4]
        )
      );
    });

    const activeDot = document.querySelectorAll(".dot");

    slides[index].render();
    activeDot[index].style.backgroundColor = "#087f5b";

    const activeDotToggle = function (position) {
      activeDot.forEach((elem) => {
        elem.style.backgroundColor = "";
      });
      activeDot[position].style.backgroundColor = "#087f5b";
    };

    const nextSlide = function () {
      if (index > slides.length - 2) {
        index = 0;
        activeDotToggle(index);
        slides[index].render();
      } else {
        activeDotToggle(index + 1);
        slides[(index += 1)].render();
      }
    };

    const prevSlide = function () {
      if (index <= 0) {
        index = slides.length;
      }
      activeDotToggle(index - 1);
      slides[(index -= 1)].render();
    };

    setInterval(() => {
      nextSlide();
    }, 10000);

    btnRight.addEventListener("click", nextSlide);
    btnLeft.addEventListener("click", prevSlide);

    activeDot.forEach((btn, id) => {
      btn.addEventListener("click", () => {
        index = id;
        slides[index].render();
        activeDotToggle(index);
      });
    });
  });
