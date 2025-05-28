import React, { useEffect, useState } from "react";
import { BiSolidSun, BiSolidMoon } from "react-icons/bi";

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    console.log("Class on <html>:", root); // Debug
  }, [theme]);

  return (
    <>
      {theme === "dark" ? (
        <BiSolidSun
          onClick={() => setTheme("light")}
          className="text-2xl cursor-pointer hover:text-amber-400 dark:text-white"
        />
      ) : (
        <BiSolidMoon
          onClick={() => setTheme("dark")}
          className="text-2xl cursor-pointer hover:text-amber-400"
        />
      )}
    </>
  );
};

export default DarkMode;