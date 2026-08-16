import React, { useState, useEffect } from 'react';
import { initialMoments, currentUser as defaultUser } from './data/initialData';
import { MomentItem, UserProfile } from './types';
import { HomeFeed } from './components/HomeFeed';
import { ArchiveView } from './components/ArchiveView';
import { MomentDetail } from './components/MomentDetail';
import { NewMoment } from './components/NewMoment';
import { SearchDiscover } from './components/SearchDiscover';
import { ProfileView } from './components/ProfileView';
import { Navigation, TabType } from './components/Navigation';
import { CommentsSheet } from './components/CommentsSheet';
import { ShareModal } from './components/ShareModal';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Local storage persistence
  const [moments, setMoments] = useState<MomentItem[]>(() => {
    const saved = localStorage.getItem('moments_data_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialMoments;
      }
    }
    return initialMoments;
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('moments_user_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultUser;
      }
    }
    return defaultUser;
  });

  useEffect(() => {
    localStorage.setItem('moments_data_v1', JSON.stringify(moments));
  }, [moments]);

  useEffect(() => {
    localStorage.setItem('moments_user_v1', JSON.stringify(user));
  }, [user]);

  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedMoment, setSelectedMoment] = useState<MomentItem | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingMoment, setEditingMoment] = useState<MomentItem | null>(null);

  // Modals
  const [commentsMoment, setCommentsMoment] = useState<MomentItem | null>(null);
  const [shareMoment, setShareMoment] = useState<MomentItem | null>(null);

  // Frame View Mode: 'frame' (iPhone / mobile frame) or 'full' (responsive web)
  const [isFramedView, setIsFramedView] = useState(false);

  // Handlers
  const handleSelectMoment = (moment: MomentItem) => {
    setSelectedMoment(moment);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleLike = (momentId: string) => {
    setMoments((prev) =>
      prev.map((m) => {
        if (m.id === momentId) {
          const isLiked = !m.isLiked;
          return {
            ...m,
            isLiked,
            likes: isLiked ? m.likes + 1 : m.likes - 1,
          };
        }
        return m;
      })
    );

    if (selectedMoment && selectedMoment.id === momentId) {
      setSelectedMoment((prev) =>
        prev
          ? {
              ...prev,
              isLiked: !prev.isLiked,
              likes: !prev.isLiked ? prev.likes + 1 : prev.likes - 1,
            }
          : null
      );
    }
  };

  const handleAddComment = (text: string) => {
    if (!commentsMoment) return;
    const newComment = {
      id: `c-${Date.now()}`,
      author: user.name,
      avatar: user.avatar,
      text,
      createdAt: 'Just now',
    };

    setMoments((prev) =>
      prev.map((m) => {
        if (m.id === commentsMoment.id) {
          const updated = { ...m, comments: [newComment, ...m.comments] };
          setCommentsMoment(updated);
          if (selectedMoment && selectedMoment.id === m.id) {
            setSelectedMoment(updated);
          }
          return updated;
        }
        return m;
      })
    );
  };

  const handleAddReflection = (momentId: string, text: string) => {
    const newReflection = {
      id: `ref-${Date.now()}`,
      text,
      date: `Added ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
    };

    setMoments((prev) =>
      prev.map((m) => {
        if (m.id === momentId) {
          const updated = {
            ...m,
            reflections: [newReflection, ...(m.reflections || [])],
          };
          if (selectedMoment && selectedMoment.id === m.id) {
            setSelectedMoment(updated);
          }
          return updated;
        }
        return m;
      })
    );
  };

  const handleSaveMoment = (savedItem: MomentItem) => {
    setMoments((prev) => {
      const exists = prev.some((m) => m.id === savedItem.id);
      if (exists) {
        return prev.map((m) => (m.id === savedItem.id ? savedItem : m));
      } else {
        return [savedItem, ...prev];
      }
    });

    setUser((prev) => ({
      ...prev,
      totalMoments: prev.totalMoments + (editingMoment ? 0 : 1),
    }));

    setIsCreatingNew(false);
    setEditingMoment(null);
    setSelectedMoment(savedItem);
  };

  const handleStartEdit = (moment: MomentItem) => {
    setEditingMoment(moment);
    setIsCreatingNew(true);
    setSelectedMoment(null);
  };

  const handleOpenNew = () => {
    setEditingMoment(null);
    setIsCreatingNew(true);
    setSelectedMoment(null);
  };

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    setSelectedMoment(null);
    setIsCreatingNew(false);
    setEditingMoment(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#2C2825] flex flex-col items-center">
      {/* Top Floating View Switcher on Desktop */}
      <div className="hidden lg:flex fixed top-3 right-4 z-50 items-center gap-1.5 p-1.5 rounded-full bg-[#FFFFFF]/90 backdrop-blur-md shadow-md border border-[#E5DFD5]">
        <button
          onClick={() => setIsFramedView(false)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            !isFramedView
              ? 'bg-[#9E3C1C] text-white shadow-xs'
              : 'text-[#6B635B] hover:text-[#2C2825]'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Full Width</span>
        </button>
        <button
          onClick={() => setIsFramedView(true)}
          className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all ${
            isFramedView
              ? 'bg-[#9E3C1C] text-white shadow-xs'
              : 'text-[#6B635B] hover:text-[#2C2825]'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Mobile Device Frame</span>
        </button>
      </div>

      {/* Main Container */}
      <div
        className={`w-full transition-all duration-300 min-h-screen ${
          isFramedView
            ? 'max-w-[430px] my-6 rounded-[44px] shadow-2xl border-[8px] border-[#2C2825] bg-[#FAF8F5] overflow-hidden relative'
            : 'max-w-md md:max-w-xl lg:max-w-2xl bg-[#FAF8F5] shadow-xs'
        }`}
      >
        {/* Device Notch if framed */}
        {isFramedView && (
          <div className="w-full flex justify-center pt-2 pb-1 bg-[#FAF8F5]">
            <div className="w-32 h-4 bg-[#2C2825] rounded-full" />
          </div>
        )}

        {/* Screen Routing */}
        <main className="w-full">
          {isCreatingNew ? (
            <NewMoment
              initialData={editingMoment}
              onBack={() => {
                setIsCreatingNew(false);
                setEditingMoment(null);
              }}
              onSave={handleSaveMoment}
            />
          ) : selectedMoment ? (
            <MomentDetail
              moment={selectedMoment}
              currentUser={user}
              onBack={() => setSelectedMoment(null)}
              onEdit={handleStartEdit}
              onShare={(m) => setShareMoment(m)}
              onAddReflection={handleAddReflection}
            />
          ) : activeTab === 'home' ? (
            <HomeFeed
              moments={moments}
              currentUser={user}
              onSelectMoment={handleSelectMoment}
              onToggleLike={handleToggleLike}
              onOpenComments={(m) => setCommentsMoment(m)}
              onOpenShare={(m) => setShareMoment(m)}
              onOpenProfile={() => setActiveTab('profile')}
            />
          ) : activeTab === 'archive' ? (
            <ArchiveView
              moments={moments}
              currentUser={user}
              onSelectMoment={handleSelectMoment}
              onOpenProfile={() => setActiveTab('profile')}
            />
          ) : activeTab === 'search' ? (
            <SearchDiscover
              moments={moments}
              onSelectMoment={handleSelectMoment}
            />
          ) : (
            <ProfileView
              currentUser={user}
              moments={moments}
              onUpdateProfile={(updated) => setUser((prev) => ({ ...prev, ...updated }))}
              onSelectMoment={handleSelectMoment}
            />
          )}
        </main>

        {/* Persistent Bottom Navigation (visible unless inside Detail or New Moment) */}
        {!selectedMoment && !isCreatingNew && (
          <Navigation
            activeTab={activeTab}
            onSelectTab={handleSelectTab}
            onOpenNewMoment={handleOpenNew}
          />
        )}
      </div>

      {/* Interactive Comments Sheet */}
      <CommentsSheet
        isOpen={!!commentsMoment}
        onClose={() => setCommentsMoment(null)}
        momentTitle={commentsMoment?.title || ''}
        comments={commentsMoment?.comments || []}
        currentUser={user}
        onAddComment={handleAddComment}
      />

      {/* Interactive Share Modal */}
      <ShareModal
        isOpen={!!shareMoment}
        onClose={() => setShareMoment(null)}
        moment={shareMoment}
      />
    </div>
  );
}
