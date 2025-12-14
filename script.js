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
    const guestInputEN = document.getElementById("plus-one-name");

    if (checkboxEN) {
        checkboxEN.addEventListener("change", () => {
            guestInputEN.style.display = checkboxEN.checked ? "block" : "none";
        });
    }

   
    /* ============================================================
       SUCCESS MESSAGE HANDLER (FORMSPREE)
       ============================================================ */
    const rsvpForm = document.getElementById("rsvp-form");
    const successMsg = document.getElementById("form-success");

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const formData = new FormData(this);

            const res = await fetch(this.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (res.ok) {
                successMsg.style.display = "block";
                rsvpForm.reset();
                guestInputEN.style.display = "none";
            } else {
                alert("Something went wrong. Please try again.");
            }
        });
    }


   /* ============================================================
      PLUS ONE LOGIC - CHINESE FORM
      ============================================================ */
   const checkboxZH = document.getElementById("plus-one-checkbox-zh");
   const guestInputZH = document.getElementById("plus-one-name-zh");
   
   if (checkboxZH) {
       checkboxZH.addEventListener("change", () => {
           guestInputZH.style.display = checkboxZH.checked ? "block" : "none";
       });
   }
   
   
   /* ============================================================
      SUCCESS MESSAGE HANDLER FORMSPREE - CHINESE
      ============================================================ */
   const rsvpFormZH = document.getElementById("rsvp-form-zh");
   const successMsgZH = document.getElementById("form-success-zh");
   
   if (rsvpFormZH) {
       rsvpFormZH.addEventListener("submit", async function (e) {
           e.preventDefault();
   
           const formData = new FormData(this);
   
           const res = await fetch(this.action, {
               method: "POST",
               body: formData,
               headers: { "Accept": "application/json" }
           });
   
           if (res.ok) {
               successMsgZH.style.display = "block";
               rsvpFormZH.reset();
               guestInputZH.style.display = "none";
           } else {
               alert("提交失败，请稍后再试。");
           }
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

});

