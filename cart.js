function removeItem(index) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const gameToRemove = cartItems[index];

  cartItems.splice(index, 1);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/removeFromCart', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      displayCartItems();
    }
  };
  xhr.send(JSON.stringify(gameToRemove));
}


function fetchCartItems() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', '/getCartItems', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const cartItems = JSON.parse(xhr.responseText);
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      displayCartItems();
    }
  };
  xhr.send();
}

function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const cartList = document.querySelector('.cart-items');
  const totalPriceElement = document.getElementById('total-price');
  let totalPrice = 0;

  cartList.innerHTML = '';

  cartItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    const removeButton = document.createElement('button');

    listItem.textContent = `${item.game_name} - ${item.price}`;
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-button';
    removeButton.addEventListener('click', () => removeItem(index));

    listItem.appendChild(removeButton);
    cartList.appendChild(listItem);

    totalPrice += item.price;
  });

  totalPriceElement.textContent = `AED${totalPrice.toFixed(2)}`;
}

fetchCartItems();

document.getElementById('place-order-btn').addEventListener('click', () => {
  alert('Order placed successfully! A payment link will be sent to your email along with an invoice after which you can schedule for delivery or pick-up. Thank you for shopping at GameHaven :)');

  localStorage.removeItem('cartItems');
  displayCartItems();

  setTimeout(() => {
    location.reload();
  }, 5000);
});