import React from "react";
import { ButtonProps } from "@/interfaces";
import { CircularProgress } from "@mui/material";

const Button = ({
  text,
  classes,
  clickHandler,
  type,
  loading,
  icon,
}: ButtonProps) => {
  return (
    <button
      disabled={loading}
      type={type || "submit"}
      className={`text-light group bg-primary flex justify-center hover:bg-secondary font-medium rounded text-sm px-4 py-2 text-center items-center ${classes} ${
        loading && "pointer-events-none"
      }`}
      onClick={clickHandler}
    >
      {loading && <CircularProgress size={20} />}
      {loading ? (
        "Loading..."
      ) : (
        <span className="flex items-center">
          {text}{" "}
          <span className="ml-2 group-hover:translate-x-2 duration-300 transition-transform ">
            {icon}{" "}
          </span>{" "}
        </span>
      )}
    </button>
  );
};

export default React.memo(Button);
