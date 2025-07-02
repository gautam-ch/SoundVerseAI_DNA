"use client";
import { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";

const steps = [
  { id: "step1", label: "Step 1: Upload Audio" },
  { id: "step2", label: "Step 2: DNA Sensitivity" },
  { id: "step3", label: "Step 3: Profile Creation" },
  { id: "step4", label: "Step 4: Tagging and Categorization" },
  { id: "step5", label: "Publish" },
];

export default function TopBarUploadAudio() {
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties>({});

  // IntersectionObserver for step highlight
  useEffect(() => {
    const stepElements: HTMLElement[] = steps
      .map((step) => document.getElementById(step.id))
      .filter(Boolean) as HTMLElement[];
    if (stepElements.length === 0) return;

    const observer = new window.IntersectionObserver(
      (entries) => {
        // Find the first entry that is at least 50% visible
        const visible = entries
          .filter((entry) => entry.intersectionRatio >= 0.5)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length === 0) return;
          const idx = steps.findIndex(
            (s) => s.id === (visible[0]!.target as HTMLElement).id
          );
          setActiveStep(idx);
      },
      {
        root: null,
        rootMargin: "-120px 0px 0px 0px", // adjust for your header
        threshold: [0.5], // only trigger when 50% visible
      }
    );

    stepElements.forEach((el) => observer.observe(el!));
    return () => observer.disconnect();
  }, []);

  // Dropdown position for portal
  useEffect(() => {
    if (open && userRef.current) {
      const rect = userRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 80,
        zIndex: 9999,
        minWidth: 120,
      });
    }
  }, [open]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Step click: scroll to section
  const handleStepClick = (idx: number) => {
    const step=steps[idx];
    if(!step) return;
    const el = document.getElementById(step.id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="relative w-full h-[232px] flex flex-col py-4 bg-[#0E0E0F] border-b border-[#383838] overflow-hidden">
      {/* gradient overlay */}
      <div className="absolute w-full h-[282px] top-[-31px] left-0">
        <div className="absolute w-full h-[282px] top-0 left-0">
          <div className="relative w-full h-[282px]">
            <div className="absolute w-[640px] h-[110px] top-[79px] left-[-50px] bg-[#65aaff] rounded-[320px/55px] blur-[96.3px] opacity-[0.46]" />
            <div className="absolute w-full h-[282px] top-0 bg-[#d9d9d90a]" />
          </div>
        </div>
      </div>

      {/* topbar */}
      <div className="relative z-10 flex justify-between items-center w-full !mt-4">
        <div></div>
        <div
          className="w-11 h-11 !mr-[8px] rounded-full overflow-hidden cursor-pointer group relative"
          ref={userRef}
        >
          <img
            src="/user.png"
            alt="Profile"
            className="w-full h-full object-cover"
            onClick={() => setOpen(!open)}
          />
        </div>
        {open && ReactDOM.createPortal(
          <div style={dropdownStyle} className="bg-[#232323] rounded-lg shadow-lg border border-[#383838] flex flex-col">
            <button className="!px-2 !py-1 text-white text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Profile</button>
            <button className="!px-2 !py-1 text-white text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Settings</button>
            <button className="!px-2 !py-1 text-red-400 text-sm text-center hover:bg-[#383838] transition-colors" onClick={() => setOpen(false)}>Logout</button>
          </div>,
          document.body
        )}
      </div>

      {/* text and stepper */}
      <div className="relative z-10 !pl-[96px] !mt-3">
        <h1 className="font-[450] text-white text-[32px] !leading-[40px] tracking-wide font-grotesk">
          Build DNA by Uploading Audio Tracks
        </h1>
        <p className="text-[18px] !leading-[23px] text-[#868687] font-sans !mt-2">
          You can upload your music, and build your DNA.
        </p>
        <div className="relative z-10 flex flex-row gap-6 !mt-5 h-[56px]">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => handleStepClick(idx)}
              className={`
                !px-4 !py-3 rounded-full text-[18px] font-sans border border-[#383838]
                transition-colors transition-shadow duration-500 ease-in-out focus:outline-none
                ${
                  activeStep === idx
                    ? "bg-[#007d49] text-white shadow-lg"
                    : "bg-[#232323] text-[#9f9f9f] hover:bg-[#383838]"
                }
              `}
              style={{ minWidth: 220 }}
            >
              {step.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
