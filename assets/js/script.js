let products;

fetch('./products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    displayProducts(data); 
  });
  
function displayProducts(products) {
  let result = document.getElementById("products");

  for (let x in products) {
    result.innerHTML += `
        <div class="products">
            <h1 id="name">${products[x].name}</h1><br>
            <img src='assets/img/${products[x].image}' width="200px height="200px""/><br>
            <h3>Price: ${products[x].price}</h6>
            <button class="ibtn" onclick="${console.log("helo")}">Add To Chart</button>
        </div>        
    `;
  }
}

// function atc(key){
//   if(products[key] == null){
//       // copy product from list to cart
//       products[key].quantity = 1;
//   }

//   // this function calls a process which adds product to cart menu
//   reloadCart();
// }

let items = document.getElementById("items")

// Reload cart menu slide
function reloadCart(){
  items.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  products.forEach((value, key)=>{
      totalPrice = totalPrice + value.price;
      count = count + value.quantity;
      if(value != null){
          let newDiv = document.createElement('li');
          newDiv.innerHTML = `
              <div><img src="assets/img/products/${value.image}"/></div>
              <div>${value.name}</div>
              <div>${value.price.toLocaleString()}</div>
              <div>
                  <button onclick="updateQuantity(${key}, ${value.quantity - 1})">-</button>
                  <div class="count">${value.quantity}</div>
                  <button onclick="updateQuantity(${key}, ${value.quantity + 1})">+</button>
              </div>`;
              items.appendChild(newDiv);
      }
  })
  // total.innerText = totalPrice.toLocaleString();
  // quantity.innerText = count;
}

// Updates the product quantity inside the cart menu
function updateQuantity(key, quantity){
  if(quantity == 0){
      delete products[key];
  }else{
      products[key].quantity = quantity;
      products[key].price = quantity * prod[key].price;
  }
  reloadCart();
}



/* Set the width of the sidebar to 250px (show it) */
function openNav() {
  document.getElementById("mySidepanel").style.width = "60%";
}

/* Set the width of the sidebar to 0 (hide it) */
function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

document.getElementById("chart").addEventListener("click", openNav)
document.getElementById("closebtn").addEventListener("click", closeNav)