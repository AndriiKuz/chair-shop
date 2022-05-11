const accordionEl = document.querySelector(".accordion");
const hidenBoxEl = document.querySelector(".hiden-box");

class Accordion {
  constructor(number, title, textContent, list) {
    this.number = +number;
    this.title = title;
    this.textContent = textContent;
    this.list = list;
  }

  renderAcordion() {
    const newList = this.list.map((li) => {
      return `<li>${li}</li>`;
    });

    let num;

    if (this.number < 10) {
      num = `0${this.number}`;
    } else {
      num = this.number;
    }

    accordionEl.insertAdjacentHTML(
      "beforeend",
      `<div class="item">
      <p class="number">${num}</p>
      <p class="text">${this.title}</p>

      <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 
            010-1.414z"
            clip-rule="evenodd"
          />
        </svg>

    <div class="hidden-box">
      <p>${this.textContent}</p>
      <ul>
        ${newList.join(" ")}
      </ul>
    </div>
  </div>`
    );
  }
}

let accordionItems = [];

fetch("db/accordion.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    data.forEach((el) => {
      accordionItems.push(
        new Accordion(
          Object.values(el)[0],
          Object.values(el)[1],
          Object.values(el)[2],
          Object.values(el)[3]
        )
      );
    });
    accordionItems.forEach((obj) => {
      obj.renderAcordion();
    });

    document.querySelectorAll(".icon").forEach((element) => {
      element.addEventListener("click", () => {
        element.parentElement.classList.toggle("open");
      });
    });
  });
