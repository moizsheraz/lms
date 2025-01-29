import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOTP = async (to, otp) => {

    const msg = {
        to: to,
        from: 'service.justagame@gmail.com', 
        subject: 'Verify Your email',
        text: 'This is your 4-digit OTP to verify that it’s really you.',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f0f8ff; padding: 20px; border-radius: 5px;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #00aaff;">email Verification</h1>
            </div>
            <div style="padding: 20px; border: 1px solid #00aaff; border-radius: 5px; background-color: white;">
              <h2 style="color: #333;">Your Verification Code</h2>
              <p style="font-size: 24px; font-weight: bold; color: #00aaff;">${otp}</p>
              <p style="font-size: 16px; color: #555;">Please use this code to verify your email address. If you didn’t request this, please ignore this message.</p>
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <p style="font-size: 14px; color: #777;">Thank you for choosing our service!</p>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #999;">
              <p>If you have any questions, feel free to <a href="mailto:support@example.com" style="color: #00aaff; text-decoration: none;">contact us</a>.</p>
            </div>
          </div>
        `,
      };

  try {
    await sgMail.send(msg);
    console.log('Verification email sent successfully');
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
};
export  const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
};
