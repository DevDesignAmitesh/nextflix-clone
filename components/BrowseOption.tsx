import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface navItemsProps {
  label: string;
  path: string;
}

interface navItemsProps2 {
  className?: string;
}

const BrowseOption = ({ className }: navItemsProps2) => {
  const navItems: navItemsProps[] = [
    { label: "Home", path: "/" },
    { label: "My List", path: "/list" },
  ];

  const pathName = usePathname();
  return (
    <div
      className={`flex justify-center items-center gap-4 text-[14px] capitalize ${className}`}
    >
      {navItems.map((item) => {
        const isActive = pathName === item.path;
        return (
          <Link
            key={item.label}
            href={item.path}
            className={`transition-all font-[300] ${
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

export default BrowseOption;
