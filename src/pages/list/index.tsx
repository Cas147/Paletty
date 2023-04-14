import Layout from "@/Components/layout/Layout";
import {useRouter} from "next/router";
import React, { PropsWithChildren, useState, FC, ReactNode, useEffect } from "react";

//types
import {IColors} from "@/types";
import {colorList} from "@/utility/const";
import Color from "@/Components/ColorComponent";

interface ListProps {
}

const List:FC<ListProps> = () => {

  const [search, setSearch] = useState<string>("")

  return (
    <main className="h-screen">
      <Layout>
        <div className="text-center my-16">
          <h1 className="text-8xl my-8">Colors</h1>
          <h2 className="text-4xl">Browse our library of more than 600 color names.</h2>
        </div>

        <div className="flex justify-center items-center w-screen ">
          <div className="flex justify-end items-center w-full md:w-11/12 lg:w-10/12">
            <form className="w-6/12">   
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input 
                    type="search" 
                    onChange={(e: any) => setSearch(e.target.value) }
                    id="default-search" 
                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Search color, hex or name..." 
                    required />
              </div>
            </form>
          </div>
        </div>
        
        <div className="flex p-4 bg-transparent flex w-screen items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 w-full md:w-11/12 lg:w-10/12">
            {colorList.
            filter((item: any) => item.name.toLowerCase().includes(search.toLowerCase()) || item.hex.toLowerCase().includes(search.toLowerCase()))
            .map((currentColor: IColors, index: number) => {
              return (
                <Color 
                  key={index} 
                  color={currentColor.hex} 
                  name={currentColor.name} 
                  width={"100%"} 
                  height={130} 
                  padding
                />
              )
            })}
          </div>
        </div>
      </Layout>
    </main>  
  );
};

export default List;