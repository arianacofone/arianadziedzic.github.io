// Hello Script Functionality
window.onload = function() {
  let elements = document.getElementsByClassName('txt-rotate');
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute('data-rotate');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), 1000);
    }
  }
};

let TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  let that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

// Modal Functionality
function modalPortfolio() {
	el = document.querySelector('#modal-portfolio');
  otherEl = document.querySelector('#modal-about');
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  otherEl.style.visibility = "hidden";
}

function modalAbout() {
	el = document.querySelector('#modal-about');
  otherEl = document.querySelector('#modal-portfolio');
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  otherEl.style.visibility = "hidden";
}

// Slideshow Functionality
let slides = document.querySelectorAll('#slides .slide');
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 3000);

function slideMovement(n) {
  slides[currentSlide].className = 'slide';
  currentSlide = (n + slides.length)%slides.length;
  slides[currentSlide].className = 'slide showing';
}

function nextSlide() {
    slideMovement(currentSlide+1);
}

function previousSlide() {
    slideMovement(currentSlide-1);
    clearInterval(slideInterval);
}
