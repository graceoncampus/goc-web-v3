import React from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div>
      <span>Landing Page!</span>
      {/* for testing */}
      <button onClick={() => navigate("/rides")}>
        go to rider signup
      </button>
    </div>
  );
};
