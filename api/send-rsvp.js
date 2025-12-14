export const config = {
  runtime: "edge"
};

import { Resend } from "resend";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, attendance, guestName } = req.body;

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);

        await resend.emails.send({
            from: "RSVP <onboarding@resend.dev>",
            to: "haoranchi0105@outlook.com",
            subject: "New Wedding RSVP",
            html: `
                <h2>New RSVP Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Attendance:</strong> ${attendance}</p>
                <p><strong>Guest:</strong> ${guestName || "No guest"}</p>
            `
        });

        res.status(200).json({ message: "RSVP sent successfully!" });

    } catch (error) {
        console.error("Resend Error:", error);
        res.status(500).json({ error: "Failed to send RSVP" });
    }
}
