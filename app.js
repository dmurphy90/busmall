'use strict';

// var picOne = document.getElementById('pic_one');
// var picTwo = document.getElementById('pic_two');
// var picThree = document.getElementById('pic_three');
var optionOne = document.getElementById('option_one');
var optionTwo = document.getElementById('option_two');
var optionThree = document.getElementById('option_three');
var imgDir = [
  'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var imgObjArr = [];
var imgOne;
var imgTwo;
var imgThree;
var prevOne;
var prevTwo;
var prevThree;
var totalClicks = 0;

function Merch (name){
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.viewed = 0;
  this.clicked = 0;
};

for (var i = 0; i < imgDir.length; i++){
  imgObjArr.push(new Merch(imgDir[i]));
}

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

function fillImages(){
  compareNum();
  var pageArray = [];
  pageArray.push(imgObjArr[imgOne]);
  pageArray.push(imgObjArr[imgTwo]);
  pageArray.push(imgObjArr[imgThree]);
  imgObjArr[imgOne].viewed++;
  imgObjArr[imgTwo].viewed++;
  imgObjArr[imgThree].viewed++;
  optionOne.innerHTML = '<img src="' + pageArray[0].path + '">';
  optionTwo.innerHTML = '<img src="' + pageArray[1].path + '">';
  optionThree.innerHTML = '<img src="' + pageArray[2].path + '">';
  totalClicks++;
  console.log('total clicks:', totalClicks);
  console.log('img 1 shown', imgObjArr[imgOne].viewed);
  console.log('img 2 shown', imgObjArr[imgTwo].viewed);
  console.log('img 3 shown', imgObjArr[imgThree].viewed);
};


function selectChoice(){
  console.log(event.target);
  if (totalClicks < 26) {
    fillImages();
    this.clicks++;
    console.log(this.clicks);
  } else {
    alert('Thank you for participating in our study!');
  }
}


optionOne.addEventListener('click', selectChoice);
optionTwo.addEventListener('click', selectChoice);
optionThree.addEventListener('click', selectChoice);
