"use client";

import React, { useEffect, useState } from "react";
import NavItems from "./NavItems";
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaRegBell } from "react-icons/fa";
import AccountOption from "./AccountOption";

const Navbar = ({ image }: { image: string }) => {
  const [accountPannel, setAccountPannel] = useState<boolean>(false);
  const [navbarBg, setNavbarBg] = useState<boolean>(false);
  const TOP_OFFSET = 66;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setNavbarBg(true);
      } else {
        setNavbarBg(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`w-full transition-all ${
        navbarBg ? "bg-black opacity-90" : ""
      } fixed z-40 flex justify-between items-center px-5 sm:px-14 py-2 sm:py-5`}
    >
      <div className="flex justify-center items-center gap-10">
        <img
          className="h-auto w-[10vw] max-w-[100px] min-w-[50px] object-contain"
          src={
            "https://raw.githubusercontent.com/burakorkmez/mern-netflix-clone/refs/heads/master/frontend/public/netflix-logo.png"
          }
          alt="logo"
        />

        <NavItems />
      </div>
      <div className="flex relative gap-6 justify-center items-center">
        <div
          onClick={() => setAccountPannel((p) => !p)}
          className="flex gap-2 justify-center cursor-pointer items-center"
        >
          {image ? (
            <img className="h-8 rounded-full" src={image} alt="profile" />
          ) : (
            <MdAccountCircle size={25} />
          )}
          <IoIosArrowDown
            size={15}
            className={`${accountPannel && "rotate-180"} transition`}
          />
          <AccountOption image={image} accountPannel={accountPannel} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
