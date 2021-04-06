
// Calculate subtotal, tax, and total
const calcSubTotal = (priceArr) => {
  // Sums the subtotal of all items in the array
  return priceArr.reduce((accumulator, currentValue) => accumulator + currentValue);
};
const calcGrandTotal = (subTotal) => {
  const taxRate = 1.13;
  const total = taxRate * subTotal;
  return Number(total.toFixed(2));
};
const calcTaxPaid = (subTot, grandTot) => {
  const taxes = grandTot - subTot;
  return Number(taxes.toFixed(2));
};


// Classes may need to be added to index
// Array to calculate subtotal tax, grant total
// The array will hold the price for each item
let itemsInCart = [];
let idsInCart = [];
let priceArray = [];
const addItemToCartRow = (productName, productPrice, productId) => {
  itemsInCart.push(productName);
  priceArray.push(productPrice / 100);
  const $cartRow = $(`
  <tr>
  <th scope="row">${itemsInCart.length}</th>
  <td>${productName}</td>
  <td>$ ${productPrice / 100}</td>
</tr>`);
  $('.table-items').append($cartRow);
  return $cartRow;
};


// Create event handler for each product card
// Event handler for first burger on page.
$(document).ready(function () {
  console.log("The document is ready");
  $('.get-ids').css('display', 'none');

  $('.add-burg-event').on('click', function(e) {
    e.preventDefault();
    const h3 = $(this).closest('.card').find('.card-title');
    const p = $(this).closest('.card').find('.card-footer');
    const p2 = $(this).closest('.card').find('.get-ids');
    console.log(p2);
    let productTitle = h3.text().trim();
    let productPrice = p.text().trim();
    let productId = p2.text().trim();
    console.log(productTitle);
    console.log(productPrice);
    console.log(productId);
    console.log(itemsInCart);
    addItemToCartRow(productTitle, productPrice);

    let prodId = $(this).closest('.card').find('.get-ids');
    prodId = prodId.text().trim()
    idsInCart.push(prodId);
    console.log("IDs Arr:", idsInCart);


    // Adjusting subtotal
    console.log(priceArray);
    let newSubTotal = calcSubTotal(priceArray);
    console.log(newSubTotal);
    $('.subtotal-line').replaceWith(`<td class="subtotal-line">$ ${newSubTotal}</td>`);

    let newGrandTotal = calcGrandTotal(newSubTotal);
    console.log(newGrandTotal);
    $('.grandtotal-line').replaceWith(`<td class="grandtotal-line">$ ${newGrandTotal}</td>`);

    let newTaxPaid = calcTaxPaid(newSubTotal, newGrandTotal);
    console.log(newTaxPaid);
    $('.taxtotal-line').replaceWith(`<td class="taxtotal-line">$ ${newTaxPaid}</td>`);
  });
});

// The items from the array are dynamically added/displayed in the sidebar
