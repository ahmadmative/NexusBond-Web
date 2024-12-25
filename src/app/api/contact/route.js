import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.hostinger.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'nexusbond@calcite.live',
        pass: 'iC1BZq^nj&'
      }
    });

    // Email content
    const mailOptions = {
      from: 'nexusbond@calcite.live',
      to: 'contact@nexusbond.ai',
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
} 