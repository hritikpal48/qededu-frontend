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
                "bg-green-600 border text-white px-4 py-1 rounded hover:bg-green-400 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
                className
            )}
        >
            {children}
        </button>
    );
};


export const LoaderButton: React.FC<LoaderButton> = ({
    onClick,
    type = 'button',
    className = '',
    loading = false,
    text
}) => {
    return (
        <DefaultButton onClick={onClick} type={type} className={`h-10 flex items-center justify-center ${className}`} disabled={loading}>
            {loading ? <SpinnerLoader size={10} /> : text}
        </DefaultButton>
    )
}
