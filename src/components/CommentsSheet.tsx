import React, { useState } from 'react';
import { X, Send, Heart } from 'lucide-react';
import { Comment, UserProfile } from '../types';

interface CommentsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  momentTitle: string;
  comments: Comment[];
  currentUser: UserProfile;
  onAddComment: (text: string) => void;
}

export const CommentsSheet: React.FC<CommentsSheetProps> = ({
  isOpen,
  onClose,
  momentTitle,
  comments,
  currentUser,
  onAddComment,
}) => {
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onAddComment(inputText.trim());
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4 animate-fadeIn">
      <div className="w-full max-w-md bg-[#FAF8F5] rounded-t-3xl sm:rounded-3xl shadow-2xl border border-[#EFE9E0] max-h-[85vh] flex flex-col overflow-hidden animate-slideUp">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#EFE9E0] flex items-center justify-between bg-[#FAF8F5]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#8C847E] font-medium">Comments</span>
            <h3 className="font-serif-title text-lg font-semibold text-[#2C2825] truncate max-w-[260px]">
              {momentTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EFE9E0]/60 hover:bg-[#EFE9E0] text-[#554F49] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-[#8C847E]">
              <p className="font-serif-body italic text-base">No reflections or comments yet.</p>
              <p className="text-xs mt-1">Be the first to share your thoughts on this moment.</p>
            </div>
          ) : (
            comments.map((c) => (
              <div key={c.id} className="flex items-start gap-3 group">
                <img
                  src={c.avatar}
                  alt={c.author}
                  className="w-8 h-8 rounded-full object-cover border border-[#E0D9CE] flex-shrink-0"
                />
                <div className="flex-1 bg-[#F2EDE4]/60 rounded-2xl p-3.5 border border-[#EAE3D6]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-medium text-xs text-[#2C2825]">{c.author}</span>
                    <span className="text-[10px] text-[#A8A19B]">{c.createdAt}</span>
                  </div>
                  <p className="text-sm text-[#47413B] font-serif-body leading-relaxed">{c.text}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New Comment Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-[#EFE9E0] bg-[#FAF8F5] flex items-center gap-2">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover border border-[#E0D9CE]"
          />
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Add a thought or reflection..."
              className="w-full bg-[#F2EDE4]/80 text-[#2C2825] placeholder-[#A8A19B] text-sm px-4 py-2.5 rounded-full border border-[#E2DDD3] focus:outline-hidden focus:border-[#9E3C1C] focus:bg-white transition-all pr-10"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#9E3C1C] text-white flex items-center justify-center disabled:opacity-40 disabled:hover:bg-[#9E3C1C] hover:bg-[#852F15] transition-all cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
