document.addEventListener('DOMContentLoaded', () => {
      // Animar barras
      document.querySelectorAll('.bar-fill').forEach(bar => {
        const level = bar.dataset.level;
        setTimeout(() => { bar.style.width = level + '%'; }, 100);
      });

      // Toggle menú responsive
      const navToggle = document.querySelector('.nav__toggle');
      const navMenu = document.getElementById('navMenu');
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('nav__list--open');
      });

      // Año actual
      document.getElementById('year').textContent = new Date().getFullYear();
    });