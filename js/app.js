'use strict';
// ---------------------- Global Variables -----------------
const productList = [];
const currentImages = [];
// const previousImages = [];
const productSec = document.getElementById('productSection');
let resultsButton;
let imagesToDisplay = 3;
let clickCount = 0;

// ---------------------- Constructor Function -------------
function Product(name, imagePath, imageId) {
  this.name = name;
  this.imagePath = imagePath;
  this.imageId = imageId;
  this.votes = 0;
  this.timesSeen = 0;
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

function getProducts() { //Add check for same array after
  for (let i = 0; i < imagesToDisplay; i++) {
    if (i === 0) {
      currentImages[i] = getRandomImage();
    } else {
      currentImages[i] = repeatImageCheck(i);
    }
  }
  // for (let i = 0; i < currentImages.length; i++) {
  //   previousImages[i] = currentImages[i];
  // }
}
// Not working properly
function repeatImageCheck() {
  let currentImage = getRandomImage();
  for (let i = 0; i < currentImages.length; i++) {
    console.log(currentImage);
    if (currentImage.name === currentImages[i].name) {
      currentImage = getRandomImage();
      i = 0;
    }
  }
  return currentImage;
}

function renderAllProducts() {
  for (let image of currentImages) {
    const articleElem = makeElem('article', productSec, null, null, null);
    makeElem('h2', articleElem, image.name, null, image.imageId);
    makeElem('img', articleElem, null, image.imagePath, image.imageId);
  }
}

// function setImagesToDisplay(amount) {
//   imagesToDisplay = amount;
// }

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
    getProducts();
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
    makeElem('li', resultsList, `${product.name}: ${product.votes}`);
  }
}
// -------------------- Listener -----------------------
productSec.addEventListener('click', handleImageClick);
// ------------------ Function Calls ----------------

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

getProducts();
renderAllProducts();
