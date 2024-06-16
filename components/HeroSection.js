import React from "react";
import HeroImg from "@/public/assets/Hero_image.png";
import AvatarImg from "@/public/assets/Avatar.png";
import Image from "next/image";
// import { LuRocket } from "react-icons/lu";

function HeroSection() {
  return (
    <React.Fragment>
      <div className="mt-32 w-full px-10">
      <div className="lg:grid grid-cols-2 lg:pl-44 mt-32 w-full">
      <div className="flex flex-col lg:mb-0 mb-10">
          <h1 className="text-white text-6xl font-semibold lg:w-[400px] mb-5">
            Discover Digital Art & Collect NFTs
          </h1>
          <p className="text-white lg:w-6/12 mb-4">
            NFT marketplace UI created with Anima for Figma. Collect, buy and
            sell art from more than 20k NFT artists.
          </p>

          <button className="flex gap-3 items-center text-nowrap bg-primary lg:w-2/6 w-4/6 p-2 px-12 py-4 rounded-[25px] text-white">
                {/* <LuRocket size={25} color="white"/> */}
                Get Started
            </button>

            <div className="mt-12 flex items-center gap-8">
                <div className="flex flex-col">
                  <h4 className="text-white font-semibold text-3xl">240k+</h4>
                  <span className="text-white">Total Sale</span>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-white font-semibold text-3xl">100k+</h4>
                  <span className="text-white">Auctions</span>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-white font-semibold text-3xl">240k+</h4>
                  <span className="text-white">Artists</span>
                </div>
            </div>


        </div>

        <div className="flex flex-col bg-secondary pb-3 lg:w-96 lg:rounded-t-[100px] lg:rounded-b-lg">
          <Image src={HeroImg} height={500} width={3000} alt="HeroImg" className="w-full"/>
          <div className="pl-5">
            <div className="mb-3 text-white mt-5">
            <span className="text-white">Space Walking</span>
            </div>
            
            <div className="flex items-center gap-6">
              <Image src={AvatarImg} height={30} width={30} alt="HeroImg" className="rounded-full" />
              <span className="text-white">Animalkid</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </React.Fragment>
  );
}

export default HeroSection;
