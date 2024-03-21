"use client";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";

export const Social = () => {
	return (
		<div className="flex items-center w-full gap-x-2">
			<Button className="w-full" variant="outline" size="lg" onClick={() => {}}>
				<FcGoogle className="w-5 h-5" />
			</Button>
			<Button className="w-full" variant="outline" size="lg" onClick={() => {}}>
				<FaGithub className="w-5 h-5" />
			</Button>
		</div>
	);
};
