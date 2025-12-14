/* Smooth scroll */
function smoothScrollTo(target, duration = 1500, offset = 80) {
    const start = window.pageYOffset;
    const end = target.getBoundingClientRect().top + window.pageYOffset - offset;
    const distance = end - start;
    let startTime = null;

    function animation(current) {
        if (!startTime) startTime = current;
        const elapsed = current - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const ease = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        window.scrollTo(0, start + distance * ease);
        if (elapsed < duration) requestAnimationFrame(animation);
    }

    requestAnimationFrame(animation);
}

document.addEventListener("DOMContentLoaded", () => {

    /* Language toggle */
    document.getElementById("lang-en").addEventListener("click", () => {
        document.querySelectorAll(".lang-en").forEach(e => e.style.display = "block");
        document.querySelectorAll(".lang-zh").forEach(e => e.style.display = "none");

        document.getElementById("lang-en").classList.add("active");
        document.getElementById("lang-zh").classList.remove("active");
    });

    document.getElementById("lang-zh").addEventListener("click", () => {
        document.querySelectorAll(".lang-en").forEach(e => e.style.display = "none");
        document.querySelectorAll(".lang-zh").forEach(e => e.style.display = "block");

        document.getElementById("lang-zh").classList.add("active");
        document.getElementById("lang-en").classList.remove("active");
    });


    /* Plus-one EN */
    const enCheck = document.getElementById("plus-one-checkbox-en");
    const enName = document.getElementById("plus-one-name-en");
    enCheck.addEventListener("change", () => enName.style.display = enCheck.checked ? "block" : "none");


    /* Plus-one ZH */
    const zhCheck = document.getElementById("plus-one-checkbox-zh");
    const zhName = document.getElementById("plus-one-name-zh");
    zhCheck.addEventListener("change", () => zhName.style.display = zhCheck.checked ? "block" : "none");


    /* Form handler */
    function handleForm(idForm, idSuccess) {
        const form = document.getElementById(idForm);
        const success = document.getElementById(idSuccess);

        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const data = new FormData(form);

            const res = await fetch(form.action, {
                method: "POST",
                body: data,
                headers: { "Accept": "application/json" }
            });

            if (res.ok) {
                success.style.display = "block";
                form.reset();
                enName.style.display = "none";
                zhName.style.display = "none";
            } else {
                alert("Submission failed. Try again.");
            }
        });
    }

    handleForm("rsvp-form-en", "form-success-en");
    handleForm("rsvp-form-zh", "form-success-zh");
});
