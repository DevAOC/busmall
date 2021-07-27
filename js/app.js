'use strict';
// ---------------------- Global Variables -----------------
const productList = [];
const currentImages = [];
const productSec = document.getElementById('productSection');
const resultsButton = document.getElementById('resultsButton');
let imagesToDisplay = 3;
let clickCount = 0;

// ---------------------- Constructor Function -------------
function Product(name, imagePath, imageId) {
  this.name = name;
  this.imagePath = imagePath;
  this.imageId = imageId;
  this.votes = 0;
}
// --------------------- Prototypes ---------------------

// -------------------- Global functions -----------------
function addProduct(name, imagePath, imageId) {
  const product = new Product(name, imagePath, imageId);
  if (!checkProductExistance(product)) {
    productList.push(product);
  }
}

function checkProductExistance(product) {
  let exists = false;
  for (let item of productList) {
    if(item.name === product.name) {
      exists = true;
    }
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

function getProducts() { //Add check for some array after
  for (let i = 0; i < imagesToDisplay; i++) {
    if (i === 0) {
      currentImages[i] = getRandomImage();
    } else {
      currentImages[i] = repeatImageCheck();
    }
  }
}

function repeatImageCheck() {
  let currentImage = getRandomImage();
  for (let checkIndex of currentImages) {
    if (currentImage !== checkIndex) {
      return currentImage;
    } else {
      currentImage = getRandomImage();
    }
  }
}

function renderAllProducts() {
  productSec.innerHTML('');
  for (let i = 0; i < currentImages; i++) {
    const articleElem = makeElem('article', productSec, null, null, currentImages[i].imageId);
    makeElem('h2', articleElem, currentImages[i].name, null, null);
    makeElem('img', articleElem, null, currentImages[i].imagePath, null);
  }
}

// function setImagesToDisplay(amount) {
//   imagesToDisplay = amount;
// }

function handleImageClick(event) {
  const articleId = event.target.id;
  clickCount++;
  for (let i = 0; i < currentImages.length; i++) {
    if (articleId === currentImages[i].imageId) {
      currentImages[i].votes++;
    }
  }
  if (clickCount !== 10) {
    getProducts();
    renderAllProducts();
  } else {
    productSec.innerHTML('');
    makeElem('button', productSec, 'View Results', null, 'resultsButton');
  }
}

function handleButtonClick() {
  productSec.innerHTML('');
  const resultsList = makeElem('ul', productSec, null, null, 'resultsList');
  for (let product of productList) {
    makeElem('li', resultsList, `${product.name}: ${product.votes}`);
  }
}
// -------------------- Listener -----------------------
productSec.addEventListener('click', handleImageClick);
resultsButton.addEventListener('click', handleButtonClick);
// ------------------ Function Calls ----------------

addProduct('R2D2 Luggage', '../img/bag.jpg', 'bag');
addProduct('Banana Slicer', '../img/banana.jpg', 'banana');
addProduct('iPad Stand', '../img/bathroom.jpg', 'bathroom');
addProduct('R2D2 Luggage', '../img/boots.jpg', 'boots');
addProduct('R2D2 Luggage', '../img/breakfast.jpg', 'breafast');
addProduct('R2D2 Luggage', '../img/bubblegum.jpg', 'bubblegum');
addProduct('R2D2 Luggage', '../img/chair.jpg', 'chair');
addProduct('R2D2 Luggage', '../img/cthulhu.jpg', 'cthulhu');
addProduct('R2D2 Luggage', '../img/dog-duck.jpg', 'dogDuck');
addProduct('R2D2 Luggage', '../img/dragon.jpg', 'dragon');
addProduct('R2D2 Luggage', '../img/pen.jpg', 'pen');
addProduct('R2D2 Luggage', '../img/pet-sweep.jpg', 'petSweep');
addProduct('R2D2 Luggage', '../img/scissors.jpg', 'scissors');
addProduct('R2D2 Luggage', '../img/shark.jpg', 'shark');
addProduct('R2D2 Luggage', '../img/sweep.jpg', 'sweep');
addProduct('R2D2 Luggage', '../img/tauntaun.jpg', 'tauntaun');
addProduct('R2D2 Luggage', '../img/unicorn.jpg', 'unicorn');
addProduct('R2D2 Luggage', '../img/water-can.jpg', 'waterCan');
addProduct('R2D2 Luggage', '../img/wine-glass.jpg', 'wineGlass');
