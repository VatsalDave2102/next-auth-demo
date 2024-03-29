"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { CardWrapper } from "./card-wrapper";
import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "../ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export const LoginForm = () => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");
	const urlError =
		searchParams.get("error") === "OAuthAccountNotLinked"
			? "Email already in use with different provider"
			: "";
	const [showTwoFactor, setShowTwoFactor] = useState(false);
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
			login(values, callbackUrl)
				.then((data) => {
					if (data?.error) {
						form.reset();
						setError(data?.error);
					}
					if (data?.success) {
						form.reset();
						setSuccess(data?.success);
					}

					if (data?.twoFactor) {
						setShowTwoFactor(true);
					}
				})
				.catch(() => setError("Something went wrong!"));
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
						{showTwoFactor && (
							<FormField
								control={form.control}
								name="code"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Two Factor Code</FormLabel>
										<FormControl>
											<InputOTP
												maxLength={6}
												pattern={REGEXP_ONLY_DIGITS}
												{...field}
											>
												<InputOTPGroup>
													<InputOTPSlot index={0} />
													<InputOTPSlot index={1} />
													<InputOTPSlot index={2} />

													<InputOTPSlot index={3} />
													<InputOTPSlot index={4} />
													<InputOTPSlot index={5} />
												</InputOTPGroup>
											</InputOTP>
										</FormControl>
										<FormDescription>
											Please enter 2FA Code sent to your registered email
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						)}
						{!showTwoFactor && (
							<>
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
												<Input
													{...field}
													placeholder="******"
													type="password"
													disabled={isPending}
												/>
											</FormControl>
											<Button
												size="sm"
												variant="link"
												asChild
												className="px-0 font-normal"
											>
												<Link href="/auth/reset">Forgot password?</Link>
											</Button>
											<FormMessage />
										</FormItem>
									)}
								/>
							</>
						)}
					</div>
					<FormError message={error || urlError} />
					<FormSuccess message={success} />
					<Button type="submit" className="w-full" disabled={isPending}>
						{showTwoFactor ? "Confirm" : "Login"}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};
