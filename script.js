/* ============================================================
   Smooth Scroll with Offset
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

        if (timeElapsed < duration) requestAnimationFrame(animation);
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
        document.querySelectorAll(".lang-en").forEach(el => el.style.display = "block");
        document.querySelectorAll(".lang-zh").forEach(el => el.style.display = "none");
        btnEN.classList.add("active");
        btnZH.classList.remove("active");
    });

    btnZH.addEventListener("click", () => {
        document.querySelectorAll(".lang-en").forEach(el => el.style.display = "none");
        document.querySelectorAll(".lang-zh").forEach(el => el.style.display = "block");
        btnZH.classList.add("active");
        btnEN.classList.remove("active");
    });


    /* ============================================================
       PLUS ONE (EN)
       ============================================================ */
    const checkboxEN = document.getElementById("plus-one-checkbox");
    const guestInputEN = document.getElementById("plus-one-name");

    checkboxEN.addEventListener("change", () => {
        guestInputEN.style.display = checkboxEN.checked ? "block" : "none";
    });


    /* ============================================================
       PLUS ONE (ZH)
       ============================================================ */
    const checkboxZH = document.getElementById("plus-one-checkbox-zh");
    const guestInputZH = document.getElementById("plus-one-name-zh");

    checkboxZH.addEventListener("change", () => {
        guestInputZH.style.display = checkboxZH.checked ? "block" : "none";
    });


    /* ============================================================
       Formspree Submission (Single Handler)
       ============================================================ */
    const rsvpForm = document.getElementById("rsvp-form");
    const successMsgEN = document.getElementById("form-success");
    const successMsgZH = document.getElementById("form-success-zh");

    rsvpForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(rsvpForm);

        const res = await fetch(rsvpForm.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (res.ok) {
            // Show success based on language
            if (btnEN.classList.contains("active")) {
                successMsgEN.style.display = "block";
                successMsgZH.style.display = "none";
            } else {
                successMsgZH.style.display = "block";
                successMsgEN.style.display = "none";
            }

            rsvpForm.reset();
            guestInputEN.style.display = "none";
            guestInputZH.style.display = "none";
        } else {
            alert("Error submitting form. Please try again.");
        }
    });


    /* ============================================================
       Smooth Scroll for Nav
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
