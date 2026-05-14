// script.js

/* ANIMAÇÃO AO SCROLL */

const observer = new IntersectionObserver((entries) => {

  entries.forEach((entry) => {

    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }

  });

}, {
  threshold:0.15
});

const hiddenElements = document.querySelectorAll(
  ".glass-card, .timeline-card, .project-card, .certificate-card"
);

hiddenElements.forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

/* CARROSSEL */

const carousel = document.getElementById("carousel");

const nextBtn = document.getElementById("nextBtn");

const prevBtn = document.getElementById("prevBtn");

nextBtn.addEventListener("click", () => {

  carousel.scrollBy({
    left:340,
    behavior:"smooth"
  });

});

prevBtn.addEventListener("click", () => {

  carousel.scrollBy({
    left:-340,
    behavior:"smooth"
  });

});