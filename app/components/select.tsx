"use client";

import { useEffect, useRef, useState } from "react";
import React from "react";

interface Dropdown {
  items: string[];
}

const Dropdown: React.FC<Dropdown> = ({ items }) => {
  const [open, setOpen] = useState(false);
  const [selText, setselText] = useState("Select an Item");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //open/close for button
    function handleClickOutside(event: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setOpen(false); // Set your variable to false
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = ({ location }: { location: string }) => {
    setselText(location);
    setOpen((prev) => !prev);
  };

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className="relative text-black">
        <button
          type="button"
          className="px-4 py-2 bg-white border border-gray-300 rounded hover:outline hover:outline-blue-500 hover:outline-offset-2 transition"
          onClick={handleButtonClick}
          value={selText}
        >
          {selText}
        </button>
        <div
          ref={boxRef}
          className={`absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg z-10 ${
            open ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {items.map((location, index) =>
            selText != location ? (
              <div
                key={index}
                className="hover:bg-gray-200 transition"
                onClick={() => handleItemClick({ location: location })}
              >
                {location}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(Dropdown);
