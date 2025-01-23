document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuPanel = document.querySelector('.menu-panel');
  const body = document.body;

  // Load saved theme
  const savedTheme = localStorage.getItem('theme') || 'light-theme';
  body.classList.add(savedTheme);

  // Set the initial state of the theme switch
  if (savedTheme === 'dark-theme') {
    themeSwitch.checked = true;
  }

  // Toggle theme
  themeSwitch.addEventListener('change', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');

    const currentTheme = body.classList.contains('dark-theme')
      ? 'dark-theme'
      : 'light-theme';
    localStorage.setItem('theme', currentTheme);

    // Update icon color
    document
      .querySelectorAll('.social-panel a, .menu-toggle, .theme-toggle')
      .forEach((icon) => {
        icon.style.color =
          currentTheme === 'dark-theme' ? '#ffffff' : '#121212';
      });
  });

  // Toggle menu panel
  menuToggle.addEventListener('click', () => {
    if (menuPanel.style.left === '0px') {
      menuPanel.style.left = '-250px';
    } else {
      menuPanel.style.left = '0px';
    }
  });

  // Set initial icon color
  document
    .querySelectorAll('.social-panel a, .menu-toggle, .theme-toggle')
    .forEach((icon) => {
      icon.style.color = savedTheme === 'dark-theme' ? '#ffffff' : '#121212';
    });
});

document
  .querySelector('.contact-form')
  .addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = {
      name: document.querySelector(
        ".contact-form input[placeholder='Your Name']"
      ).value,
      email: document.querySelector(
        ".contact-form input[placeholder='Your Email']"
      ).value,
      phone: document.querySelector(
        ".contact-form input[placeholder='Your Phone Number']"
      ).value,
      message: document.querySelector('.contact-form textarea').value,
    };

    try {
      const response = await fetch('http://localhost:3000/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Your message has been sent successfully!');
        document.querySelector('.contact-form').reset();
      } else {
        alert('Failed to send your message. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  });

function slideLeft() {
  const skillsWrapper = document.querySelector('.skills-wrapper');
  skillsWrapper.scrollBy({
    left: -250,
    behavior: 'smooth',
  });
}

function slideRight() {
  const skillsWrapper = document.querySelector('.skills-wrapper');
  skillsWrapper.scrollBy({
    left: 250,
    behavior: 'smooth',
  });
}
