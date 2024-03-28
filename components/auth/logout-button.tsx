"use client";

import { logout } from "@/actions/logout";

interface LogoutButtonProps {
	children?: React.ReactNode;
}

export default function LogoutButon({ children }: LogoutButtonProps) {
	const onClick = async () => {
		await logout();
	};

	return (
		<span className="cursor-pointer" onClick={onClick}>
			{children}
		</span>
	);
}
