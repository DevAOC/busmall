'use strict';
// ---------------------- Global Variables -----------------
const productList = [];
const currentImages = [];
const previousImages = [];
const productSec = document.getElementById('productSection');
const chartSec = document.getElementById('chartSection');
let resultsButton;
let imagesToDisplay = 3;
let clickCount = 0;
const productNames = [];
const productVotes = [];
const productColors = [];
const productsSeen = [];
const productPercentages = [];
const chartData = [
  {
    id: 'voteChart',
    chartOptions: {
      type: 'doughnut',
      data: {
        labels: productNames,
        datasets: [
          {
            data: productVotes,
            backgroundColor: productColors,
            borderColor: productColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Votes per Product',
            font: { size: 20 },
          },
        },
      },
    },
  },
  {
    id: 'timesSeenChart',
    chartOptions: {
      type: 'doughnut',
      data: {
        labels: productNames,
        datasets: [
          {
            data: productsSeen,
            backgroundColor: productColors,
            borderColor: productColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Times Seen',
            font: { size: 20 },
          },
        },
      },
    },
  },
  {
    id: 'percentageChart',
    chartOptions: {
      type: 'doughnut',
      data: {
        labels: productNames,
        datasets: [
          {
            data: productPercentages,
            backgroundColor: productColors,
            borderColor: productColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Percent of Votes to Times Seen',
            font: { size: 20 },
          },
        },
      },
    },
  },
];

// ---------------------- Constructor Function -------------
function Product(name, imagePath, imageId) {
  this.name = name;
  this.imagePath = imagePath;
  this.imageId = imageId;
  this.votes = 0;
  this.timesSeen = 0;
  this.color;
}
// --------------------- Prototypes ---------------------
Product.prototype.renderProduct = function (parent) {
  makeElem('h3', parent, this.name, null, this.imageId);
  makeElem('img', parent, null, this.imagePath, this.imageId);
};
Product.prototype.assignColor = function () {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  this.color = color;
};
// -------------------- Global functions -----------------
function addProduct(name, imagePath, imageId) {
  const product = new Product(name, imagePath, imageId);
  if (!checkProductExistance(product)) {
    productList.push(product);
  }
}

function checkProductExistance(product) {
  let exists = false;
  if (productList.includes(product)) {
    exists = true;
  }
  return exists;
}

function makeElem(tagName, parent, textContent, imageSrc, elemId) {
  let elem = document.createElement(tagName);
  // const elemColor = '#f00';
  if (textContent) {
    elem.textContent = textContent;
  }
  if (imageSrc) {
    elem.setAttribute('src', imageSrc);
  }
  if (elemId) {
    elem.setAttribute('id', elemId);
  }
  // if (elemColor) {
  // elem.setAttribute('style', `background-color: ${elemColor}`);
  // }
  parent.appendChild(elem);
  return elem;
}

function getRandomImage() {
  const imageIndex = Math.floor(Math.random() * productList.length);
  return productList[imageIndex];
}

function getProducts() {
  for (let i = 0; i < imagesToDisplay; i++) {
    currentImages[i] = repeatImageCheck();
  }
  for (let i = 0; i < currentImages.length; i++) {
    previousImages[i] = currentImages[i];
  }
}

function repeatImageCheck() {
  let currentImage = getRandomImage();
  while (currentImages.includes(currentImage)) {
    currentImage = getRandomImage();
    while (previousImages.includes(currentImage)) {
      currentImage = getRandomImage();
    }
  }
  return currentImage;
}

function renderAllProducts() {
  getProducts();
  const ulElem = makeElem('ul', productSec);
  for (let image of currentImages) {
    const liElem = makeElem('li', ulElem);
    image.renderProduct(liElem);
  }
}

// function setImagesToDisplay(amount) {
//   imagesToDisplay = amount;
// }

// ------------------ Local Storage Functions-------------

function putProductsInStorage() {
  let stringifiedArray = JSON.stringify(productList);
  localStorage.setItem('products', stringifiedArray);
}

