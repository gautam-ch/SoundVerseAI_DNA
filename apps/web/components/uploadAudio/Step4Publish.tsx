import { useEffect, useState } from "react";

export default function Step4Publish({ artistData, setArtistData, shouldSubmit, setShouldSubmit }: { artistData: any, setArtistData: (data: any) => void, shouldSubmit: boolean, setShouldSubmit: (val: boolean) => void }) {
  const [progress, setProgress] = useState(0);
  const targetProgress = 75; // Always show 75% as requested

  useEffect(() => {
    // Animate progress to 75%
    const timer = setTimeout(() => {
      setProgress(targetProgress);
    }, 500);

    if (!shouldSubmit) return;

    // Complete validation: check all required fields
    const isValid = (
      artistData.creator_name &&
      artistData.description &&
      artistData.dna_visibility &&
      (artistData.price !== undefined && artistData.price !== null && artistData.price !== "") &&
      artistData.license_type &&
      artistData.tracks_visibility &&
      (typeof artistData.become_partner === "boolean") &&
      (artistData.sensitivity !== undefined && artistData.sensitivity !== null && artistData.sensitivity !== "") &&
      artistData.status
    );
    if (!isValid) {
      console.warn("Artist data is incomplete. Not submitting.", artistData);
      setShouldSubmit(false);
      return;
    }

    // Use BACKEND_URI from environment variables
    const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
    if (!backendUri) {
      console.warn("BACKEND_URI is not set in environment variables.");
      setShouldSubmit(false);
      return;
    }

    // POST artistData to the API when shouldSubmit is true
    const postArtist = async () => {
      try {
        const response = await fetch(`${backendUri}/artists`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(artistData)
        });
        const data = await response.json();
        console.log("Artist created:", data);
      } catch (error) {
        console.error("Failed to create artist:", error);
      } finally {
        setShouldSubmit(false);
      }
    };
    postArtist();

    return () => clearTimeout(timer);
  }, [artistData, shouldSubmit]);

  // Calculate circle properties
  const radius = 180;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="w-full h-[400px]  relative ">
      {/* Header */}
      <div className="!pt-4  relative z-10">
        <span className="text-[#9f9f9f] text-[15px] font-sans">Step 4</span>
        <h1 className="text-white text-[28px] font-grotesk font-[450] !mt-1">
          Tagging and Categorization
        </h1>
      </div>

      {/* Main Content with Blur Background */}
      <div className="absolute inset-0 flex items-center justify-center !mt-[230px]">
        {/* Blur Background Circle */}
        <div 
          className="absolute w-[200px] h-[200px] rounded-full opacity-[0.46]"
          style={{
            background: '#9164FF',
            filter: 'blur(140px)',
          }}
        ></div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          {/* Circular Progress with Text */}
          <div className="relative inline-block">
            <svg
              height={radius * 2}
              width={radius * 2}
              className="transform -rotate-90"
            >
              {/* Background circle */}
              <circle
                stroke="transparent"
                fill="transparent"
                strokeWidth={strokeWidth}
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
              {/* Progress circle */}
              <circle
                stroke="#00D66A"
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                style={{
                  strokeDashoffset,
                  transition: 'stroke-dashoffset 4s ease-in-out'
                }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
              />
            </svg>
            
            {/* Text inside circle */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-white text-[60px] font-grotesk font-[400] !leading-[0.7] tracking-wide">
                WE'RE
              </div>
              <div className="text-white text-[60px] font-grotesk font-[400] !leading-[0.7] tracking-wide">
                BUILDING
              </div>
              <div className="text-white text-[60px] font-grotesk font-[400] !leading-[0.7] tracking-wide">
                YOUR
              </div>
              <div className="text-white text-[60px] font-grotesk font-[800] !leading-[0.7] tracking-wide !mt-1">
                DNA
              </div>
            </div>
          </div>

          {/* Bottom text */}
          <div className="text-[#9f9f9f] text-[13px] font-sans max-w-[480px] mx-auto !mt-2 !mb-8 tracking-wider">
            YOUR DNA WILL BE READY IN A FEW MINUTES. WE'LL INFORM YOU<br />
            ONCE IT'S READY. YOU CAN USE THE STUDIO MEANWHILE.
          </div>
        </div>
      </div>
    </div>
  );
}