// Auto-theme detection
const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");

if (userPrefersDark) {
  root.setAttribute("data-theme", "dark");
  themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
  const currentTheme = root.getAttribute("data-theme");
  if (currentTheme === "dark") {
    root.removeAttribute("data-theme");
    themeToggle.textContent = "🌙";
  } else {
    root.setAttribute("data-theme", "dark");
    themeToggle.textContent = "☀️";
  }
});

// Project Filtering
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach(btn => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");
    
    const filterValue = button.getAttribute("data-filter");
    
    projectCards.forEach(card => {
      if (filterValue === "all" || card.getAttribute("data-category") === filterValue) {
        card.classList.remove("hidden");
        setTimeout(() => {
          card.style.animation = "fadeInUp 0.5s ease";
        }, 0);
      } else {
        card.classList.add("hidden");
      }
    });
  });
});

// Smooth Scroll Behavior
document.querySelectorAll("a[href^='#']").forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      entry.target.style.animation = "fadeInUp 0.8s ease forwards";
    }
  });
}, observerOptions);

// Observe all elements for animations
document.addEventListener('DOMContentLoaded', function() {
  // Observe skill cards
  document.querySelectorAll(".skill-card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    observer.observe(card);
  });
  
  // Observe education items
  document.querySelectorAll(".education-item").forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    observer.observe(item);
  });
  
  // Observe project cards
  document.querySelectorAll(".project-card").forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    observer.observe(card);
  });
  
  // Observe contact items
  document.querySelectorAll(".contact-item").forEach(item => {
    item.style.opacity = "0";
    item.style.transform = "translateX(-30px)";
    observer.observe(item);
  });
});

// Simple image error handling
document.addEventListener('DOMContentLoaded', function() {
  const profilePic = document.querySelector('.profile-pic');
  if (profilePic) {
    profilePic.onerror = function() {
      this.style.display = 'none';
      const placeholder = this.nextElementSibling;
      if (placeholder && placeholder.classList.contains('profile-placeholder')) {
        placeholder.style.display = 'flex';
      }
    };
    
    // Preload image to check if it exists
    const img = new Image();
    img.onload = function() {
      // Image exists, ensure it's visible
      profilePic.style.display = 'block';
    };
    img.onerror = function() {
      // Image doesn't exist, show placeholder
      profilePic.style.display = 'none';
      const placeholder = profilePic.nextElementSibling;
      if (placeholder && placeholder.classList.contains('profile-placeholder')) {
        placeholder.style.display = 'flex';
      }
    };
    img.src = profilePic.src;
  }
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
  const header = document.querySelector('.header');
  if (window.scrollY > 100) {
    header.style.background = "var(--accent-color)";
    header.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.1)";
  } else {
    header.style.background = "linear-gradient(135deg, var(--accent-color) 0%, var(--secondary-accent) 100%)";
    header.style.boxShadow = "0 4px 20px rgba(108, 99, 255, 0.3)";
  }
});

// Add active navigation highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= (sectionTop - 200)) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get('name') || contactForm.querySelector('input[type="text"]').value;
      const email = formData.get('email') || contactForm.querySelector('input[type="email"]').value;
      const message = formData.get('message') || contactForm.querySelector('textarea').value;
      
      // Simple validation
      if (!name || !email || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Here you would typically send the data to a server
      // For now, we'll just show a success message
      alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
      contactForm.reset();
    });
  }
});

// Add loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Skill card interaction
document.addEventListener('DOMContentLoaded', function() {
  const skillCards = document.querySelectorAll('.skill-card');
  
  skillCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Education timeline animation
document.addEventListener('DOMContentLoaded', function() {
  const educationItems = document.querySelectorAll('.education-item');
  
  educationItems.forEach((item, index) => {
    // Add staggered animation delay
    item.style.animationDelay = `${index * 0.2}s`;
  });
});

// Mobile menu toggle (for future responsive enhancement)
function initMobileMenu() {
  const navbar = document.querySelector('.navbar ul');
  const headerActions = document.querySelector('.header-actions');
  
  // Create mobile menu button
  const mobileMenuBtn = document.createElement('button');
  mobileMenuBtn.innerHTML = '☰';
  mobileMenuBtn.className = 'mobile-menu-btn';
  mobileMenuBtn.style.display = 'none';
  mobileMenuBtn.style.background = 'transparent';
  mobileMenuBtn.style.border = 'none';
  mobileMenuBtn.style.color = 'white';
  mobileMenuBtn.style.fontSize = '1.5rem';
  mobileMenuBtn.style.cursor = 'pointer';
  
  headerActions.appendChild(mobileMenuBtn);
  
  // Toggle mobile menu
  mobileMenuBtn.addEventListener('click', function() {
    navbar.classList.toggle('mobile-open');
  });
  
  // Check screen size and toggle mobile menu visibility
  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      mobileMenuBtn.style.display = 'block';
      navbar.classList.add('mobile-nav');
    } else {
      mobileMenuBtn.style.display = 'none';
      navbar.classList.remove('mobile-nav', 'mobile-open');
    }
  }
  
  // Initial check
  checkScreenSize();
  
  // Check on resize
  window.addEventListener('resize', checkScreenSize);
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);
