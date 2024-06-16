import CreatorsSection from "@/components/CreatorsSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import SectionOne from "@/components/SectionOne";


export default function Home() {
  return (
    // <MoralisProvider initializeOnMount={false}>
    <main className="">
      <div className="">
        <Navbar />
        <HeroSection />
        <SectionOne />
        <CreatorsSection />
      </div>
    </main>
  // </MoralisProvider>
  );
}
