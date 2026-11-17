const navMenu = document.getElementById("nav-menu");
const navToggle = document.getElementById("nav-toggle");
const navClose = document.getElementById("nav-close");

const openMenu = () => navMenu?.classList.add("show-menu");
const closeMenu = () => navMenu?.classList.remove("show-menu");

navToggle?.addEventListener("click", openMenu);
navClose?.addEventListener("click", closeMenu);
document.querySelectorAll(".nav__link").forEach((link) => link.addEventListener("click", closeMenu));

const header = document.getElementById("header");
const scrollTop = document.getElementById("scroll-top");

const updateScrolledUi = () => {
  header?.classList.toggle("scroll-header", window.scrollY >= 48);
  scrollTop?.classList.toggle("show-scroll", window.scrollY >= 560);
};

window.addEventListener("scroll", updateScrolledUi, { passive: true });
updateScrolledUi();

const navLinks = [...document.querySelectorAll(".nav__link")];
const linkedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active-link", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-35% 0px -55%", threshold: 0 },
  );
  linkedSections.forEach((section) => sectionObserver.observe(section));
}

const themeButton = document.getElementById("theme-button");
const themeKey = "marzieh-portfolio-theme";
const savedTheme = localStorage.getItem(themeKey);

if (savedTheme === "dark") {
  document.body.classList.add("dark-theme");
}

const updateThemeLabel = () => {
  const isDark = document.body.classList.contains("dark-theme");
  themeButton?.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
};

updateThemeLabel();

themeButton?.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  localStorage.setItem(themeKey, document.body.classList.contains("dark-theme") ? "dark" : "light");
  updateThemeLabel();
});

const setupTabs = ({ buttonSelector, panelSelector, activeClass = "is-active" }) => {
  const buttons = [...document.querySelectorAll(buttonSelector)];
  const panels = [...document.querySelectorAll(panelSelector)];

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const name = button.dataset.tab || button.dataset.academicTab;
      buttons.forEach((item) => {
        const selected = item === button;
        item.classList.toggle(activeClass, selected);
        item.setAttribute("aria-selected", String(selected));
      });
      panels.forEach((panel) => {
        const panelName = panel.dataset.tabPanel || panel.dataset.academicPanel;
        const selected = panelName === name;
        panel.classList.toggle(activeClass, selected);
        panel.hidden = !selected;
      });
    });
  });
};

setupTabs({ buttonSelector: "[data-tab]", panelSelector: "[data-tab-panel]" });
setupTabs({ buttonSelector: "[data-academic-tab]", panelSelector: "[data-academic-panel]" });

document.querySelectorAll(".skill-group__header").forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".skill-group");
    const isOpen = group.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const slider = document.querySelector("[data-slider]");

if (slider) {
  const slides = [...slider.querySelectorAll("[data-slide]")];
  const dots = [...slider.querySelectorAll("[data-slider-dot]")];
  const previous = slider.querySelector("[data-slider-prev]");
  const next = slider.querySelector("[data-slider-next]");
  let current = 0;
  let autoAdvance;

  const showSlide = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const selected = slideIndex === current;
      slide.hidden = !selected;
      slide.classList.toggle("is-active", selected);
    });
    dots.forEach((dot, dotIndex) => {
      const selected = dotIndex === current;
      dot.classList.toggle("is-active", selected);
      dot.setAttribute("aria-selected", String(selected));
    });
  };

  const startAutoAdvance = () => {
    window.clearInterval(autoAdvance);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    autoAdvance = window.setInterval(() => showSlide(current + 1), 7000);
  };

  previous?.addEventListener("click", () => {
    showSlide(current - 1);
    startAutoAdvance();
  });

  next?.addEventListener("click", () => {
    showSlide(current + 1);
    startAutoAdvance();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.sliderDot));
      startAutoAdvance();
    });
  });

  slider.addEventListener("mouseenter", () => window.clearInterval(autoAdvance));
  slider.addEventListener("mouseleave", startAutoAdvance);
  slider.addEventListener("focusin", () => window.clearInterval(autoAdvance));
  slider.addEventListener("focusout", startAutoAdvance);

  showSlide(0);
  startAutoAdvance();
}

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
