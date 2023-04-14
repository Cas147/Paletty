import React, { useState, FC } from "react";
import {ColorRing} from "react-loader-spinner";

interface LoaderProps {
  text?: string
  size?: number
}

const Loader:FC<LoaderProps> = ({ text, size = 80 }) => {

  return (
    <>
      <ColorRing
        visible={true}
        height={size}
        width={size}
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#03a9f4', '#f441a5', '#f8b26a', '#ffeb3b', '#03a9f4']}
      />
      {text && 
        <p className="text-6xl font-bold">{text}</p>
      }
    </>
  );
};

export default Loader;