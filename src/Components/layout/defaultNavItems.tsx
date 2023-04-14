import {useRouter} from "next/router";
import React from "react";
import {
  Shuffle,
  List,
  Image,
  Home,
  Users,
} from "react-feather";
import { NavItem } from "./SideBar";

export const defaultNavItems: NavItem[] = [
  {
    label: "Random",
    href: `/Hotels/`,
    icon: <Shuffle className="w-6 h-6" />,
  },
  {
    label: "Color list",
    href: "/list",
    icon: <List className="w-6 h-6" />,
  },
  {
    label: "Image",
    href: `/Image`,
    icon: <Image className="w-6 h-6" />,
  },
  {
    label: "Color picker",
    href: `/Rooms/`,
    icon: <Home className="w-6 h-6" />,
  },
];
