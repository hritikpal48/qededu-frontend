import React from "react";
import clsx from "clsx";
import SpinnerLoader from "../loader/SpinerLoader";
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

type LoaderButton = {
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
  text: string;
};

export const DefaultButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        "border border-white px-4 py-1 rounded transition cursor-pointer", // Base styles
        "disabled:opacity-50 disabled:cursor-not-allowed", // Disabled states
        className // Custom classes will override
      )}
    >
      {children}
    </button>
  );
};

export const LoaderButton: React.FC<LoaderButton> = ({
  onClick,
  type = "button",
  className = "",
  loading = false,
  text,
}) => {
  return (
    <DefaultButton
      onClick={onClick}
      type={type}
      className={className}
      disabled={loading}
    >
      {loading ? (
        <>
          <div className="flex justify-center py-1">
            <SpinnerLoader size={20} />
          </div>
        </>
      ) : (
        text
      )}
    </DefaultButton>
  );
};
