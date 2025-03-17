import { NavCancelImg, learnSphereLogo } from "../../assets/assets";
import { Link } from "react-router-dom";

const SideNavTemplate = ({ SideNavProps, showNav, onClose }) => {
    return(
        <div className={`fixed top-0 left-0 h-full w-1/4 bg-white shadow-lg z-50 transform ${showNav ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200`}>
            <div className="flex align-center justify-center">
                <img src={NavCancelImg} alt="cancleVector" className="cursor-pointer" onClick={onClose} />
            </div>
            <div className="flex align-center justify-center">
                <img src={learnSphereLogo} alt="learnSpherelogo" className="" />
            </div>
            <div className="flex flex-col gap-y-4 [&>*:last-child]:mt-4 ml-2 mr-2"> {/*4 = 8px */}
                {SideNavProps.map(SideNavProp => (
                    <Link to={SideNavProp.path} key={SideNavProp.key}>
                        <SmallButton icon={SideNavProp.icon} title={SideNavProp.title} />
                    </Link>
                ))}
            </div>
        </div>
    )
}

const SmallButton = ({icon, title}) => {
    return(
        <div className="flex flex-row hover:bg-[#D9D9D9] p-4 rounded-lg">
            <div className="basis-1/3 flex item-center justify-center">
                <img src={icon} alt={title} className="w-[40px]" />
            </div>
            <div className="flex items-center justify-start basis-2/3 text-center">
                <p>{title}</p>
            </div>
        </div>
    )
}

export default SideNavTemplate;