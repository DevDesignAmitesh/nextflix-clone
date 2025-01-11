import React from "react";

interface StatementProps {
  label: string;
  span: string;
  onClick: () => void;
}

const Statement = ({ label, span, onClick }: StatementProps) => {
  return (
    <p className="text-[14px] mt-2 text-neutral-500 font-medium">
      {label}{" "}
      <span onClick={onClick} className="text-white cursor-pointer">
        {span}
      </span>
    </p>
  );
};

export default Statement;
