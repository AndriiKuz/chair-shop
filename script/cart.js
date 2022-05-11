const quantProdInCartEl = document.querySelector(".product-in-cart");
const modalActionsCl = document.querySelector(".modal__actions");

const updateCartIcon = function () {
  if (cart.length == 0) {
    modalActionsCl.classList.add("visible");
    quantProdInCartEl.classList.add("empty");
  } else {
    modalActionsCl.classList.remove("visible");
    quantProdInCartEl.classList.remove("empty");
    quantProdInCartEl.textContent = `${cart.length}`;
  }
};
