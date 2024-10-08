"use client";

interface IProps {
  text: string;
  type?: "button" | "reset" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  text,
  onClick,
  type = "button",
  disabled = false,
  className,
}: IProps) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`h-8 px-4 py-2 rounded-md border border-gray-300 text-gray-800 text-lg bg-white transition-colors duration-300 select-none ${
        disabled
          ? "cursor-default bg-gray-300"
          : "hover:bg-gray-200 active:bg-gray-300"
      } ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
