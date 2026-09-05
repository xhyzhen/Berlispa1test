
    // Navbar shadow on scroll
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("scrolled", window.scrollY > 30);
    });

    // Mobile navigation
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      menuToggle.innerHTML = navLinks.classList.contains("open")
        ? '<i class="bi bi-x-lg"></i>'
        : '<i class="bi bi-list"></i>';
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });

    // Hero slider
    const slides = document.querySelectorAll(".hero-slide");
    const dots = document.querySelectorAll(".hero-dot");
    let currentSlide = 0;
    let sliderTimer;

    function showSlide(index) {
      currentSlide = (index + slides.length) % slides.length;
      slides.forEach((slide, i) => slide.classList.toggle("active", i === currentSlide));
      dots.forEach((dot, i) => dot.classList.toggle("active", i === currentSlide));
    }

    function nextSlide() {
      showSlide(currentSlide + 1);
    }

    function startSlider() {
      clearInterval(sliderTimer);
      sliderTimer = setInterval(nextSlide, 5000);
    }

    document.getElementById("heroNext").addEventListener("click", () => {
      nextSlide();
      startSlider();
    });

    document.getElementById("heroPrev").addEventListener("click", () => {
      showSlide(currentSlide - 1);
      startSlider();
    });

    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.slide));
        startSlider();
      });
    });

    startSlider();


    // Package currency switcher
    const currencyButtons = document.querySelectorAll(".currency-toggle button");
    const packagePrices = document.querySelectorAll(".price[data-sgd]");

    currencyButtons.forEach(button => {
      button.addEventListener("click", () => {
        currencyButtons.forEach(b => b.classList.remove("active"));
        button.classList.add("active");
        const currency = button.dataset.currency;
        packagePrices.forEach(price => {
          price.textContent = price.dataset[currency];
        });
      });
    });

    // Highlight nav item based on visible section
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-links > a[href^='#']");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAnchors.forEach(a => a.classList.remove("active"));
          const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add("active");
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach(section => observer.observe(section));
  