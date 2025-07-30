import React from "react";

type SpinnerProps = {
    size?: number; // in px
    color?: string;
};

const SpinnerLoader: React.FC<SpinnerProps> = ({ size = 24, color = "white" }) => {
    return (
        <div
            className="animate-spin rounded-full border-2 border-t-transparent"
            style={{
                width: size,
                height: size,
                borderColor: color,
                borderTopColor: "transparent",
            }}
        />
    );
};

export default SpinnerLoader;
