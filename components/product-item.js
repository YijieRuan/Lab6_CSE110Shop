// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  
  constructor(product){
    super();
    var myLocalStorage = window.localStorage;
    //define count of the item in cart
    if (myLocalStorage.getItem('cart') == null) {
      myLocalStorage.setItem('cart','[]');
    }
    var count = document.getElementById('cart-count');
    if (myLocalStorage.getItem('cart')!= null) {
      count.textContent = JSON.parse(myLocalStorage.getItem('cart')).length;
    }
    var c = JSON.parse(myLocalStorage.getItem('cart'));
    // var cart = [];
    // myLocalStorage.setItem('cart', JSON.stringify(cart));
    let shadow = this.attachShadow({mode: 'open'});

    //create li
    var li = document.createElement('li');
    li.setAttribute('class', 'product');

    //set img
    var img = document.createElement('img');
    img.setAttribute('src',product['image']);
    img.setAttribute('alt',product['title']);
    img.setAttribute('width',200);
    li.appendChild(img);

    //set title of the product
    var title = document.createElement('p');
    title.setAttribute('class','title');
    title.textContent = product['title'];
    li.appendChild(title);

    //set price of the product
    var price = document.createElement('p');
    price.setAttribute('class','price');
    price.textContent = '$' + product['price'];
    li.appendChild(price);

    //set the button
    var button = li.appendChild(document.createElement('button'));
    button.setAttribute('onclick',"alert('Added to Cart!')");
    if(!c.includes(product['id'])){
      button.textContent = 'Remove from Cart';
      button.setAttribute('onclick', "alert('Removed from Cart!')");
    }
    else{
      button.textContent = 'Add to Cart';
      button.setAttribute('onclick', "alert('Added to Cart!')");
    }
    button.addEventListener('click', function(){

      //define the text on the button
      var status = this.textContent;
      //console.log(status);
      //let myLocalStorage = window.localStorage;
      //change the status, onclick, add or delete item, change count
      if (status === 'Add to Cart'){
        this.textContent = 'Remove from Cart';
        count.textContent ++;
        button.setAttribute('onclick', "alert('Removed from Cart!')");
        if(myLocalStorage.getItem('cart') == null){
          var current = [product['id']];
          myLocalStorage.setItem('cart', JSON.stringify(current));
          //document.getElementById('cart-count').textContent = c.length;
        }
        else{
          //set cart into an array
          var current = JSON.parse(myLocalStorage.getItem('cart'));
          //console.log(this.getAttribute('dataId'));
          current.push(product['id']);
          //console.log(c);
          //define cart as this array
          myLocalStorage.setItem('cart', JSON.stringify(current));
         //document.getElementById('cart-count').textContent = c.length;
        }
        
      }
      else{
        this.textContent = 'Add to Cart';
        count.textContent--;
        button.setAttribute('onclick', "alert('Added to Cart!')");
        //set cart
        var current= JSON.parse(myLocalStorage.getItem('cart'));
        var x = 0;
        current.forEach(element=> {
          if(element === product['id']){
            current.splice(x,1);
            //break;
            //console.log(c);
            return
          }
          x = x+1;
        });
        //console.log(this.getAttribute('dataId'));
        //c.push(this.getAttribute('dataId'));
        //console.log(c);
        myLocalStorage.setItem('cart', JSON.stringify(current));
        //document.getElementById('cart-count').textContent = c.length;
        //console.log(c);
      }

    });
    li.appendChild(button);
    let style = document.createElement('style');
    style.textContent = `.price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`
      shadow.appendChild(style);
      shadow.appendChild(li);
      // li.appendChild(icon);
      // li.appendChild(info);
      
  }
}

customElements.define('product-item', ProductItem);
