// Script.js


window.addEventListener('DOMContentLoaded', () => {
  let myLocalStorage = window.localStorage;
  var productList = document.getElementById('product-list');
  if (myLocalStorage.getItem('products') == null) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data =>{
        myStorage.setItem('products',JSON.stringify(data));
        let storage = JSON.parse(myStorage.getItem('products'));
        for (let i = 0; i < storage.length; i++) {
          productList.appendChild(new ProductItem(storage[i]));
        }
      });
  }
  else{
    let storage = JSON.parse(myLocalStorage.getItem('products'));
    for (let i = 0; i < storage.length; i++) {
      productList.appendChild(new ProductItem(storage[i]));
    } 
  }
   
});
