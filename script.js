/* ============================================================
   SMOOTH SCROLL
   ============================================================ */

function smoothScrollTo(target, duration = 1200, offset = 80) {
    const start = window.pageYOffset;
    const end = target.getBoundingClientRect().top + start - offset;
    const distance = end - start;
    let startTime = null;

    function animate(time) {
        if (!startTime) startTime = time;
        const progress = Math.min((time - startTime) / duration, 1);
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, start + distance * ease);

        if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

/* ============================================================
   ON LOAD
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {

    /* HAMBURGER */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("navMenu");

    hamburger?.addEventListener("click", () => {
        navMenu.classList.toggle("show");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show");
        });
    });

    /* NAV BLUR */
    const navbar = document.querySelector(".navbar");
    window.addEventListener("scroll", () => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
    });

    /* LANGUAGE SWITCH */
    const btnEN = document.getElementById("lang-en");
    const btnZH = document.getElementById("lang-zh");

    function switchLang(showEN) {
        document.querySelectorAll(".lang-en").forEach(el =>
            el.style.display = showEN ? "block" : "none"
        );
        document.querySelectorAll(".lang-zh").forEach(el =>
            el.style.display = showEN ? "none" : "block"
        );
        btnEN.classList.toggle("active", showEN);
        btnZH.classList.toggle("active", !showEN);
    }

    btnEN?.addEventListener("click", () => switchLang(true));
    btnZH?.addEventListener("click", () => switchLang(false));

    /* SMOOTH SCROLL LINKS */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener("click", e => {
            const target = document.querySelector(a.getAttribute("href"));
            if (!target) return;
            e.preventDefault();
            smoothScrollTo(target, 1200, window.innerWidth < 768 ? 80 : 40);
        });
    });

    /* FADE IN ON SCROLL */
    const fadeEls = document.querySelectorAll(
        ".section, .hero-content, .event-image, .faq-item, .rsvp-form"
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    fadeEls.forEach(el => {
        el.classList.add("fade-in");
        observer.observe(el);
    });

});
