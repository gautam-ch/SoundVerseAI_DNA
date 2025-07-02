import { useRef, useState } from "react";

interface Step3ProfileProps {
  onDone: () => void;
  artistData: any;
  setArtistData: (data: any) => void;
}

export default function Step3Profile({ artistData, setArtistData, onDone }: Step3ProfileProps) {
  const [profileImg, setProfileImg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfileImg(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom select wrapper
  const CustomSelect = ({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) => (
    <div className="relative">
      <select
        {...props}
        className={
          "appearance-none h-[38px] bg-[#181818] border border-[#383838] rounded-full !px-4 !py-2  text-white font-sans text-[15px] !pr-10 focus:outline-none  " +
          (props.className ? props.className : "")
        }
      >
        {children}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
        <img src="/dropDown.svg" alt="dropdown" width={15} height={11} />
      </span>
    </div>
  );

  return (
    <section className="w-full max-w-full mx-auto ">
      <div className="!mb-1">
        <span className="text-[#9f9f9f] text-[15px] font-sans">Step 3</span>
      </div>
      <h2 className="text-white text-[24px] font-grotesk font-[450] !mb-2">Profile Creation</h2>
      
      <div className="w-full border border-[#383838] rounded-[16px] bg-[#0B0B0B] !px-6 !pt-4 !pb-2">
        <div className="flex flex-col lg:flex-row gap-8 ">
          {/* Left: Form fields */}
          <div className="flex-1 !space-y-2">
            <div className="flex items-center gap-4">
              <label className="text-[#fff] text-[15px] font-sans min-w-[110px]">Creator Name</label>
              <input 
                className="w-[280px] h-[38px] bg-[#1b1b1b] border border-[#383838] rounded-full !px-4 !py-2 text-white font-sans text-[15px]" 
                placeholder="Name such as Skrillex, Coldplay"
                value={artistData.creator_name}
                onChange={e => setArtistData({ ...artistData, creator_name: e.target.value })}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-[#fff] text-[15px] font-sans min-w-[110px]">Description</label>
              <input 
                className="w-[400px] h-[38px] bg-[#181818] border border-[#383838] rounded-full !px-4 !py-2 text-white font-sans text-[15px]" 
                placeholder="Up to 300 characters"
                value={artistData.description}
                onChange={e => setArtistData({ ...artistData, description: e.target.value })}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-[#fff] text-[15px] font-sans min-w-[110px]">Tags</label>
              <button >
                <img src="/picAdd.svg" alt="Add tag" className="w-[48px] h-[48px]" />
              </button>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-[#fff] text-[15px] font-sans min-w-[110px] ">DNA Visibility</label>
              <CustomSelect className="w-[160px]" value={artistData.dna_visibility} onChange={e => setArtistData({ ...artistData, dna_visibility: e.target.value })}>
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="draft">Draft</option>
              </CustomSelect>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-[#fff] text-[15px] font-sans min-w-[110px]">Price</label>
              <CustomSelect className="w-[132px]" value={artistData.price} onChange={e => setArtistData({ ...artistData, price: e.target.value })}>
                <option value={9.99}>$9.99</option>
                <option value={19.99}>$19.99</option>
                <option value={0}>Free</option>
              </CustomSelect>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-[#fff] text-[15px] font-sans min-w-[110px]">License</label>
              <CustomSelect className="w-[187px]" value={artistData.license_type} onChange={e => setArtistData({ ...artistData, license_type: e.target.value })}>
                <option value="Distribution">Distribution</option>
                <option value="Royalty Free">Royalty Free</option>
                <option value="Sample">Sample</option>
                <option value="Sync">Sync</option>
                <option value="Full Ownership">Full Ownership</option>
              </CustomSelect>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-[#fff] text-[15px] font-sans min-w-[110px]">Tracks</label>
              <CustomSelect className="w-[160px]" value={artistData.tracks_visibility} onChange={e => setArtistData({ ...artistData, tracks_visibility: e.target.value })}>
                <option value="visible">Visible</option>
                <option value="invisible">Invisible</option>
              </CustomSelect>
            </div>
            
            <div className="flex items-center gap-4">
              <label className="text-[#fff] text-[15px] font-sans min-w-[110px]">Become Partner</label>
              <CustomSelect className="w-[125px]" value={artistData.become_partner ? "yes" : "no"} onChange={e => setArtistData({ ...artistData, become_partner: e.target.value === "yes" })}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </CustomSelect>
            </div>
          </div>
          
          {/* Right: Profile picture upload */}
          <div className="flex flex-col items-center  flex-shrink-0 w-full lg:w-[280px]">
            <div
              className="w-[214px] h-[214px] rounded-full border border-[#383838] flex items-center justify-center bg-[#181818] !mb-4 relative cursor-pointer overflow-hidden"
              onClick={handleImageClick}
              title="Click to upload profile picture"
            >
              {profileImg ? (
                <img src={profileImg} alt="Profile preview" className="object-cover w-full h-full rounded-full" />
              ) : (
                <img src="/picAdd.svg" alt="Add profile" className="w-[64px] h-[64px]" />
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
            <button
              className="bg-[#232323] text-white w-[140px] h-[40px] rounded-full text-[15px] font-sans font-semibold hover:bg-[#383838] transition"
              onClick={handleImageClick}
              type="button"
            >
              Upload Picture
            </button>
          </div>
        </div>
        <div className="flex justify-center !mt-4">
        <button 
          className="bg-[#007D49] text-white w-[140px] h-[44px] rounded-full text-[16px] font-sans font-semibold hover:bg-[#0e9e57] transition" 
          onClick={onDone}
        >
          Done
        </button>
      </div>
      </div>
    </section>
  );
}