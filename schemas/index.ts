import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
	.object({
		name: z.optional(z.string()),
		isTwoFactorEnabled: z.optional(z.boolean()),
		role: z.enum([UserRole.ADMIN, UserRole.USER]),
		email: z.optional(z.string().email()),
		password: z.optional(z.string().min(6)),
		newPassword: z.optional(z.string().min(6)),
	})
	.refine(
		(data) => {
			if (data.password && !data.newPassword) {
				return false;
			}

			if (data.newPassword && !data.password) {
				return false;
			}
			return true;
		},
		{
			message: "New password is required",
			path: ["newPassword"],
		}
	);

export const NewPasswordSchema = z.object({
	password: z
		.string({ required_error: "Password is required" })
		.min(6, { message: "Minimun six characters required" }),
});

export const ResetSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email address" }),
});

export const LoginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
	code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z.string().min(6, { message: "Minimum six characters required" }),
	name: z.string().min(2, {
		message: "Name is required",
	}),
});
