const slides = document.querySelectorAll('.slideshow');
let currentSlide = 0;
const prevSlideButton = document.querySelector('.prev-slide');
const nextSlideButton = document.querySelector('.next-slide');

// Hide all slides except the first one
for (let i = 1; i < slides.length; i++) {
  slides[i].style.display = 'none';
}

// Add event listeners to the prev/next buttons
prevSlideButton.addEventListener('click', showPrevSlide);
nextSlideButton.addEventListener('click', showNextSlide);

function showPrevSlide() {
  // Hide the current slide
  slides[currentSlide].style.display = 'none';
  // Decrement the current slide index
  currentSlide--;
  // Wrap around to the end of the slide array if necessary
  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }
  // Show the new current slide
  slides[currentSlide].style.display = 'block';
}

function showNextSlide() {
  // Hide the current slide
  slides[currentSlide].style.display = 'none';
  // Increment the current slide index
  currentSlide++;
  // Wrap around to the beginning of the slide array if necessary
  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
  // Show the new current slide
  slides[currentSlide].style.display = 'block';
}
