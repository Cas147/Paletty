import React, { FC } from "react";
import { Clipboard as ClipboardIcon } from "react-feather";

import styles  from "./colors.module.css"
import Link from "next/link";

interface ColorProps {
  color: string,
  width?: number | "100%",
  height?: number | "100%",
  name?: string,
  padding?: boolean
  copy?: boolean
}

const Color:FC<ColorProps> = ({color="#fff", width = 100,  height = 100, name, padding, copy}) => {

  const handleClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
  }

  return (
    <div style={{padding: padding ? "1rem" : 0 }}>
      {copy ? (
          <div 
          onClick={() => handleClipboard(color)}
          style={{ width: width, height: height, backgroundColor: color}}  
          className={`cursor-pointer rounded-lg my-4 flex justify-center items-center ${styles.container}`}>
            <p className={`font-bold text-2xl ${styles.colorName}`}>{color}</p>
        </div >
      ) : (
        <Link 
          href={`Palette/${color.substring(1)}`}
          style={{ width: width, height: height, backgroundColor: color}}  
          className={`cursor-pointer rounded-lg my-4 flex justify-center items-center ${styles.container}`}>
            <p className={`font-bold text-2xl ${styles.colorName}`}>{color}</p>
        </Link >
      )} 
      {name &&
        <div className="flex justify-between items-center">
          <span>{name}</span>
          <ClipboardIcon 
            size={16} 
            className="cursor-pointer"
            onClick={() => handleClipboard(color)}
            />
        </div>
      }
    </div>
  );
};

export default Color;
