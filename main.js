/* 
  Nathisha M - Professional Portfolio Script
  Interactivity: Navigation, Scroll Spy, Reveal-on-Scroll, Form Validation
*/

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScrollSpyAndNavbar();
  initScrollReveal();
  initContactForm();
});

/**
 * Mobile Hamburger Menu toggling
 */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger-menu');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a navigation link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
}

/**
 * Scrollspy navbar active highlighting
 */
function initScrollSpyAndNavbar() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.header');

  // Change header appearance on scroll
  const handleHeaderShadow = () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow-md)';
      header.style.height = '70px';
    } else {
      header.style.boxShadow = 'none';
      header.style.height = '80px';
    }
  };

  // Detect active section on scroll
  const handleScrollSpy = () => {
    let scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100; // Offset for sticky header
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', () => {
    handleHeaderShadow();
    handleScrollSpy();
  });

  // Run once initially to set starting state
  handleHeaderShadow();
  handleScrollSpy();
}

/**
 * Intersection Observer for element reveal on scroll
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const observerOptions = {
    root: null, // Viewport
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '0px 0px -50px 0px' // Slightly trigger before reaching viewport bottom
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to track it further
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(element => {
    // Add default reveal class to hide elements initially if JS is active
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

/**
 * Contact Form validation and mailto setup
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !message) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      try {
        // Construct the mailto link parameters
        const recipient = 'nathisha1551@gmail.com';
        const subject = encodeURIComponent(`Portfolio Connect: Message from ${name}`);
        const body = encodeURIComponent(
          `Hi Nathisha,\n\nYou have received a message from your portfolio website.\n\n` +
          `Sender Details:\n` +
          `Name: ${name}\n` +
          `Email: ${email}\n\n` +
          `Message:\n${message}\n\n` +
          `Best regards,\n${name}`
        );

        const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

        // Feedback to user
        showStatus('Success! Preparing your email client to send message...', 'success');
        
        // Open the mail application in a short timeout so user sees the status change
        setTimeout(() => {
          window.location.href = mailtoUrl;
          contactForm.reset();
        }, 1200);

      } catch (err) {
        showStatus('An error occurred. Please try again or email directly to nathisha1551@gmail.com.', 'error');
        console.error(err);
      }
    });
  }

  function showStatus(text, type) {
    formStatus.textContent = text;
    formStatus.className = `form-status ${type}`;
    
    // Clear status after 5 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 6000);
  }
}