function getProductsFromStorage() {
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    let parsedStorage = JSON.parse(storedProducts);
    console.log('Parsed Storage:::::', parsedStorage);
    for (let product of parsedStorage) {
      let newProduct = new Product(product.name, product.imagePath, product.imageId);
      newProduct.votes = product.votes;
      newProduct.timesSeen = product.timesSeen;
      newProduct.color = product.color;
      productList.push(newProduct);
    }
  }
}

// ------------------- Chart Specific Functions -----------------
function renderChartElems() {
  getProductData();
  const ulElem = makeElem('ul', chartSec);
  chartData.forEach(({ id, chartOptions }) => {
    const liElem = makeElem('li', ulElem);
    makeElem('canvas', liElem, null, null, id);
    renderChart(id, chartOptions);
  });
}

function getProductData() {
  for (let product of productList) {
    productNames.push(product.name);
    productVotes.push(product.votes);
    productColors.push(product.color);
    productsSeen.push(product.timesSeen);
    productPercentages.push((product.votes / product.timesSeen) * 100);
  }
}

function renderChart(id, options) {
  const context = document.getElementById(id).getContext('2d');
  new Chart(context, options);
}
// -------------------- Handlers ----------------------
function handleImageClick(event) {
  event.preventDefault();
  const articleId = event.target.id;
  clickCount++;
  for (let image of currentImages) {
    if (articleId === image.imageId) {
      image.votes++;
    }
    image.timesSeen++;
  }
  if (clickCount !== 5) {
    productSec.innerHTML = '';
    makeElem('h2', productSec, 'Which do you prefer?');
    renderAllProducts();
    putProductsInStorage();
  } else {
    productSec.removeEventListener('click', handleImageClick);
    resultsButton = makeElem('button', productSec, 'View Results', null, 'resultsButton');
    resultsButton.addEventListener('click', handleButtonClick);
  }
}

function handleButtonClick() {
  resultsButton.removeEventListener('click', handleButtonClick);
  productSec.style = 'display: none';
  chartSec.style = 'display: grid';
  const resultsList = makeElem('ul', chartSec, null, null, 'resultsList');
  for (let product of productList) {
    makeElem('li', resultsList, `${product.name}: ${product.votes}`);
  }
  renderChartElems();
}

// -------------------- Listener -----------------------
productSec.addEventListener('click', handleImageClick);
// ------------------ Function Calls ----------------

if (!localStorage.products) {
  addProduct('R2D2 Luggage', '../img/bag.jpg', 'bag');
  addProduct('Banana Slicer', '../img/banana.jpg', 'banana');
  addProduct('iPad Stand', '../img/bathroom.jpg', 'bathroom');
  addProduct('Open Toe Boots', '../img/boots.jpg', 'boots');
  addProduct('Breakfast Machine', '../img/breakfast.jpg', 'breafast');
  addProduct('Meatball Bubblegum', '../img/bubblegum.jpg', 'bubblegum');
  addProduct('Convexed-seat Chair', '../img/chair.jpg', 'chair');
  addProduct('Cthulhu Action-figure', '../img/cthulhu.jpg', 'cthulhu');
  addProduct('Duck muzzle', '../img/dog-duck.jpg', 'dogDuck');
  addProduct('Can of Dragon Meat', '../img/dragon.jpg', 'dragon');
  addProduct('Pen Utensils', '../img/pen.jpg', 'pen');
  addProduct('Mop Paws', '../img/pet-sweep.jpg', 'petSweep');
  addProduct('Pizza Scissors', '../img/scissors.jpg', 'scissors');
  addProduct('Shark Sleeping Bag', '../img/shark.jpg', 'shark');
  addProduct('Jammy-Mop', '../img/sweep.png', 'sweep');
  addProduct('Tauntaun Sleeping Bag', '../img/tauntaun.jpg', 'tauntaun');
  addProduct('Can of Unicorn Meat', '../img/unicorn.jpg', 'unicorn');
  addProduct('Self Watering Can', '../img/water-can.jpg', 'waterCan');
  addProduct('Awkward Wine Glass', '../img/wine-glass.jpg', 'wineGlass');
  for (let product of productList) {
    product.assignColor();
  }
  renderAllProducts();
} else {
  getProductsFromStorage();
  renderAllProducts();
}
