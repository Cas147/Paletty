import React, { useRef } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";


import { defaultNavItems } from "./defaultNavItems";
import { useOnClickOutside } from "usehooks-ts";


import {useRouter} from "next/router";

import {
 LogOut
} from "react-feather";

export type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  id?: number
};

type Props = {
  open: boolean;
  navItems?: NavItem[];
  setOpen(open: boolean): void;
  id?: number
};
const Sidebar = ({ open, navItems = defaultNavItems, setOpen}: Props) => {
  const router = useRouter()
  const { id } = router.query

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, (e) => {
    setOpen(false);
  });

  return (
    <div className="h-screen p-0 md:p-4">
      <div
        className={classNames({
          "bg-indigo-50 backdrop-blur-sm text-zinc-50": true, // colors
          "md:sticky md:top-16 md:z-0 top-0 z-40 fixed": true, // positioning
          "h-screen md:h-full w-[300px]": true, // for height and width
          "transition-transform .3s ease-in-out md:-translate-x-0": true, //animations
          "-translate-x-full ": !open, //hide sidebar to the left when closed
        })}
        ref={ref}
      >
        <nav className="md:sticky top-0 md:top-1">
           <Link href="/" className='flex items-center justify-center my-8 text-black font-bold text-4xl'>
            Paletty
          </Link>
          <ul className="py-2 flex flex-col gap-2">
            {navItems.map((item, index) => {
              return (
                <Link key={index} href={`${item.href}${id}`}>
                  <li
                    className={classNames({
                      "text-indigo-900 hover:bg-indigo-500 hover:text-white": true, //colors
                      "flex gap-4 items-center ": true, //layout
                      "transition-colors duration-300": true, //animation
                      "rounded-md p-2 mx-2": true, //self style
                    })}
                  >
                    {item.icon} {item.label}
                  </li>
                </Link>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
