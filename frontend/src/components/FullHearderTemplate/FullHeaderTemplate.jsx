import DropDownTemplate from "./DropDownTemplate";
import { navSelectorImg } from "../../assets/assets";
import { useState } from "react";
import SideNavTemplate from "./SideNavTemplate";

const FullHeaderTemplate = ({DropDownProps, SideNavProps}) => {
    const [showNav, setShowNav] = useState(false);
    return(
        <div className="relative">
            <div className="flex justify-between bg-[#D9D9D9]">
                <div className="flex align-center justify-center ml-[10%]" onClick={() => setShowNav(true)}>
                    <img src={navSelectorImg} alt="navSelectorImg" className="cursor-pointer" />
                </div>
                <div className="flex justify-center align-center mr-[2%]">
                    <DropDownTemplate DropDownProps={DropDownProps} />
                </div>
            </div>
            {showNav && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={() => setShowNav(false)} 
                />
            )}
            <SideNavTemplate SideNavProps={SideNavProps} showNav={showNav} onClose={() => setShowNav(false)} />
        </div>
    )
}

export default FullHeaderTemplate;