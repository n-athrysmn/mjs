"use client";

import React, { useEffect, useState } from "react";

const Stars = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const stars = Array.from({ length: 2000 });

  return (
    <div className="pointer-events-none fixed left-0 top-0 z-0 hidden h-screen w-screen overflow-hidden md:block">
      {dimensions.width > 0 &&
        stars.map((_, i) => (
          <div
            key={i}
            className="absolute animate-twinkle rounded-full bg-slate-200"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * dimensions.height}px`,
              left: `${Math.random() * dimensions.width}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 3 + 2}s`,
            }}
          />
        ))}
    </div>
  );
};

export default Stars;
