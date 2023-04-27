import { NextResponse } from "next/server";

import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    const { fullName, email, message } = req.json();

    try {
        await sendgrid.send({
            to: "admin@exploreaitoday.com",
            from: "admin@exploreaitoday.com",
            replyTo: email,
            bcc: ["rtroman14@gmail.com"],
            subject: "Explore AI Today Website Form",
            html: `
            <div>
                <p>
                    <strong>Full Name: </strong>${fullName}
                </p>
                <p>
                    <strong>Email: </strong>${email}
                </p>
                <p>
                    <strong>Message: </strong>${message}
                </p>
            </div>
            `
        });
    } catch (error) {
        console.error(`ERROR submitting form: ${error.message}}`);

        return NextResponse.json({
            success: false,
            message: "Error"
        });
    }

    return NextResponse.json({
        success: true,
        data: { fullName, email, message }
    });
}
