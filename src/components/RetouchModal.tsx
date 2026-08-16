import React, { useState } from 'react';
import { X, Sparkles, Sliders, Check, RotateCw } from 'lucide-react';

interface RetouchModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
  onApplyFilter: (filterClass: string, filterName: string) => void;
}

const PRESET_FILTERS = [
  { id: 'none', name: 'Original', style: 'filter-none', css: '' },
  { id: 'warm', name: 'Golden Hour', style: 'sepia-[0.25] saturate-125 brightness-105', css: 'sepia(25%) saturate(125%) brightness(105%)' },
  { id: 'vintage', name: 'Vintage 35mm', style: 'sepia-[0.35] contrast-95 brightness-95 hue-rotate-[-10deg]', css: 'sepia(35%) contrast(95%) brightness(95%) hue-rotate(-10deg)' },
  { id: 'crisp', name: 'Morning Crisp', style: 'contrast-115 brightness-110 saturate-105', css: 'contrast(115%) brightness(110%) saturate(105%)' },
  { id: 'noir', name: 'Classic Noir', style: 'grayscale contrast-125 brightness-90', css: 'grayscale(100%) contrast(125%) brightness(90%)' },
  { id: 'fade', name: 'Muted Film', style: 'contrast-90 brightness-105 saturate-80', css: 'contrast(90%) brightness(105%) saturate(80%)' },
];

export const RetouchModal: React.FC<RetouchModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  onApplyFilter,
}) => {
  const [selectedFilter, setSelectedFilter] = useState(PRESET_FILTERS[0]);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [warmth, setWarmth] = useState(0);

  if (!isOpen) return null;

  const handleSave = () => {
    onApplyFilter(selectedFilter.style, selectedFilter.name);
    onClose();
  };

  const dynamicFilterStyle = `${selectedFilter.css} brightness(${brightness}%) contrast(${contrast}%) sepia(${warmth}%)`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#EFE9E0] p-6 space-y-5 overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9E3C1C]" />
            <h3 className="font-serif-title text-xl font-semibold text-[#2C2825]">Retouch Photo</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EFE9E0]/60 hover:bg-[#EFE9E0] text-[#554F49]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Live Preview */}
        <div className="relative w-full h-60 bg-black/10 rounded-2xl overflow-hidden flex items-center justify-center border border-[#E2DDD6]">
          <img
            src={imageUrl}
            alt="Preview"
            style={{ filter: dynamicFilterStyle }}
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-xs text-[11px] text-white font-medium">
            {selectedFilter.name}
          </div>
        </div>

        {/* Filter Presets Carousel */}
        <div className="space-y-2">
          <span className="text-xs uppercase tracking-wider text-[#8C847E] font-medium">Styles & Film Stock</span>
          <div className="grid grid-cols-3 gap-2">
            {PRESET_FILTERS.map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f)}
                className={`py-2 px-2.5 rounded-xl text-xs font-medium border transition-all text-center ${
                  selectedFilter.id === f.id
                    ? 'border-[#9E3C1C] bg-[#9E3C1C]/10 text-[#9E3C1C] font-semibold ring-1 ring-[#9E3C1C]'
                    : 'border-[#E2DDD6] bg-[#F2EDE4]/60 text-[#554F49] hover:bg-[#EAE3D6]'
                }`}
              >
                {f.name}
              </button>
            ))}
          </div>
        </div>

        {/* Adjustments */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between text-xs text-[#554F49]">
            <span>Warmth</span>
            <span>{warmth}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="60"
            value={warmth}
            onChange={(e) => setWarmth(Number(e.target.value))}
            className="w-full accent-[#9E3C1C]"
          />
        </div>

        {/* Footer Actions */}
        <div className="flex gap-2.5 pt-2">
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl border border-[#DED7CC] text-xs font-medium text-[#554F49] hover:bg-[#EFE9E0] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[#9E3C1C] hover:bg-[#852F15] text-white text-xs font-medium transition-colors shadow-sm cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Apply Retouch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
