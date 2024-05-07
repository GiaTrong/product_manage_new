const url = new URL(window.location.href);

// UPDATE QUANTITY IN CART
const inputsQuantity = document.querySelectorAll("input[name='quantity']");
if (inputsQuantity) {
  console.log(inputsQuantity);

  inputsQuantity.forEach((input) => {
    input.addEventListener("change", (e) => {
      const quantity = e.target.value;
      const productId = input.getAttribute("product-id");

      if (parseFloat(quantity) >= 1) {
        window.location.href = `/cart/update/${productId}/${quantity}`;
      }
    });
  });
}
// END UPDATE QUANTITY IN CART
