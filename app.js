'use strict';

var optionOne = document.getElementById('option_one');
var optionTwo = document.getElementById('option_two');
var optionThree = document.getElementById('option_three');
var imgDir = [
  'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var imgOne;
var imgTwo;
var imgThree;
var prevOne;
var prevTwo;
var prevThree;
var totalClicks = 0;
var imgObjArr = [];
var savedArr = [];

if (localStorage.images) {
  savedArr = localStorage.images.split(',');
} else {
  savedArr = [];
}

function save() {
  for (var i = 0; i < imgObjArr.length; i++) {
    // if (i === imgObjArr.length - 1)
    //   savedArr.push(imgObjArr[i]);
    // break;
    // savedArr.push(imgObjArr[i] + '^');
    savedArr.push([imgObjArr[i].name, imgObjArr[i].numClicks]);
  }
  localStorage.images = savedArr;
  console.log('saved arr', savedArr);
}

function load() {
  console.log('local storage version:', localStorage.images);
}

function Merch (name){
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.viewed = 0;
  this.numClicks = 0;
  // this.imgId = id;
};
//makes objects when images are called upon
for (var i = 0; i < imgDir.length; i++){
  imgObjArr.push(new Merch(imgDir[i]));
}

// function save() {
//   localStorage.imgObjArr = imgObjArr;
// };

//random num generator
function randomNum(){
  var max = imgDir.length - 1;
  var min = 0;
  var randomInt = Math.floor(Math.random() * (max - min) + 1);
  while (randomInt === prevOne || randomInt === prevTwo || randomInt === prevThree) {
    randomInt = Math.floor(Math.random() * (max - min) + 1);
  }
  return randomInt;
  console.log('random num:', randomInt);
};
//function to remove duplicates
function compareNum(){
  imgOne = randomNum();
  imgTwo = randomNum();
  imgThree = randomNum();
  while (imgTwo === imgOne) {
    imgTwo = randomNum();
  }
  while (imgThree === imgOne || imgThree === imgTwo) {
    imgThree = randomNum();
  }
  prevOne = imgOne;
  prevTwo = imgTwo;
  prevThree = imgThree;
};
//pushes images into list item placeholders
function fillImages(){
  compareNum();
  var pageArray = [];
  pageArray.push(imgObjArr[imgOne]);
  pageArray.push(imgObjArr[imgTwo]);
  pageArray.push(imgObjArr[imgThree]);
  imgObjArr[imgOne].viewed++;
  imgObjArr[imgTwo].viewed++;
  imgObjArr[imgThree].viewed++;
  optionOne.innerHTML = '<img id="' + imgOne + '" src="' + pageArray[0].path + '">';
  optionTwo.innerHTML = '<img id="' + imgTwo + '" src="' + pageArray[1].path + '">';
  optionThree.innerHTML = '<img id="' + imgThree + '" src="' + pageArray[2].path + '">';
  totalClicks++;
  console.log('total clicks:', totalClicks);
  console.log('img 1 shown', imgObjArr[imgOne].viewed);
  console.log('img 2 shown', imgObjArr[imgTwo].viewed);
  console.log('img 3 shown', imgObjArr[imgThree].viewed);
};

fillImages();
//function executed upon clicking
function selectChoice(event){
  console.log(event.target.id);
  var k = event.target.id;
  console.log('yo', event.target);
  imgObjArr[k].numClicks++;
  console.log('hey', imgObjArr[k]);
  console.log('target clicks:', imgObjArr[k].numClicks);
  if (totalClicks < 25) {
    fillImages();
  } else {
    alert('Thank you for participating in our study!');
    save();
    buildTable();
  }
}
//creates pie chart invoked when user hits 25 choices
function buildTable(){
  var imgTitle = [];
  var graphData = [];
  for (var i = 0; i < imgDir.length; i++){
    imgTitle.push(imgDir[i]);
  }
  console.log('bar name:', imgTitle);

  for (var j = 0; j < imgObjArr.length; j++){
    graphData.push(imgObjArr[j].numClicks);
  }
  console.log('bar data:', graphData);

  var canvas = document.getElementById('chart');
  var ctx = canvas.getContext('2d');

  var myPieChart = new Chart(ctx,{
    type: 'pie',
    data: {
      labels: imgTitle,
      datasets: [{
        label: 'Total Number of Clicks',
        data: graphData,
        backgroundColor: ['#f6b6c6', '#f6b6c6', '#32fd33', '#b5c569', '#6d2c4d', '#604c0c', '#661930', '#89b6c2', '#f0c64b', '#4a4cdf', '#ae292d', '#a196c7', '#c7a0a2', '#3962b5', '#55adee', '#c11068', '#59794a', '#ea5c6c']
     }],
   },
    options: {}

  });
}


//event listeners for clicking on pictures
optionOne.addEventListener('click', selectChoice);
optionTwo.addEventListener('click', selectChoice);
optionThree.addEventListener('click', selectChoice);

// function updateLocalStorage(){
//   localStorage.setItem('savedArr', JSON.stringify(savedArr));
// };
