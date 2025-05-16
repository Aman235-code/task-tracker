import React, { useEffect, useState } from "react";

const Footer = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      const bodyHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      setIsSticky(bodyHeight <= windowHeight);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  return (
    <footer
      className={`bg-gray-900 text-white w-full ${
        isSticky ? "fixed bottom-0 left-0" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <p className="text-sm mb-2">
          &copy; {new Date().getFullYear()} Task Tracker. All rights reserved.
        </p>
        <p className="text-sm">Created by: Aman</p>
      </div>
    </footer>
  );
};

export default Footer;
