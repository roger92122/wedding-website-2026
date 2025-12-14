import { Resend } from 'resend';

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, attendance, guestName } = req.body;

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: "RSVP <onboarding@resend.dev>",
            to: "haoranchi0105@outlook.com",        // CHANGE
            subject: "New Wedding RSVP",
            text: `
A new RSVP has been received

Name: ${name}
Email: ${email}
Attendance: ${attendance}
Guest: ${guestName ? guestName : "No guest"}
            `
        });

        res.status(200).json({ message: "RSVP sent successfully!" });

    } catch (error) {
        console.error("Resend Error:", error);
        res.status(500).json({ error: "Failed to send RSVP" });
    }
}

