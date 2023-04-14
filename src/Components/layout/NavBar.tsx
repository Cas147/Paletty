import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import { Menu, Plus } from "react-feather";

//styles
import styles from "./layout.module.css"

//images
import UserIcon from "@/assets/icons/ColorsLogo.svg"



type Props = {
  onMenuButtonClick(): void
};

const Navbar = (props: Props) => {
  return (
  <nav className="flex z-40 backdrop-blur-sm border-b-2 border-b-stone-500  p-4 bg-transparent sticky top-0 flex w-screen items-center justify-center">
    <div className="flex items-center h-full justify-between w-full md:w-11/12 lg:w-10/12 rounded-l-2xl shadow-lg">
      <Link href="/" className="font-bold text-4xl hidden md:block">
      Paletty
      </Link>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <Menu className="h-6 w-6" color={"#fff"}/>
      </button>
      <div className="flex items-center shadow-2xl h-full mx-4">
        <Link 
         href={"/list"} 
          className={styles.mainButton}>
          Color list
        </Link>
      </div>
    </div>
   </nav>
  );
};

export default Navbar;