import React, { useState } from 'react';
import { Sparkles, Calendar, Smile, MapPin, ChevronRight, Bookmark } from 'lucide-react';
import { MomentItem, UserProfile } from '../types';
import { MomentsLogo } from './MomentsLogo';

interface ArchiveViewProps {
  moments: MomentItem[];
  currentUser: UserProfile;
  onSelectMoment: (moment: MomentItem) => void;
  onOpenProfile: () => void;
}

type FilterMode = 'all' | 'month' | 'mood' | 'location';

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  moments,
  currentUser,
  onSelectMoment,
  onOpenProfile,
}) => {
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string>('ALL');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState<string>('ALL');

  // Hero Memory From This Day
  const heroMemory = moments.find((m) => m.id === 'moment-1') || moments[0];

  // Filter moments
  const filteredMoments = moments.filter((m) => {
    if (filterMode === 'mood' && selectedMoodFilter !== 'ALL') {
      return m.moods?.includes(selectedMoodFilter as any);
    }
    if (filterMode === 'month' && selectedMonthFilter !== 'ALL') {
      return m.date.toUpperCase().includes(selectedMonthFilter);
    }
    return true;
  });

  // Group by Month & Year
  const groupedSections: { [key: string]: MomentItem[] } = {};
  filteredMoments.forEach((m) => {
    // Extract month and year from m.date or rawDate
    let sectionKey = 'October 2023';
    if (m.date.toUpperCase().includes('SEP') || m.rawDate.startsWith('2023-09')) {
      sectionKey = 'September 2023';
    } else if (m.date.toUpperCase().includes('OCT') || m.rawDate.startsWith('2023-10')) {
      sectionKey = 'October 2023';
    } else if (m.date.toUpperCase().includes('NOV')) {
      sectionKey = 'November 2023';
    } else {
      sectionKey = 'Recent Moments';
    }

    if (!groupedSections[sectionKey]) {
      groupedSections[sectionKey] = [];
    }
    groupedSections[sectionKey].push(m);
  });

  // Unique moods for filter
  const allMoods = ['ALL', 'HAPPY', 'GRATEFUL', 'CALM', 'AWE', 'QUIET', 'CONNECTED', 'NOSTALGIC'];

  return (
    <div className="w-full max-w-md mx-auto pb-32 pt-3 px-4 sm:px-0">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md pt-2 pb-3.5 px-4 mb-3 flex items-center justify-between border-b border-[#EFE9E0]/70">
        <div className="flex items-center gap-2.5">
          <MomentsLogo showText={false} size="sm" iconColor="#A8422B" />
          <h1
            className="text-2xl font-serif-title font-semibold text-[#8E3B27] tracking-tight"
            style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
          >
            Archive
          </h1>
        </div>

        <button
          onClick={onOpenProfile}
          className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-[#E0D7CC] hover:ring-[#A8422B] transition-all cursor-pointer shadow-xs"
          title="View Profile"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-full h-full object-cover"
          />
        </button>
      </header>

      <div className="px-2 sm:px-4 space-y-6">
        {/* Memory From This Day Hero Card matching Image 9.png */}
        {heroMemory && (
          <div
            onClick={() => onSelectMoment(heroMemory)}
            className="relative rounded-3xl overflow-hidden shadow-md cursor-pointer group aspect-4/3 sm:aspect-16/10 border border-[#E0D7CC]"
          >
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop"
              alt="Memory from this day"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 p-5 flex flex-col justify-end text-white">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase text-white/90 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Memory from this day</span>
              </div>
              <h4 className="text-sm font-medium text-white/80">One year ago</h4>
              <p
                className="text-base sm:text-lg font-serif-title font-normal text-white mt-1 leading-snug"
                style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
              >
                Quiet morning at the corner cafe. The light was perfect today.
              </p>
            </div>
          </div>
        )}

        {/* Filter Pills matching Image 9 */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterMode('all')}
            className={`px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'all'
                ? 'bg-[#E3DDD4] text-[#2C2825] font-semibold shadow-xs'
                : 'bg-[#F2EDE4]/60 text-[#6B635B] hover:bg-[#EAE3D6]'
            }`}
          >
            All Time
          </button>

          <button
            onClick={() => setFilterMode('month')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'month'
                ? 'bg-[#E3DDD4] text-[#2C2825] font-semibold shadow-xs'
                : 'bg-[#F2EDE4]/60 text-[#6B635B] hover:bg-[#EAE3D6]'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Month</span>
          </button>

          <button
            onClick={() => setFilterMode('mood')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'mood'
                ? 'bg-[#E3DDD4] text-[#2C2825] font-semibold shadow-xs'
                : 'bg-[#F2EDE4]/60 text-[#6B635B] hover:bg-[#EAE3D6]'
            }`}
          >
            <Smile className="w-3.5 h-3.5" />
            <span>Mood</span>
          </button>

          <button
            onClick={() => setFilterMode('location')}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              filterMode === 'location'
                ? 'bg-[#E3DDD4] text-[#2C2825] font-semibold shadow-xs'
                : 'bg-[#F2EDE4]/60 text-[#6B635B] hover:bg-[#EAE3D6]'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Location</span>
          </button>
        </div>

        {/* Sub-filter options when Mood is selected */}
        {filterMode === 'mood' && (
          <div className="flex items-center gap-1.5 flex-wrap pt-1 animate-fadeIn">
            {allMoods.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMoodFilter(m)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider transition-all ${
                  selectedMoodFilter === m
                    ? 'bg-[#009688] text-white'
                    : 'bg-[#EAE4DA] text-[#695F56] hover:bg-[#E0D7CC]'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        )}

        {/* Sub-filter options when Month is selected */}
        {filterMode === 'month' && (
          <div className="flex items-center gap-2 flex-wrap pt-1 animate-fadeIn">
            {['ALL', 'OCTOBER', 'SEPTEMBER', 'AUGUST'].map((mo) => (
              <button
                key={mo}
                onClick={() => setSelectedMonthFilter(mo === 'ALL' ? 'ALL' : mo.slice(0, 3))}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                  (selectedMonthFilter === 'ALL' && mo === 'ALL') ||
                  selectedMonthFilter === mo.slice(0, 3)
                    ? 'bg-[#9E3C1C] text-white'
                    : 'bg-[#EAE4DA] text-[#695F56] hover:bg-[#E0D7CC]'
                }`}
              >
                {mo}
              </button>
            ))}
          </div>
        )}

        {/* Grouped Month Sections */}
        {Object.entries(groupedSections).map(([monthTitle, items]) => {
          return (
            <div key={monthTitle} className="space-y-3.5 pt-2">
              <h2
                className="text-3xl font-serif-title font-semibold text-[#24211E] tracking-tight"
                style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
              >
                {monthTitle}
              </h2>

              {/* 2-Column Responsive Grid matching Image 9.png */}
              <div className="grid grid-cols-2 gap-3">
                {items.map((item) => {
                  const hasImage = item.images && item.images.length > 0;
                  const dateShort = item.date.slice(0, 6);

                  if (!hasImage || item.isQuoteCard) {
                    // Quote style card in grid
                    return (
                      <div
                        key={item.id}
                        onClick={() => onSelectMoment(item)}
                        className="bg-[#EFECE6] p-4 rounded-2xl border border-[#E2DDD3] flex flex-col justify-between aspect-square cursor-pointer hover:shadow-sm hover:border-[#D5CEC4] transition-all group"
                      >
                        <p
                          className="font-serif-body italic text-[13px] sm:text-[14px] text-[#3D3730] leading-relaxed line-clamp-4 group-hover:text-[#9E3C1C] transition-colors"
                          style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
                        >
                          "{item.quoteText || item.story}"
                        </p>
                        <span className="text-xs font-semibold text-[#554F49]">
                          {dateShort}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      onClick={() => onSelectMoment(item)}
                      className="relative rounded-2xl overflow-hidden aspect-square border border-[#E0D7CC] cursor-pointer group shadow-xs"
                    >
                      <img
                        src={item.images[0]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Gradient overlay for date badge */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2.5">
                        <span className="px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-xs text-white text-[11px] font-semibold tracking-wide">
                          {dateShort}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
