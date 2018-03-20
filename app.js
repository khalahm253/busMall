'use strict';


// An array to push all of our instances too.
Product.allProduct = [];

// Total clicks on the page. Tracked by the eventListener at the bottom of the page
Product.totalClick = 0;

// An array that hold the latest displayed number
Product.lastDisplayed = [];

//Access the Ul element from the DOM
var ulEl = document.getElementById('result');

//access the section element from the HTML.
var sectionEl = document.getElementById('productSection');

// Product constructor function that makes a property for the filepath, name of image, number of times displayed and number of clicks.
function Product(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  this.timeDisplayed = 0;
  this.vote = 0;
  Product.allProduct.push(this);
}
// instances for each picture
new Product('img/bag.jpg','bag');
new Product('img/banana.jpg','banana');
new Product('img/bathroom.jpg','bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg','chair');
new Product('img/cthulhu.jpg','cthulhu');
new Product('img/dog-duck.jpg','dog-duck');
new Product('img/dragon.jpg', 'dragon');
new Product('img/pen.jpg', 'pen');
new Product('img/pet-sweep.jpg', 'pet-sweep');
new Product('img/scissors.jpg','scissors');
new Product('img/shark.jpg','shark');
new Product('img/sweep.png','sweep');
new Product('img/tauntaun.jpg', 'tauntaun');
new Product('img/unicorn.jpg', 'unicorn');
new Product('img/usb.gif', 'usb');
new Product('img/water-can.jpg', 'water-can');
new Product('img/wine-glass.jpg', 'wine-glass');

// pull in all three image elements from the DOM
var leftPic = document.getElementById('left-pic');
var middlePic = document.getElementById('middle-pic');
var rightPic = document.getElementById('right-pic');

function randomProduct() {
  // pick a random number between 0 and the length of our array Product.allProduct.
  var randomLeft = Math.floor(Math.random() * Product.allProduct.length);
  var randomMiddle = Math.floor(Math.random() * Product.allProduct.length);
  var randomRight = Math.floor(Math.random() * Product.allProduct.length);

  // Test to make sure that neither random var above equal each other
  while (randomLeft === randomMiddle || randomLeft === randomRight || randomMiddle === randomRight || Product.lastDisplayed.includes(randomLeft) || Product.lastDisplayed.includes(randomMiddle) || Product.lastDisplayed.includes(randomRight)) {
    randomLeft = Math.floor(Math.random() * Product.allProduct.length);
    randomMiddle = Math.floor(Math.random() * Product.allProduct.length);
    randomRight = Math.floor(Math.random() * Product.allProduct.length);
  }

  Product.allProduct[randomLeft].timeDisplayed += 1;
  Product.allProduct[randomMiddle].timeDisplayed += 1;
  Product.allProduct[randomRight].timeDisplayed += 1;


  // Using the random number generated index through the Prodcts.allProducts array
  leftPic.src = Product.allProduct[randomLeft].filepath;
  leftPic.alt = Product.allProduct[randomLeft].name;

  middlePic.src = Product.allProduct[randomMiddle].filepath;
  middlePic.alt = Product.allProduct[randomMiddle].name;

  rightPic.src = Product.allProduct[randomRight].filepath;
  rightPic.alt = Product.allProduct[randomRight].name;

  //keep track of these 3 as the perviously displayed products.
  Product.lastDisplayed[0] = randomLeft;
  Product.lastDisplayed[1] = randomMiddle;
  Product.lastDisplayed[2] = randomRight;
}

function handleClick(e) {
  //incremeant totalclicks property with each click.

  Product.totalClick += 1;
  console.log(e.target.alt);

  for (var i in Product.allProduct) {
    if(e.target.alt === Product.allProduct[i].name) {
      Product.allProduct[i].vote += 1;
    }
  }

  if(Product.totalClick > 25) {
    sectionEl.addEventListener('click', handleClick);
    showResults();
  }else {
    randomProduct();
  }
}

function showResults() {
  for(var i in Product.allProduct) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProduct[i].name + ' has ' + Product.allProduct[i].vote + ' votes and was displayed ' + Product.allProduct[i].timeDisplayed + ' times.';
    ulEl.appendChild(liEl);
  }
}
sectionEl.addEventListener('click', handleClick);


randomProduct();