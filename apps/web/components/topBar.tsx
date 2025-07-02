import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

export default function Topbar() {
    const [open, setOpen] = useState(false);
    const userRef = useRef<HTMLDivElement>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userRef.current && !userRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (open && userRef.current) {
            const rect = userRef.current.getBoundingClientRect();
            setDropdownStyle({
                position: "absolute",
                top: rect.bottom + window.scrollY + 8,
                left: rect.left + window.scrollX -80,
                zIndex: 9999,
                minWidth: 120,
            });
        }
    }, [open]);

    return (
      <header className="relative w-full h-[232px] flex flex-col py-4 bg-[#0E0E0F] border-b border-[#383838] overflow-hidden">
        {/* Gradient Overlay Effect */}
        <div className="absolute w-full h-[282px] top-[-31px] left-0">
          <div className="absolute w-full h-[282px] top-0 left-0">
            <div className="relative w-full h-[282px]">
              {/* Blue Blur Element - Creates the gradient effect */}
              <div className="absolute w-[640px] h-[110px] top-[79px] left-[-50px] bg-[#65aaff] rounded-[320px/55px] blur-[96.3px] opacity-[0.46]" />
              
              {/* Semi-transparent Overlay */}
              <div className="absolute w-full h-[282px] top-0  bg-[#d9d9d90a]" />
            </div>
          </div>
        </div>

        {/* Content - needs relative positioning to appear above overlay */}
        <div className="relative z-10 flex justify-between items-center w-full !mt-4">
            <div></div>
            <div className="w-11 h-11 !mr-[8px] rounded-full overflow-hidden cursor-pointer group relative" ref={userRef}>
               <img src="/user.png" alt="Profile" className="w-full h-full object-cover" onClick={() => setOpen(!open)} />
            </div>
            {open && ReactDOM.createPortal(
                <div style={dropdownStyle} className=" bg-[#232323] rounded-lg shadow-lg border border-[#383838] flex flex-col ">
                    <button className="!px-2 !py-1 text-white text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Profile</button>
                    <button className="!px-2 !py-1 text-white text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Settings</button>
                    <button className="!px-2 !py-1 text-red-400 text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Logout</button>
                </div>,
                document.body
            )}
        </div>
        
        <div className="relative z-10 !pl-[96px] !mt-3">
          <h1 className="font-[450] text-white text-[32px] !leading-[40px] tracking-wide font-grotesk">
            BUILD <span className="font-bold">DNA</span>
          </h1>
          <p className="text-[18px] !leading-[23px] text-[#868687] font-sans !mt-2">
            Build a DNA on Soundverse and earn passive income as your DNA is used by other creators.{" "}
            <span className="text-white underline opacity-90 text-[18px] !leading-[23px] font-sans">
              <a href="#" className="hover:opacity-80 transition-opacity">Learn more</a>
            </span>
          </p>
        </div>
      </header>
    );
}