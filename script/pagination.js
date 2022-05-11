const quantityEl = document.querySelector(".quantity-pages");
const paginationDotsEl = document.querySelector(".pagination-dots");
const paginationEl = document.querySelector(".pagination");
const prevPageBtn = document.querySelector(".btn-pagination--left");
const nextPageBtn = document.querySelector(".btn-pagination--right");

fetch("db/cards.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    let pages = Math.ceil(data.length / quantityCardsOnPage);

    for (let i = 1; i <= pages; i++) {
      let pageNum = pages + 1 - i;
      paginationEl.firstElementChild.insertAdjacentHTML(
        "afterend",
        `<button class="page-number">${pageNum}</button>`
      );
    }

    const pageBtnEl = document.querySelectorAll(".page-number");
    pageBtnEl[0].classList.add("active-page");

    if (pages <= 5) {
      quantityEl.style.display = "none";
      paginationDotsEl.style.display = "none";
    } else {
      quantityEl.style.display = "visible";
      paginationDotsEl.style.display = "visible";
      quantityEl.innerHTML = `${pages}`;
    }

    let curPage = 1;

    prevPageBtn.addEventListener("click", () => {
      if (curPage !== 1) {
        pageToggle(-1, curPage);
      }
    });

    nextPageBtn.addEventListener("click", () => {
      if (curPage !== pages) {
        pageToggle(1, curPage);
      }
    });

    const pageToggle = function (i, page) {
      curPage = page + i;
      pageBtnEl.forEach((element) => element.classList.remove("active-page"));
      renderPage(curPage);
      pageBtnEl[curPage - 1].classList.add("active-page");
      update();
    };

    pageBtnEl.forEach((btn) => {
      btn.addEventListener("click", () => {
        pageToggle(0, +btn.textContent);
      });
    });
  });
