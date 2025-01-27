document.addEventListener('DOMContentLoaded', () => {
  const themeSwitch = document.getElementById('theme-switch');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuPanel = document.querySelector('.menu-panel');
  const body = document.body;

  // Function to update icon colors
  const updateIconColors = (theme) => {
    document
      .querySelectorAll('.social-panel a, .menu-toggle, .theme-toggle')
      .forEach((icon) => {
        icon.style.color = theme === 'dark-theme' ? '#ffffff' : '#121212';
      });
  };

  // Load and apply saved theme
  const savedTheme = localStorage.getItem('theme') || 'light-theme';
  body.classList.add(savedTheme);
  if (savedTheme === 'dark-theme') {
    themeSwitch.checked = true;
  }
  updateIconColors(savedTheme);

  // Toggle theme
  themeSwitch.addEventListener('change', () => {
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');

    const currentTheme = body.classList.contains('dark-theme')
      ? 'dark-theme'
      : 'light-theme';
    localStorage.setItem('theme', currentTheme);
    updateIconColors(currentTheme);
  });

  // Toggle menu panel
  menuToggle.addEventListener('click', () => {
    const icon = menuToggle.querySelector('i');
    menuToggle.classList.toggle('open');
    menuPanel.classList.toggle('open');

    if (menuToggle.classList.contains('open')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Handle contact form submission
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const formData = {
        name: contactForm.querySelector("input[placeholder='Your Name']").value,
        email: contactForm.querySelector("input[placeholder='Your Email']")
          .value,
        phone: contactForm.querySelector(
          "input[placeholder='Your Phone Number']"
        ).value,
        message: contactForm.querySelector('textarea').value,
      };

      try {
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert('Your message has been sent successfully!');
          contactForm.reset();
        } else {
          alert('Failed to send your message. Please try again later.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
      }
    });
  }

  // // Slide functionality for skills wrapper
  // const slideLeft = () => {
  //   const skillsWrapper = document.querySelector('.skills-wrapper');
  //   skillsWrapper.scrollBy({ left: -250, behavior: 'smooth' });
  // };

  // const slideRight = () => {
  //   const skillsWrapper = document.querySelector('.skills-wrapper');
  //   skillsWrapper.scrollBy({ left: 250, behavior: 'smooth' });
  // };

  // // Attach sliding functions to buttons if present
  // document.querySelector('.slide-left')?.addEventListener('click', slideLeft);
  // document.querySelector('.slide-right')?.addEventListener('click', slideRight);
});

// Slide functionality for skills wrapper
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
