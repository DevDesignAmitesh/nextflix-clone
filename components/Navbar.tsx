import React from "react";
import NavItems from "./NavItems";
import { IoSearch } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-14 py-5">
      <div className="flex justify-center items-center gap-10">
        <img
          className="h-[30px]"
          src={
            "https://raw.githubusercontent.com/burakorkmez/mern-netflix-clone/refs/heads/master/frontend/public/netflix-logo.png"
          }
          alt="logo"
        />
        <NavItems />
      </div>
      <div className="flex relative gap-6 justify-center items-center">
        <IoSearch size={27} />
        <div className="group flex gap-2 justify-center items-center">
          <MdAccountCircle size={27} />
          <IoIosArrowDown size={15} className="group-hover:rotate-180 transition" />
          <div className="w-[200px] flex-col justify-center items-center top-[35px] hidden group-hover:flex right-0 absolute h-[200px] bg-black opacity-80"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
