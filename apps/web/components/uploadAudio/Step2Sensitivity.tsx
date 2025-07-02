interface Step2SensitivityProps {
  onNext: () => void;
  artistData: any;
  setArtistData: (data: any) => void;
}

export default function Step2Sensitivity({ artistData, setArtistData, onNext }: Step2SensitivityProps) {
  return (
    <section className="max-w-[965px] w-full mx-auto">
      <div className="!mb-[10px]">
        <span className="text-[#9f9f9f] text-[18px] font-sans">Step 2</span>
      </div>
      <h2 className="text-white text-[32px] font-grotesk font-[450] !mb-[30px]">DNA Sensitivity</h2>
      <div className="w-full border border-[#383838] rounded-[20px] bg-[#0B0B0B] !px-[48px] !pt-[48px] !pb-[48px] flex flex-col items-center">
        <div className="w-full  !mb-[40px]">
          <div className="text-white text-[24px] font-grotesk font-[450] !mb-1">Set the level of sensitivity for the DNA creation</div>
          <div className="text-[#9f9f9f] text-[14px] font-sans">Less sensitivity will result in less number of DNAs, higher sensitivity will result in many niche DNAs.</div>
        </div>
        <div className="w-[730px] flex flex-col  !mb-[40px] !mt-[30px]">
          <input
            type="range"
            min="1"
            max="11"
            value={artistData.sensitivity}
            onChange={e => setArtistData({ ...artistData, sensitivity: Number(e.target.value) })}
            className="w-full h-[3px] bg-[#232323] rounded-full appearance-none accent-[#fff]"
            style={{ accentColor: '#fff' }}
          />
          <div className="flex w-full justify-between !mt-4 text-[#9f9f9f] text-[15px] font-sans">
            <div className="flex flex-col items-start !ml-[-40px]">
              <span>Least Sensitive</span>
              <span className="text-[15px] !ml-[-15px] ">(Generic Genre DNAs)</span>
            </div>
            <div className="flex flex-col items-center">
              <span>Recommended</span>
            </div>
            <div className="flex flex-col items-end !mr-[-40px]">
              <span>Highly Sensitive</span>
              <span className="text-[15px] !mr-[-10px] ">(Niche Genre DNAs)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-8 !mt-2">
          <button className="bg-[#007D49] text-white w-[197px] h-[64px] rounded-full text-[18px] font-sans font-semibold hover:bg-[#0e9e57] transition " onClick={onNext}>Set Sensitivity</button>
          <button className="text-white text-[18px] font-sans font-semibold hover:underline transition" onClick={onNext}>Skip</button>
        </div>
      </div>
    </section>
  );
} 