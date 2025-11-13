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
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.8s ease";
    }
  });
}, observerOptions);

// Observe all skill items
document.querySelectorAll(".skill-item").forEach(item => {
  observer.observe(item);
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
  }
});