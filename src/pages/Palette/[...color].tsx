import Layout from "@/Components/layout/Layout";
import {useRouter} from "next/router";
import React, { PropsWithChildren, useState, FC, ReactNode, useEffect } from "react";

//types
import Color from "@/Components/ColorComponent";
import generatePalette from "../api/generate";
import { CopyBlock, dracula } from "react-code-blocks";
import Loader from "@/Components/Loader";

import { RefreshCcw} from "react-feather";

import styles from "./paeltte.module.css"
import {getHexColorsFromString, isColorDark, removeDuplicate} from "@/utility/helpers";
import {colorList} from "@/utility/const";
import {IColors} from "@/types";

interface PaletteProps {
}

const Palette:FC<PaletteProps> = () => {
  const router = useRouter()
  const {color}: any = router.query
  const [result, setResult] = useState<any>("")
  const [formatedResult, setFormatedResult] = useState<string[]>([])
  const [isloading, setIsloading] = useState<boolean>(false)

  const handlegeneratePalette = async(selectedColor: any) => {
    try {
      setIsloading(true)
      const result = await generatePalette(`#${selectedColor}`)
      setResult(result)
      setIsloading(false)
    } catch(error: any) {
      setIsloading(false)
      console.error(error);
      alert(error.message);
    }
  }

  useEffect(() => {
    handlegeneratePalette(color)
  } , [])

  useEffect(() => {
    let arr: string[] = getHexColorsFromString(result)
    arr = removeDuplicate(arr)

    setFormatedResult(arr)
  } , [result])

  return (
    <main className="h-screen">
      <Layout>
      
        <div className="flex p-4 bg-transparent flex w-screen items-center justify-center">
          {isloading ? (
            <div className="flex flex-col w-screen h-screen justify-center items-center">
              <Loader size={200} text="Generating palette"/>
            </div>

          ) : (
            <div className="w-full md:w-11/12 lg:w-10/12 my-16">
              <div className="py-8 px-4 flex justify-between items-center">
                <div className="flex flex-wrap">
                  <p className="text-white text-2xl md:text-4xl font-bold">Main color: </p>
                  <div className="flex items-center flex-wrap" style={{color: `#${color}`, backgroundColor: `${!isColorDark(`#${color}`) ? `transparent` : "#fff"}`}}>
                    <p className="text-2xl md:text-4xl font-bold ml-0 md:ml-2"> #{color}</p>
                    <p className="text-2xl md:text-4xl font-bold ml-2">({(colorList || []).find((currenColor: IColors) => {
                      return currenColor.hex === `#${color}`
                    })?.name})</p>
                  </div>
                </div>
                <RefreshCcw 
                  className={`cursor-pointer ${styles.refresh}`}
                  size={24}
                  onClick={() => {handlegeneratePalette(color)}}
                />
              </div>
              {formatedResult?.length > 0 && (
                <div className="flex p-4 w-full bg-transparent flex items-center justify-center">
                  <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-screen w-full`}>
                    {(formatedResult || [])?.map((currentColor: string, index: number) => {
                      return (
                        <Color 
                          key={index} 
                          color={currentColor} 
                          width={"100%"} 
                          height={250}
                          copy 
                        />
                      )
                    })}
                  </div>
                </div>
              )}
              <CopyBlock
                language="jsx"
                text={`const paletty = ${JSON.stringify(formatedResult)}`}
                codeBlock
                theme={dracula}
                showLineNumbers={false}
              />
            </div>
          )}
        </div>
      </Layout>
    </main>  
  );
};

export default Palette;