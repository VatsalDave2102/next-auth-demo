import * as z from "zod";

export const LoginSchema = z.object({
	email: z
		.string({ required_error: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
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
