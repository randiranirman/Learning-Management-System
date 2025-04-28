import { Menu, Transition } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { Fragment } from "react";
import { userImage } from "../../assets/assets";
import { Link } from "react-router-dom";

const DropDownTemplate = ({ DropDownProps }) => {
  return (
    <div className="relative inline-block text-left m-5">
      <Menu as="div" className="relative">
        <div className="flex items-center gap-3">
          <span className="text-xl text-white font-semibold">Hi, Chanuka</span>
          <img
            src={userImage}
            alt="Profile"
            className="w-12 h-12 rounded-full" 
          />
          <Menu.Button className="focus:outline-none">
            {({ open }) => open ? (
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
          <Menu.Items className="absolute mt-2 w-56 bg-[#5038ED] rounded-lg shadow-lg right-0 text-white">
            {DropDownProps.map(
              DropDownProp => (
                <Menu.Item key={DropDownProp.key}>
                  {({ active }) => (
                    <Link to={DropDownProp.path} className={`block px-5 py-3 text-center text-xl font-medium ${active ? "bg-[#705CF6]" : "bg-[#5038ED]"}`}>
                        {DropDownProp.title}
                    </Link>
                  )}
                </Menu.Item>
              )
            )}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}

export default DropDownTemplate;
