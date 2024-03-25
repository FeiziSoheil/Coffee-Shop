let navIcons = document.querySelectorAll(".mobile__nav-item");

let allProducts = [
  {
    id: 1,
    title: "item 1",
    price: "5",
    img: "images/image/list-item1.jpg",
    count: 1,
    category: "coffee",
  },
  {
    id: 2,
    title: "item 2",
    price: "15",
    img: "images/image/list-item2.jpg",
    count: 1,
    category: "coffee",
  },
  {
    id: 3,
    title: "item 3",
    price: "20",
    img: "images/image/list-item3.jpg",
    count: 1,
    category: "coffee",
  },
  {
    id: 4,
    title: "item 4",
    price: "10",
    img: "images/image/list-item4.jpg",
    count: 1,
    category: "deserts",
  },
  {
    id: 5,
    title: "item 5",
    price: "5",
    img: "images/image/list-item5.jpg",
    count: 1,
    category: "deserts",
  },
  {
    id: 6,
    title: "item 6",
    price: "50",
    img: "images/image/list-item6.jpg",
    count: 1,
    category: "alcohol",
  },
  {
    id: 7,
    title: "item 7",
    price: "5",
    img: "images/image/list-item7.jpg",
    count: 1,
    category: "alcohol",
  },
  {
    id: 8,
    title: "item 8",
    price: "15",
    img: " images/image/list-item8.jpg",
    count: 1,
    category: "alcohol free",
  },
  {
    id: 9,
    title: "item 9",
    price: "20",
    img: "images/image/list-item9.jpg",
    count: 1,
    category: "alcohol-free",
  },
  {
    id: 10,
    title: "item 10",
    price: "20",
    img: "images/image/list-item10.jpg",
    count: 1,
    category: "breakfast",
  },
  {
    id: 11,
    title: "item 11",
    price: "5",
    img: "images/image/list-item11.jpg",
    count: 1,
    category: "breakfast",
  },
  {
    id: 12,
    title: "item 12",
    price: "50",
    img: "images/image/list-item12.jpg",
    count: 1,
    category: "breakfast",
  },
];

const totalPriceElem = document.querySelector('.basket__totallPrice')
let basketArray = []

let productsContainer = document.querySelector(".menu__list");
function renderProducts(productsToRender = allProducts) {
  productsContainer.innerHTML = "";
  productsToRender.forEach((product) => {
    productsContainer.innerHTML += `
        <li class="list_item">
                <div class="item__img-wrapper">
                  <img
                    src="${product.img}"
                    alt=""
                    class="item__img"
                  />
                </div>
                <div class="item__content-wrapper">
                  <div class="item__content">
                    <h3 class="item__content-title">Caffè Americano</h3>
                    <p class="item__content-des">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div class="item__content-details">
                    <p class="item__content-price">${product.price}</p>
                    <button class="item__content-add" onclick='addToCard(${product.id})'>+</button>
                  </div>
                </div>
              </li>
        `;

  });
}
renderProducts(allProducts);
function activeNavIcon() {
  for (let navItem of navIcons) {
    navItem.addEventListener("click", (event) => {
      let targetNav = event.target;
      let offsetLeft = targetNav.offsetLeft;
      offsetLeft = offsetLeft - 12;

      let navStatus = document.querySelector(".actiive_nav");
      navStatus.style.left = offsetLeft + "px";

      let navItemID = targetNav.id;
      getNavStatus(navItemID);
    });
  }
}

function getNavStatus(navItemID) {
  let sectionPanel = document.querySelectorAll(".section-panel");
  sectionPanel.forEach((panel) => {
    if (panel.id === navItemID) {
      console.log(panel);
      panel.classList.add("active-section");
    } else {
      panel.classList.remove("active-section");
    }
  });
}

