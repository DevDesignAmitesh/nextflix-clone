"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import BrowseOption from "./BrowseOption";

const NavItems = () => {
  const [browsePannel, setBrowsePannel] = useState<boolean>(false);

  return (
    <>
      <BrowseOption className="lg:flex hidden" />
      <div
        onClick={() => setBrowsePannel((p) => !p)}
        className="flex relative cursor-pointer lg:hidden text-[14px] justify-center items-center gap-2"
      >
        <p>Browse</p>
        <IoIosArrowDown className={`${browsePannel ? "rotate-180" : "rotate-0"} transition`} size={15} />
        {browsePannel && (
          <div className="absolute p-3 rounded-md top-10 right-0 bg-black opacity-80">
            <BrowseOption className="lg:hidden flex flex-col whitespace-nowrap" />
          </div>
        )}
      </div>
    </>
  );
};

export default NavItems;
