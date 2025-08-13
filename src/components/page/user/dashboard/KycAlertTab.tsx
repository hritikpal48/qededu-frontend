import React from "react";

const KycAlertTab = () => {
  return (
    <>
      <div className="bg-[#d1efcf] border border-[#badbb8] text-green-700 px-4 py-3 rounded mb-6 text-sm flex justify-between items-center">
        <div className="flex align-center gap-1">
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              className="mt-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m479.07 111.36-.79-12.53-12.36-2.21c-86.5-15.52-122.61-26.74-203.33-63.2l-6.59-3-6.59 3C168.69 69.88 132.58 81.1 46.08 96.62l-12.36 2.21-.79 12.53c-3.85 61.11 4.36 118.05 24.43 169.24A349.47 349.47 0 0 0 129 393.11c53.47 56.73 110.24 81.37 121.07 85.73l6 2.41 6-2.41c10.83-4.36 67.6-29 121.07-85.73a349.47 349.47 0 0 0 71.5-112.51c20.07-51.19 28.28-108.13 24.43-169.24zm-252.91 216L153.37 256l22.4-22.86 48.47 47.49 110.13-127.2 24.2 20.94z"></path>
            </svg>
          </span>
          Kindly complete your KYC to continue.
        </div>
        <div className="flex align-center gap-1">
          <span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              className="mt-1"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></path>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
            </svg>
          </span>
          It will only take a few minutes
        </div>
      </div>
    </>
  );
};

export default KycAlertTab;
