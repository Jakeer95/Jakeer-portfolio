document.addEventListener('DOMContentLoaded', () => {

  // 1. Typing Effect for Hero Subtitle
  const typedTextSpan = document.getElementById('typed-text');
  const titles = [
    "Data Analytics & BI Enthusiast",
    "Power BI Dashboard Developer",
    "MCA Student & Tech Learner"
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentTitle = titles[titleIndex];
    if (isDeleting) {
      typedTextSpan.textContent = currentTitle.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentTitle.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === currentTitle.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  if (typedTextSpan) type();

  // 2. Sticky Navbar Scroll Effect
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  // 3. Mobile Hamburger Menu
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking link
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // 4. Scroll Reveal Animations (Intersection Observer)
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });

  // 5. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section');
  const navItems = document.querySelectorAll('.nav-item');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 6. Form Submission (Mailto Fallback)
  const contactForm = document.getElementById('contact-form');
  const formNotice = document.getElementById('form-notice');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      formNotice.style.color = '#38bdf8';
      formNotice.textContent = 'Redirecting to your email client...';

      // Open Mailto
      setTimeout(() => {
        window.location.href = `mailto:YOUR_EMAIL?subject=Contact from Portfolio - ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
      }, 1000);
    });
  }

  // 7. Dynamic Current Year
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 8. Back to Top Click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});