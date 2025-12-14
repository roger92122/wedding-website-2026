/* ============================================================
   Custom Slow Smooth Scroll WITH NAVBAR OFFSET
   ============================================================ */
function smoothScrollTo(target, duration = 1500, offset = 80) {

    const start = window.pageYOffset;
    const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
    const end = targetTop - offset;   // <-- OFFSET HERE

    const distance = end - start;
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;

        // ease-in-out curve (Apple-like)
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
   LANGUAGE SWITCHER  (MUST BE OUTSIDE smoothScrollTo)
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
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
});
/* ============================================================
   PLUS ONE LOGIC
   ============================================================ */
   const checkboxEN = document.getElementById("plus-one-checkbox");
   const checkboxZH = document.getElementById("plus-one-checkbox-zh");
   
   const guestInputEN = document.getElementById("plus-one-name");
   const guestInputZH = document.getElementById("plus-one-name-zh");
   
   // English checkbox
   checkboxEN.addEventListener("change", () => {
       guestInputEN.style.display = checkboxEN.checked ? "block" : "none";
   });
   
   // Chinese checkbox
   checkboxZH.addEventListener("change", () => {
       guestInputZH.style.display = checkboxZH.checked ? "block" : "none";
   });

/* ============================================================
   Attach to nav links (with mobile/desktop offsets)
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));
        if (!target) return;

        const isMobile = window.innerWidth < 768;
        const offset = isMobile ? 80 : 40; // adjust to your preference

        smoothScrollTo(target, 1700, offset);
    });
});

document.getElementById("rsvp-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
        name: this.querySelector("[name='name']").value,
        email: this.querySelector("[name='email']").value,
        attendance: this.querySelector("[name='attendance']").value,
        guestName: document.getElementById("plus-one-checkbox").checked
            ? document.getElementById("plus-one-name").value
            : ""
    };

    const res = await fetch("/send-rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    });

    const data = await res.json();
    alert(data.message);
});



