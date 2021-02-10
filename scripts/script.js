// Script.js
window.addEventListener('DOMContentLoaded', () => {
  // TODO
  var myLocalStorage = window.localStorage;
  var cart = [];
  myLocalStorage.setItem('cart', JSON.stringify(cart));
  if(!myLocalStorage.getItem('products')){
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data =>{
        myLocalStorage.setItem('products', JSON.stringify(data));
        var storage = JSON.parse(myLocalStorage.getItem('products'));

        
        storage.forEach(element => {
          //product-item initialize
          var pItem = document.createElement('product-item');
          pItem.setAttribute('img', element.image);
          pItem.setAttribute('alt', element.title);
          pItem.setAttribute('price','$' + element.price);
          pItem.setAttribute('dataId', element.id);
          // pItem.setAttribute('description', element.description);
          pItem.setAttribute('title', element.title);
          // pItem.setAttribute('category', element.category);
          document.getElementById('product-list').appendChild(pItem);
        });
      });
  }
  else{
    const storage = JSON.parse(myLocalStorage.getItem('products'));

    
    storage.forEach(element => {
      //product-item initialize
      var pItem = document.createElement('product-item');
      pItem.setAttribute('img', element.image);
      pItem.setAttribute('price','$'+element.price);
      pItem.setAttribute('dataId', element.id);
      //console.log(element.id);
      pItem.setAttribute('alt', element.title);
      // pItem.setAttribute('description', element.description);
      pItem.setAttribute('title', element.title);
      // pItem.setAttribute('category', element.category);
      document.getElementById('product-list').appendChild(pItem);
    });
  }
  
});
