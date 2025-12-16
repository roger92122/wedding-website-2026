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

        // Apple-like ease-in-out
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
   ON PAGE LOAD
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
       SMOOTH SCROLL FOR NAV LINKS
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


    /* ============================================================
       SMOOTH SCROLL FOR HERO BUTTONS
       ============================================================ */
    document.querySelectorAll(".rsvp-button").forEach(btn => {
        btn.addEventListener("click", () => {
            const rsvpSection = document.getElementById("rsvp");
            const isMobile = window.innerWidth < 768;
            const offset = isMobile ? 80 : 40;

            smoothScrollTo(rsvpSection, 1700, offset);
        });
    });


    /* ============================================================
       PLUS ONE LOGIC (ENGLISH)
       ============================================================ */
    const checkboxEN = document.getElementById("plus-one-checkbox-en");
    const guestInputEN = document.getElementById("plus-one-name-en");

    if (checkboxEN) {
        checkboxEN.addEventListener("change", () => {
            guestInputEN.style.display = checkboxEN.checked ? "block" : "none";
        });
    }

    /* ============================================================
       PLUS ONE LOGIC (CHINESE)
       ============================================================ */
    const checkboxZH = document.getElementById("plus-one-checkbox-zh");
    const guestInputZH = document.getElementById("plus-one-name-zh");

    if (checkboxZH) {
        checkboxZH.addEventListener("change", () => {
            guestInputZH.style.display = checkboxZH.checked ? "block" : "none";
        });
    }


    /* ============================================================
       GENERIC FORMSPREE HANDLER FOR BOTH FORMS
       ============================================================ */
    function hookForm(formId, successId, guestInput) {
        const form = document.getElementById(formId);
        const successMsg = document.getElementById(successId);

        if (!form) return;

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(form);

            const res = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (res.ok) {
                successMsg.style.display = "block";
                form.reset();

                if (guestInput) guestInput.style.display = "none";
            } else {
                alert("Submission failed. Please try again.");
            }
        });
    }

    hookForm("rsvp-form-en", "form-success-en", guestInputEN);
    hookForm("rsvp-form-zh", "form-success-zh", guestInputZH);

   // FAQ TOGGLE
   document.querySelectorAll(".faq-question").forEach(q => {
       q.addEventListener("click", () => {
           const answer = q.nextElementSibling;
           answer.style.display = answer.style.display === "block" ? "none" : "block";
       });
   });


});

