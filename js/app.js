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
  makeElem('h2', parent, this.name, null, this.imageId);
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
  if(productList.includes(product)) {
    exists = true;
  }
  return exists;
}

function makeElem(tagName, parent, textContent, imageSrc, elemId) {
  let elem = document.createElement(tagName);
  if (textContent) {
    elem.textContent = textContent;
  }
  if (imageSrc) {
    elem.setAttribute('src', imageSrc);
  }
  if (elemId) {
    elem.setAttribute('id', elemId);
  }
  parent.appendChild(elem);
  return elem;
}

function getRandomImage() {
  const imageIndex = Math.floor(Math.random() * productList.length);
  return productList[imageIndex];
}

function getProducts() { //Add check for different than previous array
  for (let i = 0; i < imagesToDisplay; i++) {
    if (i < 0) {
      currentImages[i] = getRandomImage();
    } else {
      currentImages[i] = repeatImageCheck();
    }
  }
  for (let i = 0; i < currentImages.length; i++) {
    previousImages[i] = currentImages[i];
  }
}

function repeatImageCheck() {
  let currentImage = getRandomImage();
  restartLoop:
  for (let i = 0; i < currentImages.length; i++) {
    if (currentImages.includes(currentImage)) {
      currentImage = getRandomImage();
      continue restartLoop;
    }
  }
  return currentImage;
}

function renderAllProducts() {
  getProducts();
  const articleElem = makeElem('article', productSec, null, null, null);
  for (let image of currentImages) {
    image.renderProduct(articleElem);
  }
}

// function setImagesToDisplay(amount) {
//   imagesToDisplay = amount;
// }

// ------------------- Chart Specific Functions -----------------
function renderChartElems() {
  for (let i = 1; i < 4; i++) {
    makeElem('canvas', chartSec, null, null, `chart${i}`);
  }
  renderCharts();
}

function getProductData() {
  for (let product of productList) {
    productNames.push(product.name);
    productVotes.push(product.votes);
    productColors.push(product.color);
    productsSeen.push(product.timesSeen);
    productPercentages.push(product.votes / product.timesSeen * 100);
  }
}

function renderCharts() {
  getProductData();
  renderVoteChart();
  renderTimesSeenChart();
  renderPercentageChart();
}

function renderVoteChart() {
  const context = document.getElementById('chart1').getContext('2d');
  const voteChart = new Chart(context, {
    type: 'doughnut',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes per Product',
        data: productVotes,
        backgroundColor: productColors,
        borderColor: productColors,
        borderWidth: 1
      }]
    },
    options: {
      // scales: {
      //   y: {
      //     beginAtZero: true
      //   }
      // }
    }
  });
}

function renderTimesSeenChart() {
  const context = document.getElementById('chart2').getContext('2d');
  const timesSeenChart = new Chart(context, {
    type: 'doughnut',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Times Seen',
        data: productsSeen,
        backgroundColor: productColors,
        borderColor: productColors,
        borderWidth: 1
      }]
    },
    options: {
      // scales: {
      //   y: {
      //     beginAtZero: true
      //   }
      // }
    }
  });
}

function renderPercentageChart() {
  const context = document.getElementById('chart3').getContext('2d');
  const percentageChart = new Chart(context, {
    type: 'doughnut',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Percent of Votes to Times Seen',
        data: productPercentages,
        backgroundColor: productColors,
        borderColor: productColors,
        borderWidth: 1
      }]
    },
    options: {
      // scales: {
      //   y: {
      //     beginAtZero: true
      //   }
      // }
    }
  });
}
// -------------------- Handlers ----------------------
function handleImageClick(event) {
  const articleId = event.target.id;
  productSec.innerHTML = '';
  clickCount++;
  for (let image of currentImages) {
    if (articleId === image.imageId) {
      image.votes++;
    }
    image.timesSeen++;
  }
  if (clickCount !== 10) {
    renderAllProducts();
  } else {
    productSec.removeEventListener('click', handleImageClick);
    resultsButton = makeElem('button', productSec, 'View Results', null, 'resultsButton');
    resultsButton.addEventListener('click', handleButtonClick);
  }
}

function handleButtonClick() {
  resultsButton.removeEventListener('click', handleButtonClick);
  productSec.innerHTML = '';
  const resultsList = makeElem('ul', productSec, null, null, 'resultsList');
  for (let product of productList) {
    makeElem('li', resultsList, `${product.name}: ${product.votes}`, null, null);
  }
  renderChartElems();
}

// -------------------- Listener -----------------------
productSec.addEventListener('click', handleImageClick);
// ------------------ Function Calls ----------------
// Make this dynamic
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
