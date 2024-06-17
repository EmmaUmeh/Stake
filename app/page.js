import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";



export default function Home() {
  return (
    // <MoralisProvider initializeOnMount={false}>
    <main className="">
      <div className="">
        <Navbar />
        <HeroSection />
        {/* <HeroSection /> */}
        {/* <SectionOne /> */}
        {/* <CreatorsSection /> */}
      </div>
    </main>
  // </MoralisProvider>
  );
}
