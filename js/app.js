'use strict';
// ---------------------- Global Variables -----------------
const productList = [];
const currentImages = [];
const productSec = document.getElementById('productSection');
let imagesToDisplay = 3;
let clickCount = 0;

// ---------------------- Constructor Function -------------
function Product(name, imagePath) {
  this.name = name;
  this.imagePath = imagePath;
  this.votes = 0;
}
// --------------------- Prototypes ---------------------
Product.prototype.renderProduct = function(img, h2) {
  img.src = this.imagePath;
  h2.textContent = this.name;
};
// -------------------- Global functions -----------------
function makeElem(tagName, parent, textContent, imageSrc) {
  let elem = document.createElement(tagName);
  if (textContent) {
    elem.textContent = textContent;
  }
  if (imageSrc) {
    elem.setAttribute('src', imageSrc);
  }
  parent.appendChild(elem);
  return elem;
}
function getProducts() {
  let currentImage = Math.floor(Math.random() * productList.length);
  for (let selectedImages = 0; selectedImages < imagesToDisplay; selectedImages++) {
    if (selectedImages === 0 || ) {

    }
    // let currentImage = Math.floor(Math.random() * productList.length);
    // for (let productListIndex = 0; productListIndex < productList.length; productListIndex++) {
    //   if() {
    //     currentlList[selectedImages] = currentImage;
    //   }
    // }
  }
}
function repeatCheck() {
  
}
function renderAllProducts() {
  productSec.innerHTML('');
  for (let image of currentImages) {
    const articleElem = makeElem('article', productSec, null);
    makeElem('h2', articleElem, image.name);
    makeElem('img', articleElem, null, image.imagePath);
  }
}
// function setimagesToDisplay() {
  
// }
// -------------------- Listener -----------------------

// ------------------ Function Calls ----------------
