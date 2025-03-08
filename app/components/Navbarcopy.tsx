"use client"

import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isMenuOpen,setIsMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  //close dropdown when clicking outside 
  useEffect(()=>{
    const handleClickOutside = (event: MouseEvent)=>{
      if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)){
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown",handleClickOutside);
    return ()=> document.removeEventListener("mousedown",handleClickOutside)
  },[])

  return (
    <nav className="flex justify-between  m-8">
      <div>
        <h2 className="text-2xl font-bold text-customPink tracking-widest">
          Blogs
        </h2>

      </div>
      <div className="flex space-x-4">
        <div className="flex">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path><path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path></svg>
          </div>
          Write
        </div>
        {/* Profile Dropdown */}
        <div ref={dropdownRef} className="relative">
          <button onClick={()=>{
            setIsMenuOpen(!isMenuOpen)
          }}>Profile</button>
        </div>
        {isMenuOpen && (<div className="absolute">
          <button className="mt-10">Profile</button>
          <button>Sign Out</button>
        </div>)}
        
      </div>
    </nav>
  );
};

export default Navbar;