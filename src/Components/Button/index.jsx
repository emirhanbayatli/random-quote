export const Button = ({ label, handleOnClick, className }) => {
  return (
    <>
      <button className={className} onClick={handleOnClick}>
        {label}
      </button>
    </>
    <button
      className={`bg-slate-400 px-5 py-4 mx-3 my-0.5 transition-colors duration-300 ease-in-out rounded-lg hover:bg-slate-500 hover:text-slate-900 text-white ${className}`}
      onClick={handleOnClick}
    >
      {label}
    </button>
  );
};
