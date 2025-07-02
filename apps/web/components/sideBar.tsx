import Link from "next/link";

export default function SideBar() {
    return (
        <div className="w-[84px] h-full bg-[#000000] flex flex-col  items-center !py-1">
            {/* Top: Logo */}
            <div className="flex flex-col items-center">
                <div className="!mb-5.5 !mt-2">
                    <img src="/logo.svg" alt="logo" className="w-[53px] h-[47px]" />
                </div>
            </div>
            {/* Middle: Navigation Icons */}
            <div className="flex flex-col items-center gap-y-4">
                <SideBarIcon href="/add" imgSrc="/add.svg" alt="add" label="Add" />
                <SideBarIcon href="/" imgSrc="/home.svg" alt="home" label="Home" />
                <SideBarIcon href="/explore" imgSrc="/explore.svg" alt="explore" label="Explore" />
                <SideBarIcon href="/library" imgSrc="/lib.svg" alt="library" label="Library" extraClass="mb-2" />
            </div>
            {/* Bottom: DNA Button */}
            <div className="w-[54px] h-[43px] bg-[#1C1E1F] font-bold text-[13px] text-white flex items-center justify-center rounded-[11px] !mt-4">
                <span>DNA</span>
            </div>
        </div>
    )
}

function SideBarIcon({ href, imgSrc, alt, label, extraClass = "" }: { href: string; imgSrc: string; alt: string; label: string; extraClass?: string }) {
    return (
        <Link href={href} className={`group relative flex items-center justify-center ${extraClass}`}>
            <img src={imgSrc} alt={alt}  />
            {/* Tooltip with gradient border */}
            <div className="absolute left-full top-1/2 -translate-y-1/2 !ml-3 z-50 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none">
                <div className="bg-gradient-to-r from-[#6A38D9] to-[#8F6FFF] !p-[2px] rounded-xl">
                    <div className="bg-[#1F1F1F] rounded-lg !px-2 !py-1 text-white text-sm font-medium border border-transparent min-w-[60px] text-center">
                        {label}
                    </div>
                </div>
            </div>
        </Link>
    );
}