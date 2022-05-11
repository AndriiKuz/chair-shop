const cartBtn = document.querySelector(".btn-cart");
const yesBtn = document.querySelector(".yes-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const modalCl = document.querySelector(".modal");
const scrollBoxEl = document.querySelector(".scroll-box");
const backDrop = document.getElementById("backdrop");
const deleteModalEl = document.getElementById("delete-modal");
const clearCartBtn = document.querySelector(".clear-cart");
const totalPriceEl = document.querySelector(".price");
const contactFormEl = document.getElementById("contact-form");
const toOrderBtn = document.querySelector(".to-order");
const backToCartBtn = document.querySelector(".btn--form-back-to-cart");
const closeCartBtnEl = document.querySelector("#close-cart-btn");
const closeOderingBtnEl = document.querySelector("#close-odering-btn");
const confirmBtn = document.querySelector(".btn--form-confirm");
const successModalEl = document.getElementById("success-modal");
const addedToCartModalEl = document.getElementById("added-to-cart");
const ctaForm = document.querySelector(".cta-form");

let cart = [];
let arr = [];

class CartItem {
  constructor(img, productName, price) {
    this.img = img;
    this.productName = productName;
    this.price = price;
  }

  renderCartItem() {
    scrollBoxEl.insertAdjacentHTML(
      "beforeend",
      `<div class="modal__content">
        <figure class="cart-item">
          <div class="img-and-title">
            <img src="${this.img}" alt="Product photo" />
            <h3>${this.productName}</h3>
          </div>
          <div class="price-and-trash">
            <strong>${this.price}€</strong>
            <button class="btn--danger btn--trash">
            <ion-icon class="trash-icon" name="trash-outline"></ion-icon></button>
          </div>
        </figure>
      </div>`
    );
  }
}

const emptyCart = function () {
  if (cart.length == 0) {
    scrollBoxEl.innerHTML = `
  <div class="modal__content">
    <figure class="cart-item">
      <span class="empty-cart">Cart is empty. Please add some product to cart.</span>
    </figure>
  </div>`;
  }
};

emptyCart();

const totalPrice = function () {
  cart.forEach((obj) => {
    arr.push(Object.values(obj)[2]);
  });
  if (arr.length > 0) {
    let totalPrice = arr.reduce((prev, cur) => prev + cur);
    totalPriceEl.innerHTML = `${totalPrice}€`;
    arr = [];
  } else {
    totalPriceEl.innerHTML = `0€`;
    emptyCart();
    updateCartIcon();
  }
};

const openCartModal = function () {
  let trashBtn = scrollBoxEl.querySelectorAll(".btn--trash");
  let modalContentEl = scrollBoxEl.querySelectorAll(".modal__content");

  trashBtn.forEach((btn, id) => {
    btn.addEventListener("click", () => {
      cart.splice(id, 1);
      scrollBoxEl.innerHTML = "";
      renderCartItemHendler();
      totalPrice();
      updateCartIcon();
      openCartModal();
    });
  });

  contactFormEl.classList.remove("visible");
  deleteModalEl.classList.remove("visible");
  if (!backDrop.classList.contains("visible")) {
    toggleBackDrop();
  }
  modalCl.classList.add("visible");
};

const closeCartModal = function () {
  toggleBackDrop();
  modalCl.classList.remove("visible");
};

const openDeleteModal = function () {
  modalCl.classList.remove("visible");
  deleteModalEl.classList.add("visible");
};

const openContactFormModal = function () {
  modalCl.classList.remove("visible");
  contactFormEl.classList.add("visible");
};

const toggleBackDrop = function () {
  backDrop.classList.toggle("visible");
};

const backDropClickHendler = function () {
  if (contactFormEl.classList.contains("visible")) {
    contactFormEl.classList.remove("visible");
    toggleBackDrop();
    closeCartModal();
  }

  if (
    !deleteModalEl.classList.contains("visible") &&
    !successModalEl.classList.contains("visible") &&
    !addedToCartModalEl.classList.contains("visible")
  ) {
    closeCartModal();
  }
};

const renderCartItemHendler = function () {
  cart.forEach((element) => {
    element.renderCartItem();
  });
};

const addToCart = function (par) {
  scrollBoxEl.innerHTML = "";
  const product = new CartItem(par[0], par[1], par[2]);
  cart.push(product);
  renderCartItemHendler();

  totalPrice();
  updateCartIcon();
  addedToCart();
};

const addedToCart = function () {
  addedToCartModalEl.classList.add("visible");
  toggleBackDrop();
  setTimeout(() => {
    addedToCartModalEl.classList.remove("visible");
    toggleBackDrop();
  }, 3000);
};

const update = function () {
  setTimeout(() => {
    const addToCartBtn = document.getElementsByClassName("add-to-cart");

    for (let i = 0; i < addToCartBtn.length; i++) {
      const img =
        addToCartBtn[i].parentElement.parentElement.previousElementSibling.src;

      const name =
        addToCartBtn[i].parentElement.parentElement.firstElementChild
          .textContent;
      const price = parseInt(
        addToCartBtn[i].previousElementSibling.textContent
      );

      addToCartBtn[i].addEventListener(
        "click",
        addToCart.bind(this, [img, name, price])
      );
    }
  }, 700);
};

update();

const clearCart = function () {
  cart = [];
  arr = [];
  if (!successModalEl.classList.contains("visible")) {
    openCartModal();
  }
  totalPrice();
  emptyCart();
  updateCartIcon();
};

const showSuccessModal = function () {
  contactFormEl.classList.remove("visible");
  toggleBackDrop();
  successModalEl.classList.add("visible");
  toggleBackDrop();
};

const submit = function () {
  let fullName = document.querySelector("#full-name").value,
    email = document.querySelector("#email").value,
    phone = document.querySelector("#phone").value,
    where = document.querySelector("#select-where").value;
  if (fullName && email && phone && where) {
    let form = {
      fullName,
      email,
      phone,
      where,
      order: cart,
    };
    showSuccessModal();
    console.log(form);
    clearCart();

    setTimeout(() => {
      successModalEl.classList.remove("visible");
      if (backDrop.classList.contains("visible")) {
        toggleBackDrop();
      }
    }, 3000);
  } else {
    alert("All fields must be filled.");
  }
};

closeCartBtnEl.addEventListener("click", () => {
  closeCartModal();
  contactFormEl.classList.remove("visible");
});

closeOderingBtnEl.addEventListener("click", () => {
  contactFormEl.classList.remove("visible");
  backDropClickHendler();
});

toOrderBtn.addEventListener("click", openContactFormModal);
backToCartBtn.addEventListener("click", openCartModal);
clearCartBtn.addEventListener("click", openDeleteModal);
yesBtn.addEventListener("click", clearCart);
cancelBtn.addEventListener("click", openCartModal);
cartBtn.addEventListener("click", openCartModal);
backDrop.addEventListener("click", backDropClickHendler);

confirmBtn.addEventListener("click", (event) => {
  event.preventDefault();
  submit();
  ctaForm.reset();
});
