import nodemailer from 'nodemailer';

const sendWelcomeEmail = async (senderId: string, receiverEmail: string) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'malikkirti7464@gmail.com',
      pass:"zfyqzrhwjjxieamx",
    },
  });

  const invitationLink=`http://localhost:5173/signup?senderId=${senderId}`
  const mailOptions = {
    from: 'malikkirti7464@gmail.com',
    to: `${receiverEmail}`,
    subject: 'OTP verification for registration ',
     html: `
    <p>Hello,</p>
    <p>You’ve received a friend request from a user. Click the link below to register and accept the request:</p>
    <p><a href="${invitationLink}" target="_blank">${invitationLink}</a></p>
    <p>If you didn’t request this invitation, please ignore this email.</p>
    <p>Regards,<br>Wave Connect</p>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export { sendWelcomeEmail };