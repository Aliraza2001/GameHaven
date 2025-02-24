function addToCart(game, price) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push({ game, price });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addToCart', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ gameName: game, price: price }));

  alert('Game added to cart!');
}
    
/*########################## MyOrders TESTING ##########################*/
function addToMyOrders(game, price) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  cartItems.push({ game, price });
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/addToMyOrders', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ gameName: game, price: price }));
}
/*########################## MyOrders TESTING ##########################*/

function searchGames() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const gameItems = document.querySelectorAll('.game-list ul li');
  const results = [];

  gameItems.forEach((item) => {
    const gameTitle = item.innerText.toLowerCase();
    if (gameTitle.includes(searchInput)) {
      results.push(item.outerHTML);
    }
  });

  const searchResultsContainer = document.getElementById('search-results');
  searchResultsContainer.innerHTML = '';

  if (results.length > 0) {
    results.forEach((result) => {
      searchResultsContainer.innerHTML += result;
    });
  } else {
    searchResultsContainer.innerText = 'Sorry, no matches found.';
    }
}