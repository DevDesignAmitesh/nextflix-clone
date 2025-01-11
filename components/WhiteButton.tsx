import React from "react";

interface WhiteButtonProps {
  onClick: () => void;
  children: any;
}

const WhiteButton = ({ onClick, children }: WhiteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-full cursor-pointer flex justify-center items-center p-2"
    >
      {children}
    </button>
  );
};

export default WhiteButton;
