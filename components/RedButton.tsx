import React from "react";

interface RedButtonProps {
  onClick: () => void;
  label: string;
}

const RedButton = ({ onClick, label }: RedButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full mt-2 rounded-md bg-red-600 hover:bg-red-700 p-2 text-center font-medium"
    >
      {label}
    </button>
  );
};

export default RedButton;
