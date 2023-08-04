
let products;
let prod;
let listcarts = [];
let items = document.getElementById("items");
let newDiv = document.getElementById("newdiv")
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');
fetch('./products.json')
.then(response => response.json())
.then(data => {
  products = data;
    displayProducts(data); 
  });
  
  
  /* Set the width of the sidebar to 250px (show it) */
  function openNav() {
    document.getElementById("mySidepanel").style.width = "70%";
  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
  }
  
  document.getElementById("chart").addEventListener("click", openNav)
  document.getElementById("closebtn").addEventListener("click", closeNav)
  
  function displayProducts(products) {
  let result = document.getElementById("products");
    prod = products
    
  products.forEach((value,key) => {
    result.innerHTML += `
        <div class="products">
            <h1 id="name">${products[key].name}</h1><br>
            <img src='assets/img/${products[key].image}' width="200px height="200px""/><br>
            <h3>Price: ${products[key].price}</h6>
            <button class="ibtn" onclick="addtocart(${key})">Add To Chart</button>
        </div>        
    `;
  })
}

function addtocart(key){
  const product = products[key]
  if(listcarts[key] == null){
    listcarts.push({
      ...product,
      quantity: 1
    });
  }
  else{
    listcarts[key].quantity += 1
  }
  
  // this function calls a process which adds product to cart menu
  reloadCart();
}


// Reload cart menu slide
function reloadCart() {

    
    newDiv.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listcarts.forEach((value, key)=>{
        totalPrice += value.price * value.quantity;
        count += value.quantity;
        if(value != null){
            newDiv.innerHTML += `
            <div id="conts">
            <div id="conts1">
            <div id="imgs"><img src="assets/img/${value.image}"/></div>
            <div id="names"><h1>${value.name}</h1></div>
            <div id="pric">
                <h2>${value.price} * ${value.quantity}</h2>
                <div id="btnss">
                  <button onclick="updateQuantity(${key}, ${value.quantity - 1})" id="inc">-</button>
                  <div class="count" id="cnt">${value.quantity}</div>
                  <button onclick="updateQuantity(${key}, ${value.quantity + 1})" id="dec">+</button>
                </div>
            </div>
            </div>
            
            </div>`;
            }
            total.innerText = totalPrice.toLocaleString();
            quantity.innerText = count;
    })
    
}

// Updates the product quantity inside the cart menu
function updateQuantity(key, quantity){
    if(quantity == 0){
        delete listcarts[key];
    }else{
        listcarts[key].quantity = quantity;
        
    }
    
    reloadCart();
}
