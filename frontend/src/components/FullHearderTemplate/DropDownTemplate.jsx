import { Menu, Transition } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { userImage } from "../../assets/assets";
import { Link} from "react-router-dom";
import { logout } from "../../utils/authService";

const DropDownTemplate = ({ DropDownProps = [] }) => {
  const usernameDecoded = localStorage.getItem("usernameFromToken");


  
  return (
    <div className="relative inline-block text-left m-5">
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <div className="flex items-center gap-3">
              <span className="text-xl text-white font-semibold">Hi, {usernameDecoded}</span>
              <img
                src={userImage}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <Menu.Button className="focus:outline-none">
                {open ? (
                  <ChevronUpIcon className="w-8 h-8 text-white" />
                ) : (
                  <ChevronDownIcon className="w-8 h-8 text-white cursor-pointer" />
                )}
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition duration-200 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-150 ease-in"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Menu.Items className="absolute mt-2 w-56 bg-[#5038ED] rounded-lg shadow-lg right-0 text-white z-50">
                {DropDownProps.map(({ key, title, path }) => (
                  <div key={key}>
                    {title === "Log out" ? (
                      <button
                        onClick={logout}
                        className="block px-4 py-2 w-full text-left hover:bg-[#372ca3] rounded-md"
                      >
                        {title}
                      </button>
                    ) : (
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to={path}
                            className={`block px-4 py-2 ${
                              active ? "bg-[#372ca3]" : ""
                            } rounded-md`}
                          >
                            {title}
                          </Link>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  );
};

export default DropDownTemplate;
