'use strict';

// var userOptions = document.getElementById('user_options');
// var picOne = document.getElementById('pic_one');
// var picTwo = document.getElementById('pic_two');
// var picThree = document.getElementById('pic_three');
var optionOne = document.getElementById('option_one');
var optionTwo = document.getElementById('option_two');
var optionThree = document.getElementById('option_three');
var imgDir = [
  'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
// var imgId = [
//   'id-1', 'id-2', 'id-3', 'id-4', 'id-5', 'id-6', 'id-7', 'id-8', 'id-9', 'id-10', 'id-11', 'id-12', 'id-13', 'id-14', 'id-15', 'id-16', 'id-17', 'id-18', 'id-19', 'id-20'];
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
  this.numClicks = 0;
  // this.imgId = id;
};
//makes objects when images are called upon
for (var i = 0; i < imgDir.length; i++){
  imgObjArr.push(new Merch(imgDir[i]));
}
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
  if (totalClicks < 26) {
    fillImages();
  } else {
    alert('Thank you for participating in our study!');
  }
}

//counts clicks for pictures
// function clicksTotal(){
//   var clickedImageId = this.getAttribute('imgiId');
//   console.log(clickedImageId);
//   console.log(imgDir.length);
//   for (var h = 0; h < imgDir.length; h++){
//     if(clickedImageSrc === imgDir[h].imgId){
//       imgDir[h].clicked++;
//     }
//   }
// }

// clicksTotal();
//event listeners for clicking
optionOne.addEventListener('click', selectChoice);
optionTwo.addEventListener('click', selectChoice);
optionThree.addEventListener('click', selectChoice);
