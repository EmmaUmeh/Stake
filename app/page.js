import CreatorsSection from "@/components/CreatorsSection";
import HeroSection from "@/components/HeroSection";
import NFTlist from "@/components/NFTList";
import Navbar from "@/components/Navbar";
import SectionOne from "@/components/SectionOne";


export default function Home() {
  return (
    // <MoralisProvider initializeOnMount={false}>
    <main className="">
      <div className="">
        <Navbar />
        <NFTlist />
        {/* <HeroSection /> */}
        {/* <SectionOne /> */}
        {/* <CreatorsSection /> */}
      </div>
    </main>
  // </MoralisProvider>
  );
}
