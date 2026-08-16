import React, { useState } from 'react';
import { Search, X, MapPin, Smile, Calendar, Sparkles, Filter } from 'lucide-react';
import { MomentItem, MoodType } from '../types';

interface SearchDiscoverProps {
  moments: MomentItem[];
  onSelectMoment: (moment: MomentItem) => void;
}

export const SearchDiscover: React.FC<SearchDiscoverProps> = ({
  moments,
  onSelectMoment,
}) => {
  const [query, setQuery] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);

  const moodsList = ['QUIET', 'AWE', 'CONNECTED', 'PEACEFUL', 'HAPPY', 'NOSTALGIC', 'GRATEFUL', 'CALM'];
  const locationsList = ['Big Sur, CA', 'San Francisco', 'Lake Tahoe, CA', 'Muir Woods, CA'];

  // Search filtering
  const results = moments.filter((m) => {
    const matchesQuery =
      query.trim() === '' ||
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.story.toLowerCase().includes(query.toLowerCase()) ||
      (m.location && m.location.toLowerCase().includes(query.toLowerCase())) ||
      m.moods.some((mood) => mood.toLowerCase().includes(query.toLowerCase()));

    const matchesMood = !selectedMood || m.moods.includes(selectedMood as MoodType);
    const matchesLoc = !selectedLocation || (m.location && m.location.toLowerCase().includes(selectedLocation.toLowerCase()));

    return matchesQuery && matchesMood && matchesLoc;
  });

  return (
    <div className="w-full max-w-md mx-auto pb-32 pt-3 px-4 sm:px-0">
      {/* Header & Search Bar */}
      <div className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md pt-2 pb-3 px-4 border-b border-[#EFE9E0]/70 space-y-3">
        <h1
          className="text-2xl font-serif-title font-semibold text-[#8E3B27] tracking-tight"
          style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
        >
          Explore Moments
        </h1>

        <div className="relative">
          <Search className="w-4 h-4 text-[#8C847E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search stories, moods, places, thoughts..."
            className="w-full bg-[#F2EDE4]/80 text-[#2C2825] placeholder-[#A8A19B] text-sm pl-10 pr-9 py-2.5 rounded-2xl border border-[#E2DDD3] focus:outline-hidden focus:border-[#9E3C1C] focus:bg-white transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C847E] hover:text-[#2C2825]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="px-4 mt-4 space-y-6">
        {/* Mood Tags Chips */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C847E]">
            <Smile className="w-3.5 h-3.5 text-[#9E3C1C]" />
            <span>Filter by Mood</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {moodsList.map((mood) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(selectedMood === mood ? null : mood)}
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedMood === mood
                    ? 'bg-[#009688] text-white shadow-xs'
                    : 'bg-[#EFEBE4] text-[#695F56] hover:bg-[#E5DFD5]'
                }`}
              >
                {mood}
              </button>
            ))}
          </div>
        </div>

        {/* Places Chips */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8C847E]">
            <MapPin className="w-3.5 h-3.5 text-[#9E3C1C]" />
            <span>Locations</span>
          </div>
          <div className="flex items-center gap-1.5 flex-wrap">
            {locationsList.map((loc) => (
              <button
                key={loc}
                onClick={() => setSelectedLocation(selectedLocation === loc ? null : loc)}
                className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                  selectedLocation === loc
                    ? 'bg-[#9E3C1C] text-white shadow-xs'
                    : 'bg-[#EFEBE4] text-[#695F56] hover:bg-[#E5DFD5]'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between pt-2 border-t border-[#EFE9E0]">
          <span className="text-xs font-medium text-[#7A7169]">
            {results.length} {results.length === 1 ? 'moment' : 'moments'} found
          </span>
          {(selectedMood || selectedLocation || query) && (
            <button
              onClick={() => {
                setSelectedMood(null);
                setSelectedLocation(null);
                setQuery('');
              }}
              className="text-xs text-[#9E3C1C] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Results Grid */}
        {results.length === 0 ? (
          <div className="text-center py-16 text-[#8C847E]">
            <p className="font-serif-body italic text-lg">No matching moments found.</p>
            <p className="text-xs mt-1">Try another search term or clear the mood filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3.5">
            {results.map((moment) => (
              <div
                key={moment.id}
                onClick={() => onSelectMoment(moment)}
                className="bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E2DDD3] shadow-xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                {moment.images.length > 0 ? (
                  <div className="aspect-4/3 overflow-hidden bg-black/5">
                    <img
                      src={moment.images[0]}
                      alt={moment.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="p-4 bg-[#F2EDE4]/60 italic font-serif-body text-xs text-[#554F49]">
                    "{moment.quoteText || moment.story.slice(0, 80)}..."
                  </div>
                )}
                <div className="p-3 space-y-1">
                  <span className="text-[10px] uppercase font-semibold text-[#8C847E]">
                    {moment.date}
                  </span>
                  <h4
                    className="font-serif-title font-medium text-sm text-[#2C2825] group-hover:text-[#9E3C1C] line-clamp-1"
                    style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
                  >
                    {moment.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
