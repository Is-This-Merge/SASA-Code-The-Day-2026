import React, { useState } from 'react';
import { ArrowLeft, Edit3, Share2, Sun, Heart, Sparkles, Send, Volume2, VolumeX, Check } from 'lucide-react';
import { MomentItem, UserProfile } from '../types';

interface MomentDetailProps {
  moment: MomentItem;
  currentUser: UserProfile;
  onBack: () => void;
  onEdit: (moment: MomentItem) => void;
  onShare: (moment: MomentItem) => void;
  onAddReflection: (momentId: string, text: string) => void;
}

export const MomentDetail: React.FC<MomentDetailProps> = ({
  moment,
  currentUser,
  onBack,
  onEdit,
  onShare,
  onAddReflection,
}) => {
  const [newThought, setNewThought] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [liked, setLiked] = useState(moment.isLiked || false);
  const [likeCount, setLikeCount] = useState(moment.likes);

  const handleToggleLike = () => {
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const handleAddThought = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newThought.trim()) return;
    onAddReflection(moment.id, newThought.trim());
    setNewThought('');
  };

  return (
    <div className="w-full max-w-md mx-auto pb-32 pt-2 px-4 sm:px-0">
      {/* Top Navigation */}
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
            Moment Detail
          </span>
        </button>

        {/* Ambient Audio Player Toggle */}
        <button
          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            isPlayingAudio
              ? 'bg-[#9E3C1C] text-white'
              : 'bg-[#EFE9E0] text-[#554F49] hover:bg-[#E2DDD6]'
          }`}
          title={isPlayingAudio ? 'Mute ambient soundscape' : 'Play peaceful ambient audio'}
        >
          {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
          <span>{isPlayingAudio ? 'Ambience' : 'Listen'}</span>
        </button>
      </header>

      {/* Main Content Area */}
      <div className="mt-5 px-4 space-y-6">
        {/* Weather & Mood Badges Row */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            {moment.weather && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#EFEBE4] text-[#4A433D] border border-[#E2DDD3]">
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                {moment.weather}
              </span>
            )}
            {moment.moods && moment.moods.length > 0 && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-[#EFEBE4] text-[#4A433D] border border-[#E2DDD3]">
                😊 {moment.moods.join(' • ')}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onEdit(moment)}
              className="p-2 rounded-full hover:bg-[#EFE9E0] text-[#554F49] transition-colors"
              title="Edit Moment"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onShare(moment)}
              className="p-2 rounded-full hover:bg-[#EFE9E0] text-[#554F49] transition-colors"
              title="Share Moment"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h1
            className="text-3xl sm:text-4xl font-serif-title font-semibold text-[#24211E] tracking-tight leading-tight"
            style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
          >
            {moment.title}
          </h1>
          <p className="text-xs font-semibold uppercase tracking-wider text-[#8C847E]">
            {moment.date} {moment.location && `• 📍 ${moment.location}`}
          </p>
        </div>

        {/* Story Part 1 */}
        <div
          className="text-[17px] leading-relaxed text-[#3D3730] font-serif-body space-y-4"
          style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
        >
          {moment.story.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Embedded Photographic Visual */}
        {(moment.secondaryImage || moment.images.length > 0) && (
          <div className="my-6 overflow-hidden rounded-2xl shadow-xs border border-[#E5DFD5]">
            <img
              src={moment.secondaryImage || moment.images[0]}
              alt={moment.title}
              className="w-full h-80 object-cover"
            />
          </div>
        )}

        {/* Story Part 2 (Extended narrative) */}
        {moment.secondaryStory && (
          <div
            className="text-[17px] leading-relaxed text-[#3D3730] font-serif-body space-y-4"
            style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
          >
            <p>{moment.secondaryStory}</p>
          </div>
        )}

        {/* Quote / Highlight Section if quote card */}
        {moment.isQuoteCard && moment.quoteText && (
          <div className="my-6 p-6 rounded-2xl bg-[#EFECE6]/80 border-l-4 border-[#9E3C1C] italic font-serif-title text-xl text-[#2C2825]">
            "{moment.quoteText}"
          </div>
        )}

        {/* Reflections Header */}
        <div className="pt-8 border-t border-[#EFE9E0] space-y-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#2C2825]" />
            <h3
              className="font-serif-title text-2xl font-semibold text-[#2C2825]"
              style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
            >
              Reflections
            </h3>
          </div>

          {/* Reflections Cards */}
          <div className="space-y-4">
            {moment.reflections && moment.reflections.length > 0 ? (
              moment.reflections.map((ref) => (
                <div
                  key={ref.id}
                  className="bg-[#F2EDE4]/70 rounded-2xl p-4 sm:p-5 border border-[#E5DFD5] space-y-3"
                >
                  <p
                    className="text-base sm:text-lg italic text-[#2C2825] font-serif-body leading-relaxed"
                    style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
                  >
                    "{ref.text.replace(/^"|"$/g, '')}"
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-[#E2DDD3]/60">
                    <span className="text-[11px] uppercase tracking-wider text-[#8C847E]">
                      {ref.date}
                    </span>
                    <button
                      onClick={() => setNewThought(`Re: "${ref.text.slice(0, 30)}..." `)}
                      className="text-[11px] font-semibold tracking-wider uppercase text-[#9E3C1C] hover:text-[#852F15]"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-[#8C847E] italic font-serif-body">
                No reflections added yet. Capture your lingering thoughts below.
              </div>
            )}
          </div>

          {/* Add a new thought input container matching Image 7 */}
          <form
            onSubmit={handleAddThought}
            className="bg-[#F2EDE4]/50 rounded-2xl p-4 border border-[#E5DFD5] space-y-3"
          >
            <textarea
              value={newThought}
              onChange={(e) => setNewThought(e.target.value)}
              placeholder="Add a new thought..."
              rows={3}
              className="w-full bg-transparent text-[#2C2825] placeholder-[#A8A19B] font-serif-body text-base resize-none focus:outline-hidden"
              style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
            />
            <div className="flex items-center justify-end">
              <button
                type="submit"
                disabled={!newThought.trim()}
                className="w-10 h-10 rounded-full bg-[#9E3C1C] hover:bg-[#852F15] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shadow-sm"
                title="Save Thought"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
