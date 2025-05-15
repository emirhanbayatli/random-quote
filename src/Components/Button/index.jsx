import "./styles.css";

export const Button = ({ label, handleOnClick, className }) => {
  return (
    <>
      <button className={className} onClick={handleOnClick}>
        {label}
      </button>
    </>
  );
};
