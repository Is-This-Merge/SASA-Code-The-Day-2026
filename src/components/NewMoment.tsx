import React, { useState } from 'react';
import { ArrowLeft, Edit2, MapPin, Calendar, Clock, Plus, Heart, Image as ImageIcon, Sparkles, Upload, Check } from 'lucide-react';
import { MomentItem, MoodType } from '../types';
import { presetPhotos } from '../data/initialData';
import { RetouchModal } from './RetouchModal';

interface NewMomentProps {
  initialData?: MomentItem | null;
  onBack: () => void;
  onSave: (moment: MomentItem) => void;
}

const AVAILABLE_MOODS: MoodType[] = [
  'HAPPY',
  'GRATEFUL',
  'CALM',
  'NOSTALGIC',
  'INSPIRED',
  'AWE',
  'PEACEFUL',
  'CONNECTED',
  'QUIET',
  'MORNING',
];

export const NewMoment: React.FC<NewMomentProps> = ({
  initialData,
  onBack,
  onSave,
}) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [story, setStory] = useState(initialData?.story || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [date, setDate] = useState(initialData?.date || 'OCT 24, 2023');
  const [time, setTime] = useState(initialData?.time || '4:30 PM');
  const [selectedMoods, setSelectedMoods] = useState<MoodType[]>(
    initialData?.moods || ['HAPPY']
  );
  const [photos, setPhotos] = useState<string[]>(
    initialData?.images && initialData.images.length > 0
      ? initialData.images
      : ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1200&auto=format&fit=crop']
  );
  const [secondaryPhoto, setSecondaryPhoto] = useState<string>(
    initialData?.secondaryImage || 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop'
  );

  const [activePhotoFilter, setActivePhotoFilter] = useState('');
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [showRetouchModal, setShowRetouchModal] = useState(false);
  const [customMoodInput, setCustomMoodInput] = useState('');
  const [showCustomMoodInput, setShowCustomMoodInput] = useState(false);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  const toggleMood = (mood: MoodType) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleAddCustomMood = () => {
    if (!customMoodInput.trim()) return;
    const cleanMood = customMoodInput.trim().toUpperCase() as MoodType;
    if (!selectedMoods.includes(cleanMood)) {
      setSelectedMoods([...selectedMoods, cleanMood]);
    }
    setCustomMoodInput('');
    setShowCustomMoodInput(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPhotos([event.target.result as string]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateStoryMuse = () => {
    setIsGeneratingStory(true);
    setTimeout(() => {
      const inspirations = [
        "The sun slanted across the table in warm amber ribbons. We spoke of nothing and everything, watching the day slowly unfurl.",
        "The scent of cedar and rain hung heavy in the crisp morning air. In that quiet pause between footsteps, time seemed to stand still.",
        "A sudden laughter that filled the entire room. These are the unscripted, golden fragments of time that I will carry with me.",
        "Standing at the edge as the tide rolled in with quiet rhythm. Everything suddenly felt peaceful, spacious, and grounded."
      ];
      const randomInspo = inspirations[Math.floor(Math.random() * inspirations.length)];
      setStory(story ? `${story}\n\n${randomInspo}` : randomInspo);
      if (!title) {
        setTitle(selectedMoods[0] ? `Echoes of ${selectedMoods[0].toLowerCase()}` : 'A Quiet Afternoon');
      }
      setIsGeneratingStory(false);
    }, 600);
  };

  const handleSave = () => {
    const newMoment: MomentItem = {
      id: initialData?.id || `moment-${Date.now()}`,
      title: title.trim() || 'Untitled Moment',
      story: story.trim() || 'A treasured memory captured in time.',
      location: location.trim(),
      date: date.trim() || 'TODAY',
      rawDate: new Date().toISOString().split('T')[0],
      time: time.trim(),
      moods: selectedMoods.length > 0 ? selectedMoods : ['CALM'],
      primaryMood: selectedMoods[0] || 'CALM',
      weather: '72° CLEAR',
      images: photos,
      secondaryImage: secondaryPhoto,
      likes: initialData?.likes || 0,
      comments: initialData?.comments || [],
      reflections: initialData?.reflections || [],
    };
    onSave(newMoment);
  };

  return (
    <div className="w-full max-w-md mx-auto pb-32 pt-2 px-4 sm:px-0">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md py-3 px-4 flex items-center justify-between border-b border-[#EFE9E0]/70">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#2C2825] hover:text-[#9E3C1C] transition-colors -ml-1 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
          <span
            className="text-xl font-serif-title font-semibold tracking-tight text-[#2C2825]"
            style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
          >
            {initialData ? 'Edit Moment' : 'New Moment'}
          </span>
        </button>

        {/* Story Muse generator */}
        <button
          onClick={handleGenerateStoryMuse}
          disabled={isGeneratingStory}
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-[#EFEBE4] text-[#8C422D] hover:bg-[#E5DFD5] transition-colors"
          title="Inspire with AI Story Muse"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isGeneratingStory ? 'Writing...' : 'Muse'}</span>
        </button>
      </header>

      {/* Main Form Body */}
      <div className="mt-4 px-4 space-y-7">
        {/* Filmstrip Photo Preview Container matching Image 5.png */}
        <div className="relative bg-[#EAE4DC] p-3 rounded-2xl border border-[#DCD5CB] shadow-xs space-y-2">
          {/* Retouch button in upper right */}
          <button
            onClick={() => setShowRetouchModal(true)}
            className="absolute top-5 right-5 z-10 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-medium text-[#2C2825] shadow-sm hover:bg-white transition-all cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 text-[#9E3C1C]" />
            <span>Retouch</span>
          </button>

          {/* Photo 1 with 3 Film Perforation dots on left */}
          <div className="relative flex items-center gap-2">
            <div className="flex flex-col gap-1.5 px-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF8B43]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#418F7B]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#418F7B]" />
            </div>
            <div
              onClick={() => setShowPhotoPicker(true)}
              className="flex-1 h-52 rounded-xl overflow-hidden bg-black/10 border border-[#DDD6CC] cursor-pointer relative group"
            >
              <img
                src={photos[0]}
                alt="Selected Moment"
                className={`w-full h-full object-cover group-hover:scale-102 transition-all duration-300 ${activePhotoFilter}`}
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-xs font-medium gap-1.5">
                <ImageIcon className="w-4 h-4" />
                <span>Change Photo</span>
              </div>
            </div>
          </div>

          {/* Photo 2 (Filmstrip second frame preview) */}
          <div className="relative flex items-center gap-2 pt-1">
            <div className="flex flex-col gap-1.5 px-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#BF8B43]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#418F7B]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#418F7B]" />
            </div>
            <div
              onClick={() => setShowPhotoPicker(true)}
              className="flex-1 h-28 rounded-xl overflow-hidden bg-black/10 border border-[#DDD6CC] cursor-pointer relative group"
            >
              <img
                src={secondaryPhoto}
                alt="Second frame"
                className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
              />
            </div>
          </div>

          {/* Quick Photo Action Bar */}
          <div className="flex items-center justify-between pt-1 text-[11px] text-[#6B635B]">
            <button
              onClick={() => setShowPhotoPicker(true)}
              className="font-medium text-[#9E3C1C] hover:underline"
            >
              Choose from Gallery
            </button>
            <label className="font-medium text-[#6B635B] hover:text-[#2C2825] cursor-pointer flex items-center gap-1">
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Custom Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Title Input */}
        <div className="space-y-1.5">
          <label className="block text-[11px] uppercase tracking-wider text-[#8C847E] font-semibold">
            Moment Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. The First Light, The Coastal Drive"
            className="w-full bg-transparent text-xl font-serif-title font-semibold text-[#2C2825] border-b border-[#E2DDD3] pb-2 focus:outline-hidden focus:border-[#9E3C1C] placeholder-[#A8A19B]"
            style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
          />
        </div>

        {/* THE STORY */}
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-wider text-[#8C847E] font-semibold">
            The Story
          </label>
          <textarea
            value={story}
            onChange={(e) => setStory(e.target.value)}
            placeholder="What made this moment special?..."
            rows={5}
            className="w-full bg-transparent text-base sm:text-lg font-serif-body text-[#3D3730] border-b border-[#E2DDD3] pb-2 focus:outline-hidden focus:border-[#9E3C1C] placeholder-[#B5AFA8] resize-none leading-relaxed"
            style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
          />
        </div>

        {/* LOCATION */}
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-wider text-[#8C847E] font-semibold">
            Location
          </label>
          <div className="flex items-center gap-2 border-b border-[#E2DDD3] pb-2">
            <MapPin className="w-4 h-4 text-[#8C847E] flex-shrink-0" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where were you? (e.g. Big Sur, CA, Paris, North Beach)"
              className="w-full bg-transparent text-sm text-[#2C2825] placeholder-[#B5AFA8] focus:outline-hidden"
            />
          </div>
        </div>

        {/* DATE & TIME */}
        <div className="space-y-2">
          <label className="block text-[11px] uppercase tracking-wider text-[#8C847E] font-semibold">
            Date & Time
          </label>
          <div className="grid grid-cols-2 gap-3">
            {/* Date Pill */}
            <div className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#F0EBE3]/70 border border-[#E2DDD3]">
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#2C2825] focus:outline-hidden"
              />
              <Calendar className="w-4 h-4 text-[#8C847E] flex-shrink-0 ml-1" />
            </div>

            {/* Time Pill */}
            <div className="flex items-center justify-between px-3.5 py-3 rounded-xl bg-[#F0EBE3]/70 border border-[#E2DDD3]">
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium text-[#2C2825] focus:outline-hidden"
              />
              <Clock className="w-4 h-4 text-[#8C847E] flex-shrink-0 ml-1" />
            </div>
          </div>
        </div>

        {/* MOOD */}
        <div className="space-y-2.5">
          <label className="block text-[11px] uppercase tracking-wider text-[#8C847E] font-semibold">
            Mood
          </label>
          <div className="flex items-center gap-2 flex-wrap">
            {AVAILABLE_MOODS.map((mood) => {
              const isSelected = selectedMoods.includes(mood);
              return (
                <button
                  key={mood}
                  type="button"
                  onClick={() => toggleMood(mood)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#009688] text-white shadow-xs'
                      : 'bg-[#EDE7DE] text-[#695F56] hover:bg-[#E2DDD3]'
                  }`}
                >
                  {mood}
                </button>
              );
            })}

            {/* Custom Mood Add Button */}
            {!showCustomMoodInput ? (
              <button
                type="button"
                onClick={() => setShowCustomMoodInput(true)}
                className="w-8 h-8 rounded-full bg-[#EDE7DE] text-[#695F56] hover:bg-[#E2DDD3] flex items-center justify-center transition-colors cursor-pointer"
                title="Add Custom Mood"
              >
                <Plus className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={customMoodInput}
                  onChange={(e) => setCustomMoodInput(e.target.value)}
                  placeholder="NEW MOOD"
                  className="w-24 px-2.5 py-1 text-xs uppercase font-semibold rounded-full bg-[#EDE7DE] border border-[#D5CEC4] focus:outline-hidden"
                />
                <button
                  type="button"
                  onClick={handleAddCustomMood}
                  className="w-7 h-7 rounded-full bg-[#9E3C1C] text-white flex items-center justify-center text-xs"
                >
                  ✓
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Save Moment Button matching Image 5 */}
        <div className="pt-4">
          <button
            onClick={handleSave}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#9E3C1C] hover:bg-[#852F15] text-white font-medium text-base shadow-md shadow-[#9E3C1C]/20 transition-all active:scale-[0.99] cursor-pointer"
          >
            <span>Save Moment</span>
            <Heart className="w-4 h-4 fill-white" />
          </button>
        </div>
      </div>

      {/* Preset Photo Selector Modal */}
      {showPhotoPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-[#FAF8F5] rounded-3xl p-6 border border-[#EFE9E0] shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-serif-title text-xl font-semibold text-[#2C2825]">
                Select Photography
              </h3>
              <button
                onClick={() => setShowPhotoPicker(false)}
                className="w-8 h-8 rounded-full bg-[#EFE9E0] flex items-center justify-center text-[#554F49]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {presetPhotos.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => {
                    setPhotos([preset.url]);
                    setShowPhotoPicker(false);
                  }}
                  className="rounded-xl overflow-hidden border border-[#E2DDD3] cursor-pointer relative group aspect-4/3"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-2">
                    <span className="text-[11px] text-white font-medium leading-tight">
                      {preset.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Retouch Photo Modal */}
      <RetouchModal
        isOpen={showRetouchModal}
        onClose={() => setShowRetouchModal(false)}
        imageUrl={photos[0]}
        onApplyFilter={(filterClass) => {
          setActivePhotoFilter(filterClass);
        }}
      />
    </div>
  );
};
