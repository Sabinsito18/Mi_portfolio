document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav__toggle");
  const navMenu = document.getElementById("navMenu");
  const year = document.getElementById("year");
  const contactForm = document.querySelector(".contact-form");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("nav__list--open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("nav__list--open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  document.querySelectorAll(".fade-in").forEach((element) => observer.observe(element));

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const name = formData.get("nombre")?.toString().trim() || "Contacto";
      const email = formData.get("email")?.toString().trim() || "";
      const message = formData.get("mensaje")?.toString().trim() || "";
      const subject = encodeURIComponent(`Contacto portfolio - ${name}`);
      const body = encodeURIComponent(`${message}\n\nNombre: ${name}\nEmail: ${email}`);

      window.location.href = `mailto:sabin.maniuk@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
