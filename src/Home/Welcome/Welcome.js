import React, { useEffect } from "react";

import "./Welcome.css";

export function Welcome() {
  useEffect(() => {
    console.log("welcome mount");

    return () => {
      console.log("welcome unmount");
    };
  }, []);

  return (
    <div className="Welcome">
      <h2>Welcome</h2>
      <p>Hope your day will be good.</p>
    </div>
  );
}
