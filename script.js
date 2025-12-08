// Highlight the active menu item based on URL
document.querySelectorAll('.nav-menu a').forEach(link => {
    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

// Smooth scroll for RSVP button on homepage
function goToRSVP() {
    window.location.href = "rsvp.html";
}

// RSVP form submission handler
if (document.getElementById("rsvp-form")) {
    document.getElementById("rsvp-form").addEventListener("submit", function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const attendance = document.getElementById("attendance").value;
        const message = attendance === "yes"
            ? `Thank you, ${name}! We look forward to celebrating with you!`
            : `Thank you for letting us know, ${name}.`;

        document.getElementById("confirmation").textContent = message;

        this.reset();
    });
}
