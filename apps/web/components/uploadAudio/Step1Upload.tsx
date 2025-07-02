import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Howl } from "howler";
import { useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";

interface Step1UploadProps {
  onUploadSuccess: () => void;
}

export default function Step1Upload({ onUploadSuccess }: Step1UploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [currentHowl, setCurrentHowl] = useState<Howl | null>(null);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...acceptedFiles]);
    }
  }, []);

  const playAudio = (file: File, index: number) => {
    if (currentHowl) {
      currentHowl.stop();
      setCurrentHowl(null);
      setPlayingIndex(null);
    }
    const fileURL = URL.createObjectURL(file);
    const sound = new Howl({
      src: [fileURL],
      html5: true,
      onend: () => {
        setPlayingIndex(null);
      },
    });
    sound.play();
    setCurrentHowl(sound);
    setPlayingIndex(index);
  };

  const stopAudio = () => {
    if (currentHowl) {
      currentHowl.stop();
      setCurrentHowl(null);
      setPlayingIndex(null);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setUploadedFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    if (playingIndex === indexToRemove) {
      stopAudio();
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "audio/x-aiff": [".aif", ".aiff"],
      "audio/ogg": [".ogg"],
      "audio/flac": [".flac"],
      "audio/aac": [".aac"],
    },
    multiple: true,
  });

  return (
    <section className="w-[70vw] max-w-[1200px] mx-auto">
      <div className="!mb-[10px]">
        <span className="text-[#9f9f9f] text-[18px] font-sans">Step 1</span>
      </div>
      <h2 className="text-white text-[32px] font-grotesk font-[450] !mb-[30px]">Upload Audio</h2>
      
      <div className="flex gap-6 w-full">
        {/* Left: Upload Area - 70% width */}
        <div className="flex-[0_0_70%] w-[70%]">
          <div className="flex flex-col items-center justify-center border border-[#383838] rounded-[20px] bg-gradient-to-r from-[#181A1C] to-[#0B0C0D] !pt-[64px] !px-[32px] cursor-pointer transition hover:bg-[#18181a] shadow-lg !min-h-[340px] !max-h-[340px] w-full">
            <div {...getRootProps()} className="w-full flex flex-col items-center">
              <input {...getInputProps()} />
              <img src="/upload.png" alt="Upload" className="w-[39px] h-[52px] !mb-[32px] opacity-80" />
              <div className="text-center">
                <div className="text-white text-[18px] font-semibold font-sans !mb-4">
                  {isDragActive ? "Drop the audio files here..." : "Choose audio file(s)/ folder(s) or drag it here"}
                </div>
                <div className="text-[#828181] text-[15px] font-sans !mb-8">Supported formats: .mp3, .wav, .aac, .ogg, .flac</div>
              </div>
              <button
                className="bg-[#6A35EE] text-white !w-[240px] !h-[44px] rounded-full text-[16px] font-sans font-semibold hover:bg-[#6a38d9] transition !mb-[32px]"
                type="button"
              >
                Upload audio file(s)
              </button>
              <p className="text-[#828181] text-[13px] font-sans text-center max-w-[80%] !mb-[16px]">
                By uploading files, you agree that you have the ownership and authority to upload them.
              </p>
            </div>
          </div>
        </div>

        {/* Right: Uploaded Files Preview - 30% width */}
        <div className="flex-[0_0_30%] w-[30%] ">
          {uploadedFiles.length > 0 ? (
            <div className="w-full border border-[#383838] rounded-[14px] !p-4 shadow-md !min-h-[340px] !max-h-[340px] overflow-y-auto bg-gradient-to-r from-[#181A1C] to-[#0B0C0D]">
              <h3 className="text-white text-[16px] font-semibold !mb-3 border-b border-[#383838] !pb-2">
                Uploaded Files ({uploadedFiles.length})
              </h3>
              <div className="!space-y-2">
                {uploadedFiles.map((file, idx) => (
                  <div key={`${file.name}-${idx}`} className="bg-[#232326] rounded-lg !p-3 border border-[#383838]">
                    <div className="flex items-start justify-between !mb-2">
                      <span className="text-white text-[13px] font-medium truncate flex-1 !pr-2" title={file.name}>
                        {file.name}
                      </span>
                      <button
                        onClick={() => removeFile(idx)}
                        className="text-[#828181] hover:text-red-400 text-xs transition flex-shrink-0"
                        title="Remove file"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#828181] text-[11px]">
                        {(file.size / (1024 * 1024)).toFixed(1)} MB
                      </span>
                      {playingIndex === idx ? (
                        <button
                          onClick={stopAudio}
                          className="flex items-center !gap-1 bg-red-500 hover:bg-red-600 text-white text-[11px] !px-2 !py-1 rounded-full transition"
                        >
                          <FaStop size={10} /> Stop
                        </button>
                      ) : (
                        <button
                          onClick={() => playAudio(file, idx)}
                          className="flex items-center !gap-1 bg-green-500 hover:bg-green-600 text-white text-[11px] !px-2 !py-1 rounded-full transition"
                        >
                          <FaPlay size={10} /> Play
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="w-full !h-[340px] flex items-center justify-center text-[#828181] text-sm font-sans opacity-60 border border-[#383838] rounded-[14px] bg-gradient-to-r from-[#181A1C] to-[#0B0C0D]">
              <div className="text-center">
                <div className="text-[#4a4a4a] text-4xl mb-2">📁</div>
                <div>No files uploaded yet</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}