"use client"
import Topbar from "@/components/topBar";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-screen bg-[#0e0e0f] overflow-hidden">
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Topbar />
        <main className="flex flex-col !px-[96px] !py-6 gap-6 font-sans">
          
          {/* CARD 1: Verify creator */}
          <section className="border border-[#383838] rounded-xl !pt-[28px] !pl-[40px] !pb-[32px] !pr-[40px] max-w-[1169] bg-[rgba(0,0,0,0.52)] ">
            <h2 className="text-white text-[24px] !leading-[30px] font-grotesk">
              Verify your creator identity → Unlock your DNA
            </h2>
            <p className="text-[#9f9f9f] text-[16px] !leading-[20px] !mt-2 font-sans">
              Simply claim your profile, and we'll build your DNA automatically. Are you a creator with music already on Spotify, YouTube etc?
            </p>
            <div className="flex flex-wrap gap-3 !mt-6">
              <button className="bg-[#007d49] text-white w-[240px] h-[56px] rounded-full text-[16px] hover:bg-green-700 transition cursor-pointer">
                Claim your profile
              </button>
              <button className="bg-[#363636] text-white w-[240px] h-[56px] rounded-full text-[16px] hover:bg-[#444] transition border border-[#383838] cursor-pointer">
                This doesn't apply to me
              </button>
            </div>
          </section>

          {/* CARD 2: Upload Audio */}
          <section className="border border-[#383838] rounded-xl !pt-[28px] !pl-[40px] !pb-[32px] !pr-[40px] max-w-[1169px] bg-[rgba(0,0,0,0.52)]">
            <h2 className="text-white text-[24px] !leading-[30px] font-grotesk">
              Build DNA by Uploading Audio Tracks
            </h2>
            <p className="text-[#9f9f9f] text-[16px] !leading-[20px] !mt-2">
              You can upload your music, and build your Sonic DNA. Please note that by default all DNAs remain private.
            </p>
            <ul className="!pl-2 text-[#9f9f9f] text-[14px] !leading-[18px] !mt-2 space-y-1">
              <li className="flex items-start">
                <span className="text-white !mr-2">•</span>
                <span><span className="text-white">Build with AI</span>: With this, AI will take care of captions, categorisations, tags.</span>
              </li>
              <li className="flex items-start">
                <span className="text-white !mr-2">•</span>
                <span><span className="text-white">Build Manually</span>: You'll have to manually add captions, categorisations and tags.</span>
              </li>
            </ul>
            <button onClick={() => {router.push("/upload-audio")} } className="bg-[#007d49] text-white w-[240px] h-[56px] rounded-full text-[16px] hover:bg-green-700 transition !mt-5 cursor-pointer">
              Upload audio
            </button>
          </section>
          
        </main>
      </div>
    </div>
  );
}