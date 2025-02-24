// function removeItem(index) {
//     const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const gameToRemove = cartItems[index];
  
//     cartItems.splice(index, 1);
//     localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', '/removeFromCart', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.onreadystatechange = function () {
//       if (xhr.readyState === 4 && xhr.status === 200) {
//         displayCartItems();
//       }
//     };
//     xhr.send(JSON.stringify(gameToRemove));
//   }
  
  function fetchMyOrderItems() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/getMyOrderItems', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const orderItems = JSON.parse(xhr.responseText);
        localStorage.setItem('orderItems', JSON.stringify(orderItems));
        displayMyOrderItems();
      }
    };
    xhr.send();
  }
  
  function displayMyOrderItems() {
    const orderItems = JSON.parse(localStorage.getItem('orderItems')) || [];
    const orderList = document.querySelector('.order-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;
  
    orderList.innerHTML = '';
  
    orderItems.forEach((item, index) => {
      const listItem = document.createElement('li');
    //   const removeButton = document.createElement('button');
  
      listItem.textContent = `${item.game_name} - ${item.price}`;
    //   removeButton.textContent = 'Remove';
    //   removeButton.className = 'remove-button';
    //   removeButton.addEventListener('click', () => removeItem(index));
  
    //   listItem.appendChild(removeButton);
      orderList.appendChild(listItem);
  
      totalPrice += item.price;
    });
  
    totalPriceElement.textContent = `AED${totalPrice.toFixed(2)}`;
  }
  
  fetchMyOrderItems();
  