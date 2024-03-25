let divElm = null;
let totalPrice = 0
function getCostumerData() {
  let costumerWrapper = document.querySelector(".costumer-box__body");

  fetch(`https://coffee-shop-d2045-default-rtdb.firebaseio.com/Daily Costumers.json`)
    .then((res) => res.json())
    .then((data) => {
      let costumerItem = Object.entries(data);

      console.log(costumerItem);
      costumerItem.forEach((item) => {

        costumerID = item[0];
        console.log(item);

        let costumerItems = document.createElement("div");
        costumerItems.classList.add("costumer-item__wrapper");
        costumerItems.setAttribute('id', item[0]);

        let costumerBoxItem = document.createElement("div");
        costumerBoxItem.classList.add("costumer-box__item");

        let costumerId = document.createElement("p");
        costumerId.classList.add("costumer-item__id");
        costumerId.textContent = `صندلی ${item[1].desk}`;

        let costumerTime = document.createElement("p");
        costumerTime.classList.add("costumer-item__time");
        costumerTime.textContent = "شنبه 27 اذز";

        let costumerStatus = document.createElement("div");
        costumerStatus.classList.add("costumer-item__status");

        let showButton = document.createElement("button");
        showButton.classList.add("show-desk__status");
        showButton.textContent = "نمایش";
        showButton.onclick = () => showBasket(item[1].desk);

        let doneButton = document.createElement("button");
        doneButton.classList.add("costumer-item__status__btn");
        doneButton.textContent = "تسویه نشده";
        doneButton.onclick = () => doneCostumer(item[0]);
        fetchDailyCostumer(item[1].desk , item[1].time,item[1].price)


        costumerStatus.appendChild(showButton);
        costumerStatus.appendChild(doneButton);

        costumerBoxItem.appendChild(costumerId);
        costumerBoxItem.appendChild(costumerTime);
        costumerBoxItem.appendChild(costumerStatus);

        let basketDiv = document.createElement("div");
        basketDiv.classList.add("costumer-basket");
        basketDiv.setAttribute("id", item[1].desk);

        let ulElm = document.createElement("ul");
        ulElm.classList.add("costumer-basket__list");

        item[1].basket.forEach((basket) => {
          let liElm = document.createElement("li");
          liElm.classList.add("costumer-basket__item");

          let imgWrapper = document.createElement("div");
          imgWrapper.classList.add("basket-img__wrapper");

          let img = document.createElement("img");
          img.classList.add("basket-img");
          img.src = basket.img;
          img.alt = "";

          let basketContent = document.createElement("div");
          basketContent.classList.add("basket-content");

          let header = document.createElement("div");
          header.classList.add("basket-content__header");

          let title = document.createElement("h2");
          title.classList.add("basket-content__title");
          title.textContent = "کافه امیرکن";

          let description = document.createElement("p");
          description.classList.add("basket-content__des");
          description.textContent = "کافه رستوران پرک لورم ایپسوم متن ساختگی در عین حال پر محتوا بریا یسلل شسیبسیب سرل سلیب یسمئسیرسی سیمئلخقث رئحفث";

          let count = document.createElement("div");
          count.classList.add("basket-item__count");

          let countDes = document.createElement("p");
          countDes.classList.add("basket-item__count__des");
          countDes.textContent = " تعداد: 2";

          count.appendChild(countDes);

          header.appendChild(title);
          header.appendChild(description);

          basketContent.appendChild(header);
          basketContent.appendChild(count);

          imgWrapper.appendChild(img);

          liElm.appendChild(imgWrapper);
          liElm.appendChild(basketContent);

          ulElm.appendChild(liElm);
        });

        basketDiv.appendChild(ulElm);

        costumerItems.appendChild(costumerBoxItem);
        costumerItems.appendChild(basketDiv);

        costumerWrapper.appendChild(costumerItems);

        
      });
    })
    .catch((err) => console.log(err));
}





function showBasket(deskID) {
  let basket = document.getElementById(deskID);
  if (basket) {
    basket.classList.toggle("costumer-basket--active");
  }
}

