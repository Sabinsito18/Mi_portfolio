document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav__link");
  const year = document.getElementById("year");
  const contactForm = document.querySelector(".contact-form");
  const revealItems = document.querySelectorAll(".reveal");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const closeMenu = () => {
    if (!navToggle || !navMenu) return;
    navMenu.classList.remove("nav__list--open");
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("nav__list--open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("is-active", isCurrent);
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );

    document.querySelectorAll("main section[id]").forEach((section) => {
      sectionObserver.observe(section);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("nombre")?.toString().trim() || "Contacto";
      const email = formData.get("email")?.toString().trim() || "";
      const message = formData.get("mensaje")?.toString().trim() || "";
      const subject = encodeURIComponent(`Contacto desde portfolio - ${name}`);
      const body = encodeURIComponent(
        `Hola Sabin,\n\n${message}\n\n---\nNombre: ${name}\nEmail: ${email}\nOrigen: Portfolio web`
      );

      window.location.href = `mailto:sabin.maniuk@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
