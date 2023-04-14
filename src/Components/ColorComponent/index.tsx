import React, { FC, useEffect, useState } from "react";
import { Clipboard as ClipboardIcon } from "react-feather";

import styles  from "./colors.module.css"
import Link from "next/link";
import {isColorBright} from "@/utility/helpers";

  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

interface ColorProps {
  color: string,
  width?: number | "100%",
  height?: number | "100%",
  name?: string,
  padding?: boolean
  copy?: boolean
}

const Color:FC<ColorProps> = ({color="#fff", width = 100,  height = 100, name, padding, copy}) => {

  const [isBright, setIsBright] = useState<boolean>(false)

  useEffect(() => {
    setIsBright(isColorBright(color))
  }, [color])

  const handleClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
  }

  const notify = () => {
    return (
      toast('✅ Color copy to the clipboard!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    )
  };

  return (
    <div style={{padding: padding ? "1rem" : 0 }}>
      {copy ? (
          <div 
          onClick={() => {
            notify()
            handleClipboard(color)
          }}
          style={{ width: width, height: height, backgroundColor: color}}  
          className={`cursor-pointer rounded-lg my-4 flex justify-center items-center ${styles.container}`}>
            <p className={`font-bold text-2xl ${styles.colorName} ${isBright ? "text-black" : "text-white"}`}>{color}</p>
        </div >
      ) : (
        <Link 
          href={`Palette/${color.substring(1)}`}
          style={{ width: width, height: height, backgroundColor: color}}  
          className={`cursor-pointer rounded-lg my-4 flex justify-center items-center ${styles.container}`}>
            <p className={`font-bold text-2xl ${styles.colorName} ${isBright ? "text-black" : "text-white"}`}>{color}</p>
        </Link >
      )} 
      {name &&
        <div className="flex text-white justify-between items-center">
          <span className="text-withe">{name}</span>
          <ClipboardIcon 
            size={16} 
            className="cursor-pointer"
            onClick={() => {
              notify()
              handleClipboard(color)
            }}
            color={"#fff"}
            />
        </div>
      }
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
};

export default Color;
