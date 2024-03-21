"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";

export const LoginForm = () => {
	const [error, setError] = useState<string | undefined>();
	const [success, setSuccess] = useState<string | undefined>();

	const [isPending, startTransition] = useTransition();
	// defining form, providing type of LoginSchema and providing defaultValues
	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof LoginSchema>) {
		setError("");
		setSuccess("");
		startTransition(() => {
			login(values).then((data) => {
				setError(data.error);
				setSuccess(data.success);
			});
		});
	}

	return (
		<CardWrapper
			headerLabel="Welcome back"
			backButtonLabel="Don't have an account?"
			backButtonHref="/auth/register"
			showSocial
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					<div className="space-y-4">
						{/* Email field */}

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											placeholder="abcd.123@gmail.com"
											type="email"
											disabled={isPending}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{/* Password field */}
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										disabled={isPending}
										<Input {...field} placeholder="******" type="password" />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormError message={error} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full" disabled={isPending}>
						Login
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
