// main.js

// Function to initialize navigation once the header is loaded
function initNavigation() {
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const header = document.getElementById("header");

  if (!menuToggle || !navMenu) return;

  // Toggle mobile menu
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("open");
    document.body.classList.toggle("menu-open");
  });

  // Close menu when link clicked
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });
      }
      navMenu.classList.remove("active");
      menuToggle.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });

  // Shrink header on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });
}


// --- Load Header & Footer, then Initialize Navigation ---
async function loadHTML(selector, file) {
  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load ${file}`);
    document.querySelector(selector).innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

async function loadLayout() {
  await loadHTML("#header-placeholder", "partials/header.html");
  await loadHTML("#footer-placeholder", "partials/footer.html");
  initNavigation(); // Now that the header exists, set up the nav logic
}

// Run after DOM is ready
document.addEventListener("DOMContentLoaded", loadLayout);