function filterProducts() {
  let tagProducts = document.querySelectorAll(".category__tag");
  tagProducts.forEach((tag) => {
    let tagId = tag.dataset.id;
    tag.addEventListener("click", () => {
      console.log(tagId);
      if (tagId === "All") {
        console.log(allProducts);
        renderProducts(allProducts);
      } else {
        let filteredProducts = allProducts.filter(
          (product) => product.category === tagId
        );
        renderProducts(filteredProducts);
      }

      document
        .querySelector(".category__tag-active")
        .classList.remove("category__tag-active");
      tag.classList.add("category__tag-active");
    });
  });
  let searchInput = document.querySelector(".search__input");
  searchInput.addEventListener("keydown", (event) => {
    let searchValue = event.target.value;
    searchValue = searchValue.trim().toLowerCase();
    console.log(searchValue);
    if (event.keyCode === 13) {
      let searchFiltered = allProducts.filter((product) => {
        return product.category.includes(searchValue);
      });
      renderProducts(searchFiltered);
    }
  });
}

function addToCard(productID){
  let filterProducts = allProducts.find(product => product.id === productID);
  if(filterProducts){
    let exitingBasketItem = basketArray.find(product => product.id === productID)
    if(exitingBasketItem){
      exitingBasketItem.count++
    }else{
      basketArray.push({...filterProducts,count: 1})
    }
    renderBasket();
    updateTotalPrice()
  }
}

function minesCount(itemID) {
  const index = basketArray.findIndex(item => item.id === itemID);
  if (index !== -1) {
    const item = basketArray[index];
    if (item.count <= 1) {
      basketArray.splice(index, 1);
    } else {
      item.count--;
    }
    renderBasket();
    updateTotalPrice();
  }
}


let totalPrice;
function updateTotalPrice (){
  totalPrice = 0
  basketArray.forEach((product,index) =>{
    totalPrice += (Number(product.price)*product.count)
  });
  totalPriceElem.innerHTML = totalPrice
}



function renderBasket (){
  let basketWrapper = document.querySelector('.basket__list')
  basketWrapper.innerHTML = ""
  basketArray.forEach(product => {
    basketWrapper.insertAdjacentHTML('beforeend' ,`
    <li class="basket__list-item">
                <div class="BasketItem__img-wrapper">
                  <img src="${product.img}" alt="" class="BasketItem__img"/>
                </div>
                <div class="BasketItem__content-wrapper">
                  <div class="BasketItem__content">
                    <h3 class="BasketItem__content-title">Coffee Americano</h3>
                    <p class="BasketItem__content-des">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                  </div>
                  <div class="BasketItem__content-details">
                    <p class="BasketItem__content-prise">${product.price} t</p>
                    <div class="add__mines-wrapper">
                      <button class="BasketItem__content-remove" onclick='minesCount(${product.id})'>-</button>
                      <p class="BasketItem__content-quantity">${product.count}</p>
                      <button class="BasketItem__content-add" onclick='addToCard(${product.id})'>+</button>
                    </div>
                  </div>
                </div>
              </li>
    `)  
    saveBasketToLocalStorage()
  })
}




function saveBasketToLocalStorage() {
  localStorage.setItem('basketArray', JSON.stringify(basketArray));
}

function getBasketFromLocalStorage() {
  const storedBasket = localStorage.getItem('basketArray');
  if (storedBasket) {
    basketArray = JSON.parse(storedBasket);
    renderBasket();
    updateTotalPrice();
  }
}
function saveThemeToLocalStorage(theme) {
  localStorage.setItem('theme', theme);
}

// Function to get theme from localStorage
function getThemeFromLocalStorage() {
  const theme = localStorage.getItem('theme');
  if (theme) {
    document.querySelector("html").classList.toggle("theme--active", theme === 'dark');
  }
}
function saveToLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
function getFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
function getAndIncrementClickCount() {
  let clickCount = getFromLocalStorage('clickCount') || 0;
  clickCount++;
  saveToLocalStorage('clickCount', clickCount);
  return clickCount;
}
function getAndIncrementClickCount() {
  let clickCount = getFromLocalStorage('clickCount') || 0;
  clickCount++;
  saveToLocalStorage('clickCount', clickCount);
  return clickCount;
}




let urlSearchParam = new URLSearchParams(location.search);
let deskID = urlSearchParam.get("id");

