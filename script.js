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
   MAIN SCRIPT
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
       PLUS ONE LOGIC
       ============================================================ */
    const checkboxEN = document.getElementById("plus-one-checkbox");
    const guestInputEN = document.getElementById("plus-one-name");

    if (checkboxEN) {
        checkboxEN.addEventListener("change", () => {
            guestInputEN.style.display = checkboxEN.checked ? "block" : "none";
        });
    }

    const checkboxZH = document.getElementById("plus-one-checkbox-zh");
    const guestInputZH = document.getElementById("plus-one-name-zh");

    if (checkboxZH) {
        checkboxZH.addEventListener("change", () => {
            guestInputZH.style.display = checkboxZH.checked ? "block" : "none";
        });
    }


    /* ============================================================
       FORM SUBMISSION (FORMSPREE)
       ============================================================ */
    const rsvpForm = document.getElementById("rsvp-form");
    const successEN = document.getElementById("form-success");
    const successZH = document.getElementById("form-success-zh");

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            try {
                const res = await fetch(rsvpForm.action, {
                    method: "POST",
                    body: formData,
                    headers: { "Accept": "application/json" }
                });

                if (res.ok) {
                    // Show correct language success message
                    if (btnEN.classList.contains("active")) {
                        successEN.style.display = "block";
                        successZH.style.display = "none";
                    } else {
                        successZH.style.display = "block";
                        successEN.style.display = "none";
                    }

                    rsvpForm.reset();
                    guestInputEN.style.display = "none";
                    guestInputZH.style.display = "none";

                } else {
                    alert("Error submitting form. Please try again.");
                }

            } catch (err) {
                console.error(err);
                alert("Error submitting form. Please try again.");
            }
        });
    }


    /* ============================================================
       NAV SMOOTH SCROLL
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
