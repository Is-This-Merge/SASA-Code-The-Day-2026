import React from 'react';
import { Heart, MessageCircle, Share2, MapPin } from 'lucide-react';
import { MomentItem, UserProfile } from '../types';
import { MomentsLogo } from './MomentsLogo';

interface HomeFeedProps {
  moments: MomentItem[];
  currentUser: UserProfile;
  onSelectMoment: (moment: MomentItem) => void;
  onToggleLike: (momentId: string) => void;
  onOpenComments: (moment: MomentItem) => void;
  onOpenShare: (moment: MomentItem) => void;
  onOpenProfile: () => void;
}

export const HomeFeed: React.FC<HomeFeedProps> = ({
  moments,
  currentUser,
  onSelectMoment,
  onToggleLike,
  onOpenComments,
  onOpenShare,
  onOpenProfile,
}) => {
  return (
    <div className="w-full max-w-md mx-auto pb-28 pt-3 px-4 sm:px-0">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-md pt-2 pb-3.5 px-4 mb-2 flex items-center justify-between border-b border-[#EFE9E0]/70">
        <div className="flex items-center gap-2.5">
          <MomentsLogo showText={false} size="sm" iconColor="#A8422B" />
          <h1
            className="text-2xl font-serif-title font-semibold text-[#8E3B27] tracking-tight"
            style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
          >
            Home Feed
          </h1>
        </div>

        <button
          id="home-avatar-btn"
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

      {/* Feed Stream */}
      <div className="space-y-8 px-2 sm:px-4">
        {moments.map((moment) => {
          return (
            <article
              key={moment.id}
              className="group bg-[#FAF8F5] transition-all duration-300"
            >
              {/* Photo Area */}
              {moment.images.length > 0 && (
                <div
                  onClick={() => onSelectMoment(moment)}
                  className="cursor-pointer overflow-hidden rounded-2xl transition-transform duration-300 active:scale-[0.99]"
                >
                  {moment.isPolaroidFrame ? (
                    // Vintage Polaroid Style Card
                    <div className="bg-[#EFECE6] p-3 pb-5 rounded-2xl shadow-sm border border-[#E2DDD3]">
                      <div className="overflow-hidden rounded-xl bg-black/5 aspect-4/3 sm:aspect-16/10">
                        <img
                          src={moment.images[0]}
                          alt={moment.title}
                          className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  ) : (
                    // Full Modern Frame Card
                    <div className="overflow-hidden rounded-2xl aspect-4/3 sm:aspect-16/10 bg-black/5 shadow-xs border border-[#EAE4DA]/70">
                      <img
                        src={moment.images[0]}
                        alt={moment.title}
                        className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Metadata & Title */}
              <div className="pt-3.5 space-y-2">
                {/* Date & Mood Pills */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7A7169]">
                    {moment.date}
                  </span>

                  {moment.moods && moment.moods.length > 0 && (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {moment.moods.map((mood) => (
                        <span
                          key={mood}
                          className="px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wider uppercase bg-[#EFEBE4] text-[#695F56] border border-[#E5DFD5]"
                        >
                          {mood}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2
                  onClick={() => onSelectMoment(moment)}
                  className="text-2xl sm:text-[26px] font-serif-title font-semibold text-[#24211E] hover:text-[#A8422B] transition-colors cursor-pointer leading-tight tracking-tight"
                  style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
                >
                  {moment.title}
                </h2>

                {/* Excerpt */}
                <p
                  onClick={() => onSelectMoment(moment)}
                  className="text-[15px] leading-relaxed text-[#59524A] font-serif-body line-clamp-3 cursor-pointer"
                  style={{ fontFamily: "'Newsreader', 'Lora', Georgia, serif" }}
                >
                  {moment.story}
                </p>

                {/* Location (if present) */}
                {moment.location && (
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-[#8C847E] tracking-wider uppercase pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#8C847E]" />
                    <span>{moment.location}</span>
                  </div>
                )}

                {/* Action Bar (Likes, Comments, Share) */}
                <div className="flex items-center justify-between pt-2 border-t border-[#EFE9E0]/60">
                  <div className="flex items-center gap-5">
                    {/* Like button */}
                    <button
                      id={`like-btn-${moment.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(moment.id);
                      }}
                      className={`flex items-center gap-1.5 text-xs transition-colors cursor-pointer py-1 ${
                        moment.isLiked
                          ? 'text-[#A8422B] font-semibold'
                          : 'text-[#6B635B] hover:text-[#A8422B]'
                      }`}
                    >
                      <Heart
                        className={`w-4 h-4 transition-transform active:scale-125 ${
                          moment.isLiked ? 'fill-[#A8422B] text-[#A8422B]' : ''
                        }`}
                        strokeWidth={1.8}
                      />
                      <span>{moment.likes}</span>
                    </button>

                    {/* Comments button */}
                    <button
                      id={`comment-btn-${moment.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenComments(moment);
                      }}
                      className="flex items-center gap-1.5 text-xs text-[#6B635B] hover:text-[#2C2825] transition-colors cursor-pointer py-1"
                    >
                      <MessageCircle className="w-4 h-4" strokeWidth={1.8} />
                      <span>{moment.comments.length}</span>
                    </button>
                  </div>

                  {/* Share button */}
                  <button
                    id={`share-btn-${moment.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenShare(moment);
                    }}
                    className="text-[#6B635B] hover:text-[#2C2825] p-1 transition-colors cursor-pointer"
                    title="Share Moment"
                  >
                    <Share2 className="w-4 h-4" strokeWidth={1.8} />
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Footer message */}
      <div className="mt-14 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#A8A19B]">
          End of Recent Moments
        </p>
        <div className="w-12 h-0.5 bg-[#E2DDD6] mx-auto mt-3 rounded-full" />
      </div>
    </div>
  );
};
