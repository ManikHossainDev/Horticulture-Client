import React from "react";
import SubNav from "./SubNav";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header>
      <div className="hidden md:block">
        <SubNav />
      </div>
      <Navbar />
    </header>
  );
};

export default Header;
