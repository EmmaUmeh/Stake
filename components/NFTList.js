import React from "react";
import Dognft from "@/public/assets/dognft.png";
import MushroomNft from "@/public/assets/mushroom.png";
import RobotNft from "@/public/assets/robotnft.png";
import Image from "next/image";
// import { LuRocket } from "react-icons/lu";

function NFTlist() {

  const capitalizeFirstLetterOfEachWord = (str) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  
  const sectionTxt = "checkout our weekly updated trending collection";
  const capitalizedSentence = capitalizeFirstLetterOfEachWord(sectionTxt);

  return (
    <React.Fragment>
      <div className="lg:pl-44 mt-20 mb-10 text-white">

      <div className="relative mb-10 flex flex-col lg:items-start items-center ">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" 
          className="text-white rounded-[30px] bg-[#121212] block w-[70%] p-4 ps-10 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-text-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-white"
        placeholder="Search Nfts.." required />
        {/* <button type="submit" className="text-white absolute bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
    </div>

        <div className="flex flex-col lg:items-start items-center ">
        
          <div className="lg:flex items-center gap-6">
            <div className="lg:mb-0 mb-5">
              <Image
                src={Dognft}
                height={300}
                width={300}
                alt="DognftImg"
                className="rounded-lg"
              />

              <div>
                <h3>Shell Genesis</h3>
                <span>Floor 02.ETH</span>
              </div>
            </div>

            <div className="lg:mb-0 mb-5">
              <Image
                src={MushroomNft}
                height={300}
                width={300}
                alt="DognftImg"
                className="rounded-lg"
              />
                <div>
                <h3>Shell Genesis</h3>
                <span>Floor 02.ETH</span>
              </div>
            </div>

            <div className="lg:mb-0 mb-5">
              <Image
                src={RobotNft}
                height={300}
                width={300}
                alt="DognftImg"
                className="rounded-lg"
              />
                <div>
                <h3>Shell Genesis</h3>
                <span>Floor 02.ETH</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default NFTlist;
