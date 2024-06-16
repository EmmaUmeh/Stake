import React from "react";
import Dognft from "@/public/assets/dognft.png";
import MushroomNft from "@/public/assets/mushroom.png";
import RobotNft from "@/public/assets/robotnft.png";
import Image from "next/image";
// import { LuRocket } from "react-icons/lu";

function SectionOne() {

  const capitalizeFirstLetterOfEachWord = (str) => {
    return str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  
  const sectionTxt = "checkout our weekly updated trending collection";
  const capitalizedSentence = capitalizeFirstLetterOfEachWord(sectionTxt);

  return (
    <React.Fragment>
      <div className="lg:pl-44 mt-32 mb-10">
        <div className="flex flex-col lg:items-start items-center ">
          <div className="">
            <h1 className="text-white text-4xl font-semibold mb-5">
              Trending Collection
            </h1>
            <p className="text-white w-full mb-4">
              {capitalizedSentence}
            </p>
          </div>

          <div className="lg:flex items-center gap-6">
            <div className="lg:mb-0 mb-5">
              <Image
                src={Dognft}
                height={300}
                width={300}
                alt="DognftImg"
                className="rounded-lg"
              />
            </div>

            <div className="lg:mb-0 mb-5">
              <Image
                src={MushroomNft}
                height={300}
                width={300}
                alt="DognftImg"
                className="rounded-lg"
              />
            </div>

            <div className="lg:mb-0 mb-5">
              <Image
                src={RobotNft}
                height={300}
                width={300}
                alt="DognftImg"
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SectionOne;
