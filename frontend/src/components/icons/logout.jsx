import React from "react";

function LogoutIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      {...props}
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"></path>
      <path d="M16 17L21 12 16 7"></path>
      <path d="M21 12L9 12"></path>
    </svg>
  );
}

export default LogoutIcon;
