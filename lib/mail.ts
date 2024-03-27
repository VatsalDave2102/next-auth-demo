import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (email: string, token: string) => {
	const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Password reset",
		html: `<p>Click <a href="${resetLink}">here</a></p> to reset your password.`,
	});
};

export const sendVerificationEmail = async (email: string, token: string) => {
	const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

	await resend.emails.send({
		from: "onboarding@resend.dev",
		to: email,
		subject: "Confirm your email",
		html: `<p>Click <a href="${confirmLink}">here</a></p> to confirm your email.`,
	});
};
