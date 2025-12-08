// Handle RSVP form
document.getElementById("rsvp-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const attendance = document.getElementById("attendance").value;

    const msg =
        attendance === "yes"
            ? `Thank you, ${name}! We are excited to see you!`
            : `Thank you for letting us know, ${name}.`;

    document.getElementById("confirmation").textContent = msg;

    this.reset();
});
