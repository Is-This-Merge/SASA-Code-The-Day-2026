import React, { useState } from 'react';
import { X, Copy, Check, Share2, Download, Sparkles } from 'lucide-react';
import { MomentItem } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  moment: MomentItem | null;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, moment }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !moment) return null;

  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${moment.title} — ${moment.story}\n\nShared from Moments: ${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: moment.title,
          text: `${moment.title} — ${moment.story}`,
          url: shareUrl,
        });
      } catch {
        // Fallback to copy
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="w-full max-w-sm bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#EFE9E0] p-6 space-y-5 animate-slideUp">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#9E3C1C]" />
            <h3 className="font-serif-title text-xl font-semibold text-[#2C2825]">Share Moment</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EFE9E0]/60 hover:bg-[#EFE9E0] text-[#554F49]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Postcard Preview */}
        <div className="bg-[#FFFFFF] p-3.5 rounded-2xl shadow-sm border border-[#E8E2D8] space-y-2.5">
          {moment.images.length > 0 && (
            <img
              src={moment.images[0]}
              alt={moment.title}
              className="w-full h-44 object-cover rounded-xl"
            />
          )}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wider text-[#A8422B] font-semibold">
              {moment.date} {moment.location && `• ${moment.location}`}
            </span>
            <h4 className="font-serif-title text-base font-medium text-[#2C2825]">{moment.title}</h4>
            <p className="text-xs text-[#6B635B] line-clamp-2 font-serif-body italic">
              "{moment.story}"
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2.5 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#DED7CC] bg-[#F2EDE4]/60 hover:bg-[#EAE3D6] text-xs font-medium text-[#3D3732] transition-colors"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Text'}</span>
          </button>

          <button
            onClick={handleNativeShare}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#9E3C1C] hover:bg-[#852F15] text-white text-xs font-medium transition-colors shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Link</span>
          </button>
        </div>
      </div>
    </div>
  );
};
