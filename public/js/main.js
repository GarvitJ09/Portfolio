// Intersection Observer for section animations
const sections = document.querySelectorAll('section');
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optionally unobserve after animation
      // observer.unobserve(entry.target);
    }
  });
}, observerOptions);

sections.forEach((section) => {
  sectionObserver.observe(section);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// Enhanced menu toggle functionality
const menuToggle = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('.menu-panel');
const menuClose = document.querySelector('.menu-close');

menuToggle.addEventListener('click', () => {
  menuPanel.classList.add('active');
  document.body.style.overflow = 'hidden';
});

menuClose.addEventListener('click', () => {
  menuPanel.classList.remove('active');
  document.body.style.overflow = '';
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (
    menuPanel.classList.contains('active') &&
    !menuPanel.contains(e.target) &&
    !menuToggle.contains(e.target)
  ) {
    menuPanel.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Skills slider functionality
let currentSlide = 0;
const skillsWrapper = document.querySelector('.skills-wrapper');
const skillsCategories = document.querySelectorAll('.skills-category');
const totalSlides = skillsCategories.length;

function updateSlider() {
  const slideWidth = skillsCategories[0].offsetWidth;
  skillsWrapper.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

function slideLeft() {
  currentSlide = Math.max(0, currentSlide - 1);
  updateSlider();
}

function slideRight() {
  currentSlide = Math.min(totalSlides - 1, currentSlide + 1);
  updateSlider();
}

// Update slider on window resize
window.addEventListener('resize', updateSlider);

// Theme toggle enhancement
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

themeSwitch.addEventListener('change', () => {
  if (themeSwitch.checked) {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark-theme');
  } else {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light-theme');
  }
});

// Load saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  if (savedTheme === 'dark-theme') {
    themeSwitch.checked = true;
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
  } else {
    themeSwitch.checked = false;
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  }
}