// Function to submit the customer's basket to Firebase
function submitCustomerBasket() {
  const customerBasket = {
    desk: deskID,
    time: moment().format('MMMM Do, h:mm:ss a'),
    basket: basketArray,
    price: totalPrice,
  };

  // POST request to Firebase to store the customer's basket
  fetch('https://coffee-shop-d2045-default-rtdb.firebaseio.com/Daily Costumers.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(customerBasket)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to submit customer basket');
    }
    return response.json();
  })
  .then(data => {
    console.log('Customer basket submitted successfully:', data);
  })
  .catch(error => {
    console.error('Error submitting customer basket:', error);
  });
}

// Function to update the customer's basket in Firebase
function updateCustomerBasket(customerID) {
  const updatedBasket = {
    desk: deskID,
    time: moment().format('MMMM Do, h:mm:ss a'),
    basket: basketArray,
    price: totalPrice,
  };

  // PUT request to Firebase to update the customer's basket
  fetch(`https://coffee-shop-d2045-default-rtdb.firebaseio.com/Daily Costumers/${customerID}.json`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedBasket)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to update customer basket');
    }
    return response.json();
  })
  .then(data => {
    console.log('Customer basket updated successfully:', data);
  })
  .catch(error => {
    console.error('Error updating customer basket:', error);
  });
}

// Event listener for submitting the customer's basket
const submitBasketBtn = document.querySelector('.totalPrice_card');
let clickCount = 0 ;
submitBasketBtn.addEventListener('click', event => {
  const clickCount = getAndIncrementClickCount();
  if(basketArray.length === 0) {
    alert("سبد خرید شما خالی است ");
    event.preventDefault();
  } else if(clickCount === 1) {
    submitCustomerBasket();
  } else {
    alert("لطفا سبد خیر خود را بروزرسانی کنید ");
    event.preventDefault();
  }
});

// Event listener for updating the customer's basket
const updateBasketBtn = document.querySelector('.updateBasket-wrapper');
updateBasketBtn.addEventListener('click', event => {
  event.preventDefault();
  getData(); // Assuming this function retrieves customer ID
});

// Function to retrieve customer ID and update the basket
function getData() {
  fetch('https://coffee-shop-d2045-default-rtdb.firebaseio.com/Daily Costumers.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch customer data');
    }
    return response.json();
  })
  .then(data => {
    const customerId = Object.keys(data)[0]; // Assuming only one customer for simplicity
    updateCustomerBasket(customerId);
  })
  .catch(error => {
    console.error('Error fetching customer data:', error);
  });
}

  
const checkboxBtn = document.getElementById("checkboxBtn");
checkboxBtn.addEventListener("click", () => {
  document.querySelector("html").classList.toggle("theme--active");
  saveThemeToLocalStorage(document.querySelector("html").classList.contains("theme--active") ? 'dark' : 'light');
});


let callIcon = document.querySelector('.contact__call-icon')
callIcon.addEventListener('click',event=>{
  window.location.href = 'tel:09142895825';
})


function adminLogin (){

  let userNameInputElem = document.querySelector('.userName')
  let passInputElem = document.querySelector('.pass') 
  let loginBTN = document.querySelector('.formLogin-btn')
  let userNameValue 
  let passValue 

  userNameInputElem.addEventListener('keydown',event=>{
    userNameValue = event.target.value
  })

  passInputElem.addEventListener('keydown',event=>{
    passValue = event.target.value
    console.log(passValue);
  })

  loginBTN.addEventListener('click',event=>{
    // event.preventDefault()
    console.log(passValue,userNameValue);

    if(userNameValue === 'admin' && passValue == '123456'){
      window.location.href = 'admin_panel.html'
    }else{
      alert('لطفا اطلاعات را بررسی کنید')
  }
  })
}

function showLoginModal(){
  let loginBtn = document.querySelector('.login-btn')
  let loginModal = document.querySelector('.login-modal')
  let menuSection = document.querySelector('main')
  loginBtn.addEventListener('click',event=>{
    loginModal.classList.toggle('login-modal-active')
    menuSection.classList.toggle('menu__section-blur')
  })
}

function initializeApp() {
  adminLogin()
  getBasketFromLocalStorage()
  getThemeFromLocalStorage();
  activeNavIcon();
  filterProducts();
  showLoginModal()
}

window.onload = ()=>{
  initializeApp()
}



