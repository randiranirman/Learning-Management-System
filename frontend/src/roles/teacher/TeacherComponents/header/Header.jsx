import { useState } from "react";
import navSelectorImg from "../../assets/nav-selector.svg";
import DropDown from "./DropDown";
import NavBar from "../navbar/NavBar";

const Header = () => {
    const [showNav, setShowNav] = useState(false);
    return(
        <div className="relative">
            <div className="flex justify-between bg-[#D9D9D9]">
                <div className="flex align-center justify-center ml-[10%]" onClick={() => setShowNav(true)}>
                    <img src={navSelectorImg} alt="navSelectorImg" className="cursor-pointer" />
                </div>
                <div className="flex justify-center align-center mr-[2%]">
                    <DropDown />
                </div>
            </div>
            {showNav && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setShowNav(false)} 
                />
            )}
            <NavBar showNav={showNav} onClose={() => setShowNav(false)} />
        </div>
    )
}

export default Header;