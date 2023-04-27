import client from "@sendgrid/client";

import { NextResponse } from "next/server";

client.setApiKey(process.env.SENDGRID_API_KEY || "");

export async function POST(req) {
    const { email } = await req.json();

    if (!email) {
        return NextResponse.json({
            success: false,
            data: "No email found"
        });
    }

    const data = { contacts: [{ email }] };

    const request = {
        url: `/v3/marketing/contacts`,
        method: "PUT",
        body: data
    };

    try {
        const [response, body] = await client.request(request);

        const message = `Email added: ${email} | job_id: ${response.body}`;

        console.log(message);

        return NextResponse.json({ success: true, message });
    } catch (error) {
        console.error(
            `ERROR adding email: ${email} - ${error.message}}`
        );

        return NextResponse.json({
            success: false,
            message: "Error"
        });
    }
}
