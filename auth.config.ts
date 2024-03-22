import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import bcryptjs from "bcryptjs";
export default {
	providers: [
		Credentials({
			async authorize(credentials) {
				// Adding validation here as well, because some user might not use login form and directly could directly make request to api
				const validatedFields = LoginSchema.safeParse(credentials);

				if (validatedFields.success) {
					const { email, password } = validatedFields.data;

					const user = await getUserByEmail(email);

					// condition to check if user exist or if user exist but they dont have password because they've an account using google/github provider
					if (!user || !user.password) return null;

					const passwordsMatch = await bcryptjs.compare(
						password,
						user.password
					);

					if (passwordsMatch) return user;
				}

				return null;
			},
		}),
	],
} satisfies NextAuthConfig;
