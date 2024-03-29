import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_API_URL;

export const sendTwoFactorEmail = async (email: string, token: string) => {
	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "2FA Code",
		html: `<p>Your 2FA Code: ${token}</p>`,
	});
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `${domain}/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Password reset",
		html: `<p>Click <a href="${resetLink}">here</a></p> to reset your password.`,
	});
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Confirm your email",
		html: `<p>Click <a href="${confirmLink}">here</a></p> to confirm your email.`,
	});
};
