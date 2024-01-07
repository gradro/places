"use client";

import { navItems } from "@/constants"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NavLinks = () => {

    const pathname = usePathname();

    return (
        <ul role="list" className="flex flex-col md:flex-row align-middle gap-4">
            {navItems.length > 0 && navItems.map((item) => (
                <li role="presentation" key={item.label}>
                    <Link className={`p-2 text-[16px] hover:text-primary duration-200 transition-all md:font-medium focus:text-primary ${pathname === item.path && 'text-primary'}`} role="menuitem" href={item.path}>{item.label}</Link>
                </li>
            ))}
        </ul>
    )

}

export default NavLinks