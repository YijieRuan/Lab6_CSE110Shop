// product-item.js

class ProductItem extends HTMLElement {
  // TODO
  constructor(){
    super();
    let shadow = this.attachShadow({mode: 'open'});

    //create li
    var li = document.createElement('li');
    li.setAttribute('class', 'product');

    //set img
    var img = document.createElement('img');
    var image = li.appendChild(img);
    image.setAttribute('width',200);

    //set title of the product
    var Title = document.createElement('p');
    var title = li.appendChild(Title);
    title.setAttribute('class','title');

    //set price of the product
    var pri = document.createElement('p');
    var price = li.appendChild(pri);
    price.setAttribute('class','price');

    //set the button
    var button = li.appendChild(document.createElement('button'));
    button.setAttribute('onclick',"alert('Added to Cart!')");
    button.addEventListener('click', evt=>{
      //define targeted event
      var targetEvent = evt.target;

      //define count of the item in cart
      var count = document.getElementById('cart-count').textContent;

      //define the text on the button
      var status = targetEvent.textContent;
      //console.log(status);
      let myLocalStorage = window.localStorage;
      //change the status, onclick, add or delete item, change count
      if (status === 'Add to Cart'){
        targetEvent.textContent = 'Remove from Cart';
        document.getElementById('cart-count').textContent = parseInt(count) + 1;
        targetEvent.setAttribute('onclick', "alert('Removed from Cart!')");
        //set cart into an array
        var c = JSON.parse(myLocalStorage.getItem('cart'));
        console.log(this.getAttribute('dataId'));
        c.push(this.getAttribute('dataId'));
        console.log(c);
        //define cart as this array
        myLocalStorage.setItem('cart', JSON.stringify(c));
      }
      else{
        targetEvent.textContent = 'Add to Cart';
        if(count > 0){
          document.getElementById('cart-count').textContent = count -1;
        }
        else{
          document.getElementById('cart-count').textContent = 0;
        }
        targetEvent.setAttribute('onclick', "alert('Added to Cart!')");
        //set cart
        var c = JSON.parse(myLocalStorage.getItem('cart'));
        var x = 0;
        c.forEach(element=> {
          if(element === this.getAttribute('dataId').toString()){
            c.splice(x,1);
            //break;
            //console.log(c);
          }
          x = x+1;
        });
        console.log(this.getAttribute('dataId'));
        //c.push(this.getAttribute('dataId'));
        //console.log(c);
        myLocalStorage.setItem('cart', JSON.stringify(c));
        console.log(c);
      }

    });
    //button.textContent = 'Add to Cart';
    let style = document.createElement('style');
    style.textContent = '.price {' +
      'color: green;' +
      'font-size: 1.8em;' +
      'font-weight: bold;' +
      'margin: 0;' +
      '}' +
      '.product {' +
      'align-items: center;' +
      'background-color: white;' +
      'border-radius: 5px;' +
      'display: grid;' +
      'grid-template-areas: ' +
      "'image'" +
      "'title'" +
      "'price'" +
      "'add';" +
      'grid-template-rows: 67% 11% 11% 11%;' +
      'height: 450px;' +
      'filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));' +
      'margin: 0 30px 30px 0;' +
      'padding: 10px 20px;' +
      'width: 200px;' +
      '}' +
      '.product > button {' +
      'background-color: rgb(255, 208, 0);' +
      'border: none;' +
      'border-radius: 5px;' +
      'color: black;' +
      'justify-self: center;' +
      'max-height: 35px;' +
      'padding: 8px 20px;' +
      'transition: 0.1s ease all;' +
      '}' +
      '.product > button:hover {' +
      'background-color: rgb(255, 166, 0);' +
      'cursor: pointer;' +
      'transition: 0.1s ease all;' +
      '}' +
      '.product > img {' +
      'align-self: center;' +
      'justify-self: center;' +
      'width: 100%;' +
      '}' +
      '.title {' +
      'font-size: 1.1em;' +
      'margin: 0;' +
      'overflow: hidden;' +
      'text-overflow: ellipsis;' +
      'white-space: nowrap;' +
      '}' +
      '.title:hover {' +
      'font-size: 1.1em;' +
      'margin: 0;' +
      'white-space: wrap;' +
      'overflow: auto;' +
      'text-overflow: unset;' +
      '}'
      shadow.appendChild(style);
      shadow.appendChild(li);
      // li.appendChild(icon);
      // li.appendChild(info);
      
  }
  connectedCallback(){
    const shadow = this.shadowRoot;
    shadow.querySelector('img').setAttribute('src', this.getAttribute('img'));
    shadow.querySelector('img').setAttribute('alt', this.getAttribute('alt'));
    shadow.querySelector('.price').textContent = this.getAttribute('price');
    shadow.querySelector('.title').textContent = this.getAttribute('title');
    shadow.querySelector('.product').setAttribute('dataId',this.getAttribute('dataId'));
    //console.log(this.getAttribute('dataId'));
    shadow.querySelector('button').textContent = 'Add to Cart';
  }
  attributeChangedCallback(){
    const shadow = this.shadowRoot;
    var cart = JSON.parse(window.localStorage.getItem('cart'));
    cart.forEach(element => {
      if (element == this.getAttribute('dataId').toString()){
        shadow.querySelector('button').textContent = 'Remove from Cart';
        shadow.querySelector('button').setAttribute('onclick', "alert('Removed from Cart!')")
      }
    });

  }
}

customElements.define('product-item', ProductItem);