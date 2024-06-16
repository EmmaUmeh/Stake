import React from "react";
import Dognft from "@/public/assets/dognft.png";
import MushroomNft from "@/public/assets/mushroom.png";
import RobotNft from "@/public/assets/robotnft.png";
import Image from "next/image";
// import { LuRocket } from "react-icons/lu";
import { creators } from "@/utils/creators";

function CreatorsSection() {
  const capitalizeFirstLetterOfEachWord = (str) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  
  const sectionTxt = "checkout top rated creators on the nFT marketplace";
  const capitalizedSentence = capitalizeFirstLetterOfEachWord(sectionTxt);

  return (
    <React.Fragment>
      <div className="lg:pl-44 mt-32 mb-10">
        <div className="flex flex-col lg:items-start items-center ">
          <div className="">
            <h1 className="text-white text-4xl font-semibold mb-5">
              Top creators
            </h1>
            <p className="text-white w-full mb-4">
              {capitalizedSentence}
            </p>
          </div>

          <div className=" lg:flex items-center gap-6">
            {
              Array.isArray(creators) && creators.map((creator, index) => (
                <div className="bg-[#3B3B3B] lg:mb-0 mb-5 p-20 gap-10 rounded-md flex items-center justify-center flex-col" key={creator.id}>
                  <div className="lg:mb-0 mb-5">
                    {/* Render the CreatorOne component directly */}
                    
                    <Image
                  src={creator.image}
                  height={130}
                  width={130}
                  alt="DognftImg"
                  className="rounded-lg"
                />
                  </div>

                  <div>
                    <h1 className="text-white font-semibold text-2xl">{creator.name}</h1>
                  </div>

                  <div className="flex gap-1">
                    <span className="text-[#858584]">Total Sales:</span>
                    <span className="text-white">{creator.sales}</span>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default CreatorsSection;
