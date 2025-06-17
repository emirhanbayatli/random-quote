import { BtnProps } from "../../types";
export const Button = ({
  label,
  handleOnClick,
  className,
  disabled,
  type,
}: BtnProps) => {
  return (
    <button
      className={` 
  bg-slate-400 px-5 py-4 mx-3 my-0.5 
  transition-colors duration-300 ease-in-out 
  rounded-lg hover:bg-slate-500 hover:text-slate-900 
  text-white ${className}`}
      onClick={handleOnClick}
      disabled={disabled}
      type={type}
    >
      {label}
    </button>
  );
};
