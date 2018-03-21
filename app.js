'use strict';


// An array to push all of our image instances too.
Product.allProduct = [];

// Total clicks on the page. Tracked by the eventListener at the bottom of the page
Product.totalClick = 0;

// An array that hold the latest displayed images.
Product.lastDisplayed = [];
// An array of integers thats hold the number of votes for each product.
var productVote = [];
// hold each one of our insatnces.
var productNames = [];

//Access the Ul element from the DOM with ID of result
var ulEl = document.getElementById('result');

//access the section element from the HTML.
var sectionEl = document.getElementById('productSection');

// the canvas element that going to display our graph
var context = document.getElementById('placeholder').getContext('2d');

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
  while (randomLeft === randomMiddle
    || randomLeft === randomRight
    || randomMiddle === randomRight
    || Product.lastDisplayed.includes(randomLeft)
    || Product.lastDisplayed.includes(randomMiddle)
    || Product.lastDisplayed.includes(randomRight)) {

    var randomLeft = Math.floor(Math.random() * Product.allProduct.length);
    var randomMiddle = Math.floor(Math.random() * Product.allProduct.length);
    var randomRight = Math.floor(Math.random() * Product.allProduct.length);
  }
  // Which ever image instance is randomly selected out of the array Product.allProduct, increment its timeDisplay value by +1.
  Product.allProduct[randomLeft].timeDisplayed += 1;
  Product.allProduct[randomMiddle].timeDisplayed += 1;
  Product.allProduct[randomRight].timeDisplayed += 1;


  // Using the random number generated index through the Prodcts.allProducts array
  leftPic.src = Product.allProduct[randomLeft].filepath;
  leftPic.alt = Product.allProduct[randomLeft].name;
  productNames.push(leftPic.alt);

  middlePic.src = Product.allProduct[randomMiddle].filepath;
  middlePic.alt = Product.allProduct[randomMiddle].name;
  productNames.push(middlePic.alt);

  rightPic.src = Product.allProduct[randomRight].filepath;
  rightPic.alt = Product.allProduct[randomRight].name;
  productNames.push(rightPic.alt);

  //keep track of these 3 as the perviously displayed products.
  Product.lastDisplayed[0] = randomLeft;
  Product.lastDisplayed[1] = randomMiddle;
  Product.lastDisplayed[2] = randomRight;
}

function handleClick(e) {
  //incremeant totalclicks property with each click.
  Product.totalClick += 1;
  console.log(e.target.alt);
  //Loop goes the length of allProducts array
  for (var i in Product.allProduct) {
    //if the clicked or targted product image is an instance stored in allProducts up its vote value by + 1
    if(e.target.alt === Product.allProduct[i].name) {
      //Push the votes to productVote.
      productVote.push(Product.allProduct[i].vote += 1);
    }
  }
  //if total clicks in greater than 25
  if(Product.totalClick > 24) {
    //remove the event listner off the variable sectionEl which hold the html element section.
    sectionEl.removeEventListener('click', handleClick);
    localStorage.setItem('accumualatedVotes', JSON.stringify(Product.allProduct));
    localStorage.setItem('accumulateDisplay', JSON.stringify(Product.allProduct));
    showResults();
    renderChart();

    //if its not greater continue with the randomProduct function that was invoked on page load.
  }else {
    randomProduct();
  }
}

function showResults() {
  for(var i in Product.allProduct) {
    var liEl = document.createElement('li');
    liEl.textContent = Product.allProduct[i].name + ' has ' + Product.allProduct[i].vote + ' votes and was displayed ' + Product.allProduct[i].timeDisplayed + ' times.' + ' Please refer to the graph below:';
    ulEl.appendChild(liEl);
  }
}


function renderChart(){

  var ProductChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: 'Votes Per Product',
        data: productVote,
        backgroundColors: ['rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255,99,132,1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 7
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

sectionEl.addEventListener('click', handleClick);


randomProduct();