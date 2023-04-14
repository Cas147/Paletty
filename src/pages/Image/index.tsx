import Layout from "@/Components/layout/Layout";
import {useRouter} from "next/router";
import React, { PropsWithChildren, useState, FC, ReactNode, useEffect } from "react";

//types
import Color from "@/Components/ColorComponent";
import generatePalette from "../api/generate";
import { CopyBlock, dracula } from "react-code-blocks";
import Loader from "@/Components/Loader";

import { RefreshCcw, X, Upload} from "react-feather";

import styles from "./paeltte.module.css"
import {getHexColorsFromString, removeDuplicate, getDominantColorsFromImageBase64} from "@/utility/helpers";

import ImageUploading, { ImageListType } from "react-images-uploading";

//styles
import stylesButton from "@/Components/layout/layout.module.css"

interface PaletteProps {
}

const Palette:FC<PaletteProps> = () => {
  const router = useRouter()
  const {color} = router.query
  const [result, setResult] = useState<any>("")
  const [formatedResult, setFormatedResult] = useState<string[]>([])
  const [generatedResult, setGeneratedResult] = useState<string[]>([])
  const [isloading, setIsloading] = useState<boolean>(false)
  const [images, setImages] = useState<any>([]);
  const maxNumber = 1;

  const onChange = async(
    imageList: any,
    addUpdateIndex: number[] | undefined
  ) => {
    // data for submit
    setImages(imageList)
    let arrayOfColors: any = await getDominantColorsFromImageBase64(imageList[0].dataURL, 10)
    arrayOfColors = removeDuplicate(arrayOfColors)
    setFormatedResult(arrayOfColors)
    
  };


  const handlegeneratePalette = async(selectedColor: any) => {
    try {
      setIsloading(true)
      document.querySelector("#paletteContainer")?.scrollIntoView({
        behavior: 'smooth'
      })
      const result: any = await generatePalette(`#${selectedColor}`)

      let arr: string[] = getHexColorsFromString(result)
      arr = removeDuplicate(arr)

      setGeneratedResult(arr)
      setIsloading(false)
    } catch(error: any) {
      setIsloading(false)
      console.error(error);
      alert(error.message);
    }
  }


  return (
    <div className="h-full">
      <Layout>
        <div className="flex mt-16 bg-transparent h-full flex w-screen items-center justify-center">

          <ImageUploading
              multiple
              value={images}
              onChange={onChange}
              maxNumber={maxNumber}
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <div 
                    className="drag-image" 
                    onClick={onImageUpload} 
                    {...dragProps}
                    style={isDragging ? { border: "1px red solid" } : undefined}
                    >
                    <Upload />
                    <h6>Drag or Drop image here</h6>
                    <span>OR</span>
                    <button className={stylesButton.mainButton} >Browse File</button>
                  </div>
                  <button onClick={onImageRemoveAll}><X /></button>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image.dataURL} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>Update</button>
                        <button onClick={() => onImageRemove(index)}>Remove</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </ImageUploading>

        </div>

        <div className="flex p-4 bg-transparent flex w-screen items-center justify-center">
          <div className="w-full md:w-11/12 lg:w-10/12 ">
            {formatedResult?.length > 0 && (
              <div>
                <div className="flex items-center h-full">
                <p className="font-bold text-4xl text-white">
                Palette color from image
                </p>
                <span className="text-xl ml-2">(Pick a color to create a new palette)</span>
                </div>
                <div className="flex w-full bg-transparent flex justify-center">
                  <div className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-screen w-full`}>
                    {(formatedResult || [])?.map((currentColor: string, index: number) => {
                      return (
                        <div key={index} onClick={() => handlegeneratePalette(currentColor)}>
                          <Color 
                            color={currentColor} 
                            width={"100%"} 
                            height={100}
                            copy
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
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
        </div>

        <div className="flex p-4 bg-transparent flex w-screen items-center justify-center">
          {isloading ? (
            <div id="paletteContainer" className="flex flex-col w-screen h-screen justify-center items-center">
              <Loader size={200} text="Generating palette"/>
            </div>

          ) : (
            <>
              {generatedResult?.length > 0 && (
                <div className="w-full md:w-11/12 lg:w-10/12 my-16">
                    <div className="py-8 px-4 flex justify-between">
                    <p className="font-bold text-4xl text-white">Palette color from IA</p>
                      <RefreshCcw 
                        className={`cursor-pointer ${styles.refresh}`}
                        size={24}
                        onClick={() => {handlegeneratePalette(color)}}
                      />
                    </div>
                      <div className="flex p-4 w-full bg-transparent flex items-center justify-center">
                        <div className={`grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-screen w-full`}>
                          {(generatedResult || [])?.map((currentColor: string, index: number) => {
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
                    <CopyBlock
                      language="jsx"
                      text={`const paletty = ${JSON.stringify(generatedResult)}`}
                      codeBlock
                      theme={dracula}
                      showLineNumbers={false}
                    />
            </div>
          )}
            </>
          )}
        </div>
      </Layout>
    </div>
  );
};

export default Palette;