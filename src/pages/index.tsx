import {useEffect, useState} from 'react'

import {useRouter} from "next/router";
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Layout from '@/Components/layout/Layout'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from "swiper";

// Import Swiper styles
import 'swiper/css';
import { Image as ImageIcon, Shuffle, List } from "react-feather";

//import colors 
import { colorList } from '@/utility/const'
import {IColors} from '@/types'
import Color from '@/Components/ColorComponent'

export default function Home() {
  const router = useRouter()
  const [randomColors, setRandomColors] = useState<IColors[]>([])

  useEffect(() => {
    let newArr = [...colorList]
    newArr = newArr.sort(() => 0.5 - Math.random()).slice(0,15)
    setRandomColors(newArr)

  }, [])

  return (
    <>
      <Head>
        <title>Paletty</title>
        <meta name="description" content="Paletty" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-full">
        <Layout>
          <div className="flex h-full p-4 bg-transparent sticky top-0 flex w-screen items-center justify-center">
            <div className="block md:flex h-full justify-between w-full md:w-11/12 lg:w-10/12 rounded-l-2xl shadow-lg">
              <section className="section-process w-screen my-8 md:my-0 md:w-6/12 self-center">
                    <h1>
                      <span className="heading-line heading-line-first"><span className="heading-line-gradient">Use Ai</span></span
                      >
                      <span className="heading-line heading-line-second"
                        ><span className="heading-line-gradient">To create the best</span></span
                      >
                      <span className="heading-line heading-line-third"
                        ><span className="heading-line-gradient">Color palettes.</span></span
                      >
                    </h1>
                </section>

                <section className="carousel w-full  md:w-6/12 my-4">
                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    onSlideChange={() => {}}
                    onSwiper={(swiper) => {}}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                  >
                  {(randomColors || [])?.slice(0, 5).map((currentColor: IColors, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <Color 
                          width={"100%"}  
                          height={250} 
                          color={currentColor.hex}/>
                        </SwiperSlide>
                    )
                  })}
                  </Swiper>

                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    onSlideChange={() => {}}
                    onSwiper={(swiper) => {}}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                  >
                  {(randomColors || [])?.slice(5, 10).map((currentColor: IColors, index: number) => {
                    return (
                      <SwiperSlide key={index}>
                        <Color 
                          width={"100%"}  
                          height={250} 
                          color={currentColor.hex}/>
                      </SwiperSlide>
                    )
                  })}
                  </Swiper>

                  <Swiper
                    spaceBetween={10}
                    slidesPerView={3}
                    onSlideChange={() => {}}
                    onSwiper={(swiper) => {}}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                  >
                  {(randomColors || [])?.slice(10, 15).map((currentColor: IColors, index: number) => {
                    return (
                       <SwiperSlide key={index}>
                        <Color 
                          width={"100%"} 
                          height={250} 
                          color={currentColor.hex}/>
                      </SwiperSlide>
                    )
                  })}
                  </Swiper>
              </section>
            </div>
          </div>   
          <section className="carousel w-screen flex flex-wrap justify-center mb-8">
            <div className="max-w-sm  m-4 p-6 border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700">
                <Shuffle size={40} className="mb-2"/>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Random</h5>
                </a>
                <p className="mb-3 my-4 font-normal text-gray-400">Create awesome color palettes generated by AI </p>
                <div 
                  onClick={() => {
                    const random: number = Math.floor(Math.random() * colorList.length);
                    router.push(`Palette/${colorList[random].hex.substring(1)}`)
                  }} 
                  className="inline-flex items-center text-blue-600 hover:underline"
                  >
                    Create random palette
                </div>
            </div>

            <div className="max-w-sm m-4 p-6 border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700">
                <List size={40} className="mb-2"/>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Color list</h5>
                </a>
                <p className="mb-3 font-normal text-gray-400">Get inspired by our color list with +600 colors, and create a nice palette</p>
                <Link href="/list" className="inline-flex items-center text-blue-600 hover:underline">
                    Create palette from color list
                </Link>
            </div>

            <div className="max-w-sm m-4 p-6 border border-gray-200 rounded-lg shadow bg-gray-800 border-gray-700">
                <ImageIcon size={40} className="mb-2"/>
                <a href="#">
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 text-white">Image</h5>
                </a>
                <p className="mb-3 font-normal text-gray-400">Upload an image, and our Ai will create a awesome color palette</p>
                <Link href="/Image" className="inline-flex items-center text-blue-600 hover:underline cursor-pointer">
                    Create palette from image
                </Link>
            </div>
          </section>
        </Layout>
      </main>
    </>
  )
}
