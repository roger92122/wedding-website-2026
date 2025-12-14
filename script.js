/* ============================================================
   Custom Slow Smooth Scroll WITH NAVBAR OFFSET
   ============================================================ */
function smoothScrollTo(target, duration = 1500, offset = 80) {

    const start = window.pageYOffset;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    const end = targetTop - offset;

    const distance = end - start;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        const progress = Math.min(timeElapsed / duration, 1);

        // Apple-like easing
        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, start + distance * ease);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}



/* ============================================================
   RUN EVERYTHING AFTER PAGE LOAD
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       LANGUAGE SWITCHER
       ============================================================ */
    const btnEN = document.getElementById("lang-en");
    const btnZH = document.getElementById("lang-zh");

    btnEN.addEventListener("click", () => {
        btnEN.classList.add("active");
        btnZH.classList.remove("active");

        document.querySelectorAll(".lang-en").forEach(el => el.style.display = "block");
        document.querySelectorAll(".lang-zh").forEach(el => el.style.display = "none");
    });

    btnZH.addEventListener("click", () => {
        btnZH.classList.add("active");
        btnEN.classList.remove("active");

        document.querySelectorAll(".lang-en").forEach(el => el.style.display = "none");
        document.querySelectorAll(".lang-zh").forEach(el => el.style.display = "block");
    });



    /* ============================================================
       PLUS ONE LOGIC — ENGLISH
       ============================================================ */
    const checkboxEN = document.getElementById("plus-one-checkbox-en");
    const guestInputEN = document.getElementById("plus-one-name-en");

    if (checkboxEN) {
        checkboxEN.addEventListener("change", () => {
            guestInputEN.style.display = checkboxEN.checked ? "block" : "none";
        });
    }


    /* ============================================================
       PLUS ONE LOGIC — CHINESE
       ============================================================ */
    const checkboxZH = document.getElementById("plus-one-checkbox-zh");
    const guestInputZH = document.getElementById("plus-one-name-zh");

    if (checkboxZH) {
        checkboxZH.addEventListener("change", () => {
            guestInputZH.style.display = checkboxZH.checked ? "block" : "none";
        });
    }



    /* ============================================================
       UNIVERSAL FORMSPREE HANDLER (robust + stable)
       ============================================================ */
    function attachFormHandler(formEl, successEl) {

        if (!formEl) return;

        formEl.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(formEl);

            try {
                const res = await fetch(formEl.action, {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (res.ok) {
                    successEl.style.display = "block";
                    formEl.reset();

                    // reset plus-one visibility
                    if (guestInputEN) guestInputEN.style.display = "none";
                    if (guestInputZH) guestInputZH.style.display = "none";

                } else {
                    alert("Error submitting form. Please try again.");
                }

            } catch (err) {
                alert("Network error. Please try again.");
            }

        });
    }

    // English form
    attachFormHandler(
        document.getElementById("rsvp-form-en"),
        document.getElementById("form-success-en")
    );

    // Chinese form
    attachFormHandler(
        document.getElementById("rsvp-form-zh"),
        document.getElementById("form-success-zh")
    );



    /* ============================================================
       NAV LINK SMOOTH SCROLL
       ============================================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute("href"));
            if (!target) return;

            const isMobile = window.innerWidth < 768;
            const offset = isMobile ? 80 : 40;

            smoothScrollTo(target, 1700, offset);
        });
    });

});
