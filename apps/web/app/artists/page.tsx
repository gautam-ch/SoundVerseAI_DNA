"use client";
import { useEffect, useState } from "react";

interface Artist {
  id: string;
  creator_name: string;
  description: string;
  profile_image_url?: string;
  tags?: string[];
  dna_visibility?: string;
  price?: number;
  license_type?: string;
  tracks_visibility?: string;
  become_partner?: boolean;
  audio_preview_url?: string;
  sensitivity?: number;
  status?: string;
  created_at?: string;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      setLoading(true);
      setError(null);
      try {
        const backendUri = process.env.NEXT_PUBLIC_BACKEND_URI;
        if (!backendUri) throw new Error("Backend URI not set");
        const res = await fetch(`${backendUri}/artists`);
        if (!res.ok) throw new Error("Failed to fetch artists");
        const data = await res.json();
        setArtists(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen bg-[#0e0e0f] !p-8">
      <h1 className="text-3xl text-white font-bold !mb-8">Artists</h1>
      {error && <div className="text-red-500">{error}</div>}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {artists.length === 0 && !error && (
            <div className="col-span-full flex flex-col items-center justify-center w-full" >
              <img src="/user.png" alt="No artists" className="w-24 h-24 rounded-full object-cover !mb-4 border border-[#383838]" />
              <span className="text-[#bdbdbd] text-lg">No artists found.</span>
            </div>
          )}
          {artists.map((artist) => (
            <div key={artist.id} className="rounded-2xl shadow-lg shadow-black/30 border border-[#383838] flex flex-col justify-between items-stretch min-h-[440px] max-h-[440px] h-[440px] !p-0 transition-transform hover:scale-[1.035] w-full max-w-[340px] mx-auto" style={{ background: 'linear-gradient(135deg, #1f1f1f 0%, #2a2a2a 100%)' }}>
              {/* Card Header */}
              <div className="flex flex-col items-center !p-6 !pb-3">
                <img
                  src={"/user.png"}
                  alt={artist.creator_name}
                  className="w-20 h-20 rounded-full object-cover !mb-3 border-2 border-[#383838] shadow-lg"
                />
                <h2 className="text-3xl text-white font-extrabold !mb-1 text-center w-full truncate">{artist.creator_name}</h2>
                <div className="flex flex-wrap gap-2 !mb-2 justify-center w-full">
                  {artist.tags && artist.tags.map((tag) => (
                    <span key={tag} className="bg-[#232326] text-[#bdbdbd] text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
                  ))}
                </div>
              </div>
              {/* Description with scroll */}
              <div className="!px-6 !mb-2">
                <div className="rounded-lg !p-3 min-h-[56px] max-h-[72px] overflow-y-auto text-[#e0e0e0] text-[1rem] font-[600] text-center custom-scrollbar" style={{ background: 'transparent' }}>
                  {artist.description}
                </div>
              </div>
              {/* Card Attributes */}
              <div className="!px-6 flex flex-col gap-1 !mb-2">
                <div className="text-white text-sm">DNA Visibility: <span className="font-semibold">{artist.dna_visibility}</span></div>
                <div className="text-white text-sm">Price: <span className="font-semibold">{artist.price ? `$${artist.price}` : "Free"}</span></div>
                <div className="text-white text-sm">License: <span className="font-semibold">{artist.license_type}</span></div>
                <div className="text-white text-sm">Status: <span className="font-semibold">{artist.status}</span></div>
              </div>
              {/* Card Footer */}
              <div className="w-full flex items-center justify-center !px-6 !pb-4 mt-auto">
                {artist.audio_preview_url && (
                  <a href={artist.audio_preview_url} target="_blank" rel="noopener noreferrer" className="text-[#6A35EE] text-sm underline break-all w-full text-center truncate">
                    {artist.audio_preview_url}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Add custom scrollbar styling */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          background: #232326;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #383838;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
} 