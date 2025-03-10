"use client";

import SvgIconUse from "@/app/components/ui/SvgIconUse";
import { useState } from "react";

const Toolbar = ({ onSelect }: { onSelect: (option: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Floating + Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`transition-transform duration-300 ${
          isOpen ? "rotate-45" : ""
        }`}
      >
       <SvgIconUse></SvgIconUse>
      </button>

      {/* Toolbar Menu */}
      {isOpen && (
        <div className="absolute left-10 bg-white shadow-md rounded p-2 flex space-x-2">
          <button onClick={() => onSelect("text")}>📝</button>
          <button onClick={() => onSelect("image")}>🖼️</button>
          <button onClick={() => onSelect("code")}>💻</button>
          <button onClick={() => onSelect("quote")}>❝❞</button>
          <button onClick={() => onSelect("divider")}>—</button>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
