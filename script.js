/* ============================================================
   ENSURE SCRIPT RUNS AFTER DOM IS READY
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       Apple-style Smooth Scroll for Navigation
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    /* ============================================================
       Fade-in on Scroll (Apple-style)
       ============================================================ */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,      // element becomes visible sooner
        rootMargin: "0px 0px -10% 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(el => {
        appearOnScroll.observe(el);
    });


    /* ============================================================
       Soft Blur Navbar on Scroll (Apple-style)
       ============================================================ */
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            navbar.classList.add("blur");
        } else {
            navbar.classList.remove("blur");
        }
    });

});
