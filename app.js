'use strict';

var imgDir = [
  'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var imgObjArr = [];
var imgOne;
var imgTwo;
var imgThree;
var prevOne;
var prevTwo;
var prevThree;

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
  while (randomInt === prevOne || randomNum === prevTwo || randomInt === prevThree) {
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
}

function fillImages(){
  for (var j = 0; j < 25; j++) {
    compareNum();
    var pageArray = [];
    pageArray.push(imgObjArr[imgOne]);
    pageArray.push(imgObjArr[imgTwo]);
    pageArray.push(imgObjArr[imgThree]);
    imgObjArr[imgOne].viewed++;
    imgObjArr[imgTwo].viewed++;
    imgObjArr[imgThree].viewed++;
    var userOptions = document.getElementById('user_options');
    for (var k = 0; k < pageArray.length; k++) {
      userOptions.innerHTML = '<li><img src ="' + pageArray[k].path + '"></li>';
    }
  }
};

fillImages();