let completeCostumerArray = [];
function doneCostumer(deskID) {
  console.log(deskID);
  let costumerItem = document.getElementById(deskID);
  costumerItem.textContent = 'تسویه شده '
  costumerItem.style.backgroundColor = 'green'
  if (costumerItem) {
    completeCostumerArray.push(costumerItem);
    console.log(completeCostumerArray.length);
    console.log(completeCostumerArray);
    costumerItem.remove();

    

    fetch(`https://coffee-shop-d2045-default-rtdb.firebaseio.com/Daily Costumers/${deskID}.json`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function fetchDailyCostumer (costumerID,costumerTime,costumerPrice){

  const costumerData = {
    Desk : costumerID,
    ReserveTime : costumerTime,
    Price : costumerPrice
  }

  fetch(`https://coffee-shop-d2045-default-rtdb.firebaseio.com/Complete Costumers.json`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(costumerData)
  }).then(res=>{
    console.log(res);
  }).then((data)=>{
    console.log(data);
  }).catch(err=>{
    console.log(err);
  })
}

function getCompeteCostumer (){
  const costumerListElem = document.querySelector('.sideBar-list')
  const costumerListFragment = document.createDocumentFragment();

  fetch(`https://coffee-shop-d2045-default-rtdb.firebaseio.com/Complete Costumers.json`,{
    method:'GET',
    headers:{
      'Content-Type':'application/json'
    },
  }).then(res=>res.json())
  .then((data)=>{
    let costumerDataArray = Object.entries(data);
    document.querySelector('.daily-status__des').textContent = costumerDataArray.length + ' مشتری'
      costumerDataArray.forEach(([_, costumer])=>{
        console.log(costumer);
      const costumerElem = document.createElement('li');
      costumerElem.classList.add('sideBar-list-item');

      const costumerDeskElem = document.createElement('p');
      costumerDeskElem.classList.add('sideBar-list-__costumerDesk');
      costumerDeskElem.textContent = ` صندلی ${costumer.Desk}`;

      const reserveTimeElem = document.createElement('p');
      reserveTimeElem.classList.add('sideBar-list-__reserveTime');
      reserveTimeElem.textContent = costumer.ReserveTime;

      const costumerPriceElem = document.createElement('p');
      costumerPriceElem.classList.add('sideBar-list-__costumerPrice');
      costumerPriceElem.textContent = costumer.Price;
 
      totalPrice += costumer.Price
      console.log(totalPrice);
      let totalPriceElem = document.querySelector('.totlaPrice')
      totalPriceElem.textContent = `مجموع تراکنش روزانه : t ${totalPrice}`

      costumerElem.append(costumerDeskElem, reserveTimeElem, costumerPriceElem);
      costumerListFragment.appendChild(costumerElem);
    })

    costumerListElem.appendChild(costumerListFragment);

  }).catch(err=>{
    console.log(err);
  })
}

function clearData (){
  
  let time =  moment().format('a h:mm');

  if (time === 'pm 12:00'){
    fetch(`https://coffee-shop-d2045-default-rtdb.firebaseio.com/Complete Costumers.json`,{
      method:'DELETE',
    }).then(res=>{
      console.log(res);
    }).then((data)=>{
      console.log(data);
    }).catch(err=>{
      console.log(err);
    })
  }
  
}



function showDateTime (){
  let time = document.querySelector('.current-time')
  time.textContent = moment().format('a h:mm');
  
  let date = document.querySelector('.current-date')
  date.textContent = moment().format("MMM Do");
}

let sideBar = document.querySelector('.sideBar__section')
function toggleSideBarFunc (){
  let sideBarToggleBtn = document.querySelector('.toggle-sideBar')
  sideBarToggleBtn.onclick = () => {
    sideBar.classList.toggle('sideBar__section--active')
  }
}

getCostumerData();
showDateTime()
toggleSideBarFunc()
getCompeteCostumer()
clearData()
