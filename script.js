document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle logic
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  
  // Check for saved theme preference, default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });

  // Publications Filter logic
  const filterButtons = document.querySelectorAll('.filter-btn');
  const publicationCards = document.querySelectorAll('.publication-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      publicationCards.forEach(card => {
        // First fade out
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.style.display = 'grid';
            // Trigger reflow for transition
            card.offsetHeight; 
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });

  // Active Link Spying on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a.nav-link-item');

  function spyScroll() {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 200; // Offset for header height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }
  }

  window.addEventListener('scroll', spyScroll);
  spyScroll(); // Initial call

  // Recruiter Console Message
  console.log(
    '%cHello Developer/Recruiter! 👋%c\nThanks for inspecting the site. Connect with Varghese at vkuruvilla789@gmail.com!',
    'color: #3b82f6; font-size: 20px; font-weight: bold;',
    'color: inherit; font-size: 14px;'
  );
});
