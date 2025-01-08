"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface navItemsProps {
  label: string;
  path: string;
}

const NavItems = () => {
  const navItems: navItemsProps[] = [
    { label: "Home", path: "/" },
    { label: "TV Shows", path: "/about" },
    { label: "Movies", path: "/services" },
    { label: "New & Popular", path: "/contact" },
    { label: "My List", path: "/list" },
    { label: "Browse By Language", path: "/browse" },
  ];

  const pathName = usePathname();

  return (
    <div className="flex justify-center items-center gap-4 text-[14px] capitalize">
      {navItems.map((item) => {
        const isActive = pathName === item.path;
        return (
          <Link
            key={item.label}
            href={item.path}
            className={`transition-all font-[300] cursor-pointer ${
              isActive ? "font-[500]" : "hover:opacity-60"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
};

export default NavItems;
