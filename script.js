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
   RUN EVERYTHING AFTER PAGE LOAD
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       LANGUAGE SWITCHER
       ============================================================ */
    const btnEN = document.getElementById("lang-en");
    const btnZH = document.getElementById("lang-zh");

    if (btnEN && btnZH) {
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
    }


    /* ============================================================
       PLUS ONE LOGIC
       ============================================================ */
    const checkboxEN = document.getElementById("plus-one-checkbox");
    const checkboxZH = document.getElementById("plus-one-checkbox-zh");

    const guestInputEN = document.getElementById("plus-one-name");
    const guestInputZH = document.getElementById("plus-one-name-zh");

    if (checkboxEN) {
        checkboxEN.addEventListener("change", () => {
            guestInputEN.style.display = checkboxEN.checked ? "block" : "none";
        });
    }

    if (checkboxZH) {
        checkboxZH.addEventListener("change", () => {
            guestInputZH.style.display = checkboxZH.checked ? "block" : "none";
        });
    }


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


/* ============================================================
      RSVP FORM SUBMISSION → RESEND API
   ============================================================ */
   const rsvpForm = document.getElementById("rsvp-form");
   
   if (rsvpForm) {
       rsvpForm.addEventListener("submit", async function (e) {
           e.preventDefault();
   
           const formData = {
               name: this.querySelector("[name='name']").value,
               email: this.querySelector("[name='email']").value,
               attendance: this.querySelector("[name='attendance']").value,
   
               // Support BOTH English and Chinese guest fields
               guestName:
                   (checkboxEN?.checked ? guestInputEN.value : "") ||
                   (checkboxZH?.checked ? guestInputZH.value : "")
           };
   
           try {
               const res = await fetch("/api/send-rsvp", {
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify(formData)
               });
   
               const data = await res.json();
               alert(data.message);
   
           } catch (err) {
               console.error("RSVP Submit Error:", err);
               alert("There was an error submitting your RSVP.");
           }
       });
   }


});

