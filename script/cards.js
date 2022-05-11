const cardContainerEl = document.querySelector(".card-container");

class Card {
  constructor(
    imgCard,
    cardName,
    firstLineDescription,
    secondLineDescription,
    thirdLineDescription,
    fourthLineDescription,
    price
  ) {
    this.imgCard = imgCard;
    this.cardName = cardName;
    this.firstLineDescription = firstLineDescription;
    this.secondLineDescription = secondLineDescription;
    this.thirdLineDescription = thirdLineDescription;
    this.fourthLineDescription = fourthLineDescription;
    this.price = price;
  }

  renderCard() {
    cardContainerEl.insertAdjacentHTML(
      "beforeend",
      `
    <figure class="chair">
            <img src="${this.imgCard}" alt="Product photo" />
            <div class="chair-box">
              <h3>${this.cardName}</h3>
              <ul class="chair-details">
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="chair-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 
                      2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                  
                  <span>${this.firstLineDescription}</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="chair-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>${this.secondLineDescription}</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="chair-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 
                      3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 
                      012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 
                      9 9 0 0118 0z"
                    />
                  </svg>
                  <span>${this.thirdLineDescription}</span>
                </li>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="chair-icon"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  <span>${this.fourthLineDescription}</span>
                </li>
              </ul>
              <div class="chair-price">
                <strong>${this.price}€</strong>
                <button class="btn btn--small add-to-cart">Add to cart</button>
              </div>
            </div>
          </figure>`
    );
  }
}

let cards = [];
const quantityCardsOnPage = 3;
const renderPage = function (pageNum = 1) {
  fetch("db/cards.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.forEach((el) => {
        cards.push(
          new Card(
            Object.values(el)[0],
            Object.values(el)[1],
            Object.values(el)[2],
            Object.values(el)[3],
            Object.values(el)[4],
            Object.values(el)[5],
            Object.values(el)[6]
          )
        );
      });

      cardContainerEl.innerHTML = "";

      let startId = pageNum * quantityCardsOnPage - quantityCardsOnPage;
      let endId = startId + quantityCardsOnPage;

      if (endId > data.length) {
        let curPage = cards.slice(startId, data.length);
        curPage.forEach((item) => {
          item.renderCard();
        });
      } else {
        let curPage = cards.slice(startId, endId);
        curPage.forEach((item) => {
          item.renderCard();
        });
      }
    });
};

renderPage();
