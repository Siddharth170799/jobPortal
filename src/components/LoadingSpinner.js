import React from "react";

const LoadingSpinner = () => {
  const spinnerStyle = {
    display: "inline-block",
    width: "80px",
    height: "80px",
    border: "8px solid #f3f3f3",
    borderRadius: "50%",
    borderTop: "8px solid #ff6600", // Orange color
    animation: "spin 1.5s linear infinite",
    margin: "20px auto",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh", // Center vertically
  };

  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <style>
        {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingSpinner;
