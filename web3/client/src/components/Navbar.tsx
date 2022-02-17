import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import React, { ReactNode, useState } from "react";

import logo from "../../images/logo.png";

type Props = {};

type NavItemProps = {
  children: ReactNode;
  className?: string;
};

export function NavbarItem(props: NavItemProps) {
  return (
    <li className={`mx-4 cursor-pointer ${props.className ?? ""}`}>
      {props.children}
    </li>
  );
}

export default function Navbar({}: Props) {
  const MenuItemsLabels = ["Markets", "Exchanges", "Tutorials", "Wallets"];
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      <div className="md:flex-[0.5] flex-initial justify-center items-center">
        <img src={logo} alt="logo" className="w-32 cursor-pointer" />
      </div>
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {MenuItemsLabels.map((label: string, index: number) => (
          <NavbarItem key={label + index}>{label}</NavbarItem>
        ))}
        <NavbarItem className="bg-[#2952e3] py-2 px-7 rounded-full cursor-pointer hover:bg-[#2546bd] flex justify-center items-center">
          {" "}
          Login
        </NavbarItem>
      </ul>
      <div className="flex relative">
        {toggleMenu ? (
          <AiOutlineClose
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <HiMenuAlt4
            className="text-white md:hidden cursor-pointer"
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <ul
            className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in"
          >
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={() => setToggleMenu(false)} />
            </li>
            {MenuItemsLabels.map((label: string, index: number) => (
              <NavbarItem key={label + index} className="my-2 text-lg">
                {label}
              </NavbarItem>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
