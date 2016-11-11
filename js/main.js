'use strict';

// Hello Script Functionality
window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), 1000);
    }
  }
};

var TxtRotate = function TxtRotate(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

// Modal Functionality
function modalPortfolio() {
  var el = document.getElementById('modal-portfolio');
  var otherEl = document.getElementById('modal-about');
  el.style.visibility = el.style.visibility == "visible" ? "hidden" : "visible";
  otherEl.style.visibility = "hidden";
}

function modalAbout() {
  var elTwo = document.getElementById('modal-about');
  var otherElTwo = document.getElementById('modal-portfolio');
  elTwo.style.visibility = elTwo.style.visibility == "visible" ? "hidden" : "visible";
  otherElTwo.style.visibility = "hidden";
}

// Slideshow Functionality
var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide, 3000);

function slideMovement(n) {
  slides[currentSlide].className = 'slide';
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].className = 'slide showing';
}

function nextSlide() {
  slideMovement(currentSlide + 1);
}

function previousSlide() {
  slideMovement(currentSlide - 1);
  clearInterval(slideInterval);
}
