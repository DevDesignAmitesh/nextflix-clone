import React from "react";
import { signOut } from "next-auth/react";
import { MdAccountCircle } from "react-icons/md";

interface accountProps {
  image: string;
  accountPannel: boolean;
}

const AccountOption = ({ image, accountPannel }: accountProps) => {
  if (!accountPannel) {
    return null;
  }
  return (
    <div
      className={`p-5 rounded-md flex-col justify-center items-start top-[50px] right-0 absolute gap-3 bg-black opacity-80 flex`}
    >
      <div className="flex gap-2 justify-start items-center">
        {image ? (
          <img className="h-8 rounded-full" src={image} alt="profile" />
        ) : (
          <MdAccountCircle size={25} />
        )}
      </div>
      <button
        className="text-[14px] hover:underline whitespace-nowrap"
        onClick={() => signOut()}
      >
        Sign out of Netflix
      </button>
    </div>
  );
};

export default AccountOption;
