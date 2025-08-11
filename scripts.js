// scripts.js

/* Toggle mobile navigation menu */
document.addEventListener('DOMContentLoaded', function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('show');
    });
  }

  // Hide menu when a link is clicked (useful on mobile)
  if (navLinks) {
    const links = navLinks.querySelectorAll('a');
    links.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navLinks.classList.contains('show')) {
          navLinks.classList.remove('show');
        }
      });
    });
  }
});