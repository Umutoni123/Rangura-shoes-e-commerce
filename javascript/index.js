var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}
/*  start of login and logout
const log= document.getElementById('log')
const res=  fetch(' http://localhost:3000/login')

window.addEventListener('DOMContentLoaded',function(){
  let token=localStorage.getItem('token')
  if(!token){
    console.log("no token")
  }
  else{
    document.getElementById('log').innerHTML='logout'
    log.addEventListener('DOMContentLoaded',function(){
      location.replace('../pages/login.html')
    })
  }
 
})
/*end of login and logout */
/*window.addEventListener('DOMContentLLoaded',function(){
  let tokken=localStorage.getItem('token')
  if(!token){
    console.log("no token")
  }
  else{
    let cart=document.getElementsByClassName('container__cloth')
    cart.addEventListener('click',function(){
      location.replace('../pages/register.html')
    })

  }
})*/
/* starting of cart 
const cart= document.querySelector('.container__cloth')
const gettingCart= async ()=>{
  const url=  ' http://localhost:3000/cart'
const res= await fetch(url)
const data= await res.json();
let template=''
data.forEach(element => {
    template+=`
    <div class="cart">
    <span>${element.name}</span>
    
    <span>${element.image}</span>
    <a href="/pages/cart.html?id=${element}"></a> 

  </div>      

    
    `
}); 
 cart.innerHTML=template;
}
window.addEventListener('DOMContentLoaded', () => gettingCart());
window.addEventListener('click',)





ending cart */
/* update cart*/

/*let cartids= document.querySelector('#cart')
let button=document.querySelector('.container__button')
const url= 'http://localhost:3000/cart'
const addCart= async() =>{
  const res= await fetch(url);
  const data= await res.json();
  let template='';
  data.forEach(element => {
    template+=`
    <div class="cart">
    <p><small>${element.cartn} </small></p>
    </div>
    
    `
    
  });
  cartids.innerHTML=template
}
const carts=async(cart_id)=>{
  const respo= await fetch(url+cart_id)
  const data=await respo.json()
  
  const res= await fetch(url+cart_id,{
  method:"PUT",
  body:JSON.stringify({
  cartn:data.carts+1
  }
  
  ),
  headers:{'content-type':'application/json'},
    });
    
  }


window.addEventListener('DOMContentLoaded', () => addCart());
*/


/* end update cart*/
/*products*/
/*const productList= document.querySelector('.container__cloth')
const url='http://localhost:3000/products'
const loadProducts= async()=>{
  const res= await fetch(url)
  const data= await res.json()
  let html='';
  data.forEach(product => {
    console.log(product)
    
    html+=`
    <div class="container__innerDiv">
                 
                  <img
                    class="container__imgContent"
                    src="images/women/blouse1.jpg"
                    alt=""
                  />
                  <h3 class="container__h3">blouse</h3>
                  <span class="container__dvSpan">3 pc(s)</span>
                </div>
                <div class="container__innerDiv1">
                  
                  <span class="container__span2">500</span>
                </div>
                <div class="container__button">
                 
                  <span class="container__span3">Cart</span>
                </div>
    
    `
    
  });
}


  window.addEventListener('DOMContentLoaded',()=>{loadProducts();})

 //load product function







/*products*/
// SELECT ELEMENTS
const productsEl = document.querySelector(".products-list");
const cartItemsEl = document.querySelector(".cart-items");
const subtotalEl = document.querySelector(".subtotal");
const totalItemsInCartEl = document.querySelector(".total-items-in-cart");
const url='http://localhost:3000/product'



// RENDER PRODUCTS
async function renderProdcuts() {
  const reso= await fetch(url)
  const products= await reso.json()
  products.forEach((product) => {
    productsEl.innerHTML += `
            <div class="container__cloth">
                <div class="container__innerDiv">
                 
                  <img class="container__imgContent" src="${product.imgSrc}" alt=""/>
                  <h3 class="container__h3">${product.name}</h3>
                  <span class="container__dvSpan">${product.description}</span>
                </div>
                <div class="container__innerDiv1">
                 
                  <span class="container__span2">$${product.price}</span>
                </div>
                <div class="add-to-cart" onclick="addToCart(${product.id})">
                  <i class="fas fa-shopping-cart" ></i><span>add to cart</span>
                    </div>
              </div>
        `;
  });
  
}
renderProdcuts();

// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

// ADD TO CART
 async function addToCart(id) {
  const reso= await fetch(url)
  const products= await reso.json()
  // check if prodcut already exist in cart
  if (cart.some((item) => item.id === id)) {
    changeNumberOfUnits("plus", id);
  } else {
    const item = products.find((product) => product.id === id);

    cart.push({
      ...item,
      numberOfUnits: 1,
    });
  }

  updateCart();
}

// update cart
function updateCart() {
  renderCartItems();
  renderSubtotal();
 

  // save cart to local storage
  localStorage.setItem("CART", JSON.stringify(cart));
}

// calculate and render subtotal
function renderSubtotal() {
  
  let totalPrice = 0,
    totalItems = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.numberOfUnits;
    totalItems += item.numberOfUnits;
  });

  subtotalEl.innerHTML = `Subtotal (${totalItems} items): $${totalPrice.toFixed(2)}`;
  totalItemsInCartEl.innerHTML = totalItems;
}

// render cart items
function renderCartItems() {
  cartItemsEl.innerHTML = ""; // clear cart element
  cart.forEach((item) => {
    cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info" onclick="removeItemFromCart(${item.id})">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="unit-price">
                <small>$</small>${item.price}
            </div>
            <div class="units">
                <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})">-</div>
                <div class="number">${item.numberOfUnits}</div>
                <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})">+</div>           
            </div>
        </div>
      `;
  });
}

// remove item from cart
function removeItemFromCart(id) {
  cart = cart.filter((item) => item.id !== id);

  updateCart();
}

// change number of units for an item
function changeNumberOfUnits(action, id) {
  cart = cart.map((item) => {
    let numberOfUnits = item.numberOfUnits;

    if (item.id === id) {
      if (action === "minus" && numberOfUnits > 1) {
        numberOfUnits--;
      } else if (action === "plus" && numberOfUnits < item.instock) {
        numberOfUnits++;
      }
    }

    return {
      ...item,
      numberOfUnits,
    };
  });

  updateCart();
}
/**********************************************************************************************************/
/*****************************search bar******************************************************************/
/********************************************************************************************************/

