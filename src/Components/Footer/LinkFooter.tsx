import Link from "next/link";
import { ReactNode } from "react";

type Props = {
    href: string;
    children: ReactNode;
}
export default function LinkFooter({href, children}: Props) {
    return (
        <Link href={href} className="w-fit py-[2px] text-md hover:text-blue-500 hover:font-medium transition-all">
            {children}
        </Link>
    );
}