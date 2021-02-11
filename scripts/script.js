// Script.js
let myLocalStorage = window.localStorage;
var productList = document.getElementById('product-list');

window.addEventListener('DOMContentLoaded', () => {
  if (myLocalStorage.getItem('products') == null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => myLocalStorage.setItem('products',JSON.stringify(data)));
  }
  else{
    let storage = JSON.parse(myLocalStorage.getItem('products'));
    for (let i = 0; i < storage.length; i++) {
      productList.appendChild(new ProductItem(storage[i]));
    } 
  }
   
});
