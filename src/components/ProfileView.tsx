import React, { useState } from 'react';
import { User, Settings, Flame, MapPin, BookOpen, Download, Music, Shield, Sparkles, Check, Edit3 } from 'lucide-react';
import { MomentItem, UserProfile } from '../types';

interface ProfileViewProps {
  currentUser: UserProfile;
  moments: MomentItem[];
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  onSelectMoment: (moment: MomentItem) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  moments,
  onUpdateProfile,
  onSelectMoment,
}) => {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioText, setBioText] = useState(currentUser.bio);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleSaveBio = () => {
    onUpdateProfile({ bio: bioText });
    setIsEditingBio(false);
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(moments, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `moments_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
  };

  // Mock days of month activity heatmap (28 days)
  const activityDays = Array.from({ length: 28 }, (_, i) => ({
    day: i + 1,
    active: i % 2 === 0 || i % 5 === 0 || i > 20,
    intensity: (i % 3) + 1,
  }));

  return (
    <div className="w-full max-w-md mx-auto pb-32 pt-3 px-4 sm:px-0">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md pt-2 pb-3.5 px-4 mb-3 flex items-center justify-between border-b border-[#EFE9E0]/70">
        <h1
          className="text-2xl font-serif-title font-semibold text-[#8E3B27] tracking-tight"
          style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
        >
          Journal Profile
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#8C847E]">
            {currentUser.memberSince}
          </span>
        </div>
      </header>

      <div className="px-2 sm:px-4 space-y-6">
        {/* User Card matching Image 2 portrait */}
        <div className="bg-[#FFFFFF] rounded-3xl p-5 sm:p-6 border border-[#E8E2D8] shadow-xs flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-24 h-24 rounded-full object-cover border-3 border-[#FAF8F5] shadow-md ring-2 ring-[#E0D7CC]"
            />
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white" title="Active journaling streak" />
          </div>

          <div className="space-y-1">
            <h2
              className="text-2xl font-serif-title font-semibold text-[#24211E]"
              style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
            >
              {currentUser.name}
            </h2>
            <p className="text-xs text-[#8C847E] font-medium tracking-wide">
              {currentUser.username} • {currentUser.location}
            </p>
          </div>

          {/* Bio area */}
          {!isEditingBio ? (
            <div className="relative group">
              <p className="text-sm font-serif-body text-[#554F49] italic max-w-xs leading-relaxed px-3">
                "{currentUser.bio}"
              </p>
              <button
                onClick={() => setIsEditingBio(true)}
                className="mt-2 text-xs font-semibold text-[#9E3C1C] hover:underline flex items-center justify-center gap-1 mx-auto"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit Bio</span>
              </button>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                rows={2}
                className="w-full p-2.5 bg-[#FAF8F5] text-sm text-[#2C2825] rounded-xl border border-[#DCD5CB] focus:outline-hidden focus:border-[#9E3C1C] font-serif-body italic"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingBio(false)}
                  className="px-3 py-1 text-xs text-[#7A7169]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBio}
                  className="px-3 py-1 bg-[#9E3C1C] text-white text-xs rounded-lg font-medium"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {/* Key Metrics */}
          <div className="w-full grid grid-cols-3 gap-2 pt-3 border-t border-[#EFE9E0]">
            <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DA]">
              <span className="block text-xl font-serif-title font-semibold text-[#9E3C1C]">
                {moments.length}
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#8C847E] tracking-wider">
                Moments
              </span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DA]">
              <span className="block text-xl font-serif-title font-semibold text-[#2C2825]">
                {currentUser.streakDays}d
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#8C847E] tracking-wider">
                Streak 🔥
              </span>
            </div>
            <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#EAE4DA]">
              <span className="block text-xl font-serif-title font-semibold text-[#2C2825]">
                {currentUser.placesVisited}
              </span>
              <span className="text-[10px] uppercase font-semibold text-[#8C847E] tracking-wider">
                Places
              </span>
            </div>
          </div>
        </div>

        {/* Writing Heatmap / Consistency */}
        <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#E8E2D8] shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#9E3C1C]" />
              <h3 className="font-serif-title text-base font-semibold text-[#2C2825]">
                Journaling Consistency
              </h3>
            </div>
            <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full">
              42 Day Streak
            </span>
          </div>

          <div className="grid grid-cols-7 gap-1.5 pt-1">
            {activityDays.map((d) => (
              <div
                key={d.day}
                className={`h-7 rounded-lg flex items-center justify-center text-[10px] font-medium transition-colors ${
                  d.active
                    ? d.intensity === 3
                      ? 'bg-[#9E3C1C] text-white font-semibold'
                      : d.intensity === 2
                      ? 'bg-[#D97D64] text-white'
                      : 'bg-[#F0C2B4] text-[#4A2016]'
                    : 'bg-[#F2EDE4]/60 text-[#A8A19B]'
                }`}
                title={`Day ${d.day}: ${d.active ? 'Moment captured' : 'Rest'}`}
              >
                {d.day}
              </div>
            ))}
          </div>
        </div>

        {/* Ambient Soundscapes for Journaling */}
        <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#E8E2D8] shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-[#9E3C1C]" />
            <h3 className="font-serif-title text-base font-semibold text-[#2C2825]">
              Ambient Reading Soundscapes
            </h3>
          </div>
          <p className="text-xs text-[#7A7169]">
            Enhance your reading and reflections with calming background acoustics.
          </p>

          <div className="grid grid-cols-2 gap-2 pt-1">
            {[
              { id: 'cafe', name: 'Quiet Cafe & Rain', emoji: '☕' },
              { id: 'ocean', name: 'Big Sur Waves', emoji: '🌊' },
              { id: 'fire', name: 'Hearth Fireplace', emoji: '🪵' },
              { id: 'forest', name: 'Pine Forest Breeze', emoji: '🌲' },
            ].map((sound) => (
              <button
                key={sound.id}
                onClick={() => setActiveSound(activeSound === sound.id ? null : sound.id)}
                className={`flex items-center gap-2 p-3 rounded-2xl border text-xs font-medium transition-all cursor-pointer ${
                  activeSound === sound.id
                    ? 'bg-[#9E3C1C]/10 border-[#9E3C1C] text-[#9E3C1C] font-semibold'
                    : 'bg-[#FAF8F5] border-[#EAE4DA] text-[#554F49] hover:bg-[#F2EDE4]'
                }`}
              >
                <span>{sound.emoji}</span>
                <span>{sound.name}</span>
                {activeSound === sound.id && <span className="ml-auto w-2 h-2 rounded-full bg-[#9E3C1C] animate-ping" />}
              </button>
            ))}
          </div>
        </div>

        {/* Data Backup & Export */}
        <div className="bg-[#FFFFFF] rounded-3xl p-5 border border-[#E8E2D8] shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#9E3C1C]" />
            <h3 className="font-serif-title text-base font-semibold text-[#2C2825]">
              Journal Backup & Export
            </h3>
          </div>
          <p className="text-xs text-[#7A7169]">
            Download your full photographic memoirs, stories, and reflection history in JSON format.
          </p>
          <button
            onClick={handleExportData}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border border-[#DCD5CB] bg-[#F2EDE4]/60 hover:bg-[#EAE3D6] text-xs font-medium text-[#2C2825] transition-colors cursor-pointer"
          >
            {exportSuccess ? <Check className="w-4 h-4 text-emerald-600" /> : <Download className="w-4 h-4 text-[#9E3C1C]" />}
            <span>{exportSuccess ? 'Memories Exported Successfully!' : 'Export All Memories (.json)'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
