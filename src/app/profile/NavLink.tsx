"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface NavLinkProps {
  href: string;
  label: string;
  className?: string;
}

function NavLink({ href, label, className }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        "relative   font-bold text-lg transition-colors flex-col  ",
        isActive ? "text-[#D20653]" : "text-gray-400 hover:text-gray-600",
        className
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 h-[7px] w-[44px] -translate-x-1/2 rounded-t-full bg-[#D20653]" />
      )}
    </Link>
  );
}

export default NavLink;
