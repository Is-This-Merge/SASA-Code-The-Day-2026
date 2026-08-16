import React from 'react';
import { Home, Search, Plus, Archive, User } from 'lucide-react';

export type TabType = 'home' | 'search' | 'new' | 'archive' | 'profile';

interface NavigationProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenNewMoment: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  onOpenNewMoment,
}) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-t border-[#EFE9E0] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-md mx-auto px-6 h-18 flex items-center justify-between">
        {/* Home */}
        <button
          id="nav-btn-home"
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            activeTab === 'home'
              ? 'text-[#A8422B] font-medium'
              : 'text-[#8C847E] hover:text-[#2C2825]'
          }`}
        >
          <Home className="w-5 h-5" strokeWidth={activeTab === 'home' ? 2.3 : 1.8} />
          <span className="text-[11px] tracking-wide">Home</span>
        </button>

        {/* Search */}
        <button
          id="nav-btn-search"
          onClick={() => onSelectTab('search')}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            activeTab === 'search'
              ? 'text-[#A8422B] font-medium'
              : 'text-[#8C847E] hover:text-[#2C2825]'
          }`}
        >
          <Search className="w-5 h-5" strokeWidth={activeTab === 'search' ? 2.3 : 1.8} />
          <span className="text-[11px] tracking-wide">Search</span>
        </button>

        {/* Floating Add Moment Button */}
        <button
          id="nav-btn-new-moment"
          onClick={onOpenNewMoment}
          className="relative -top-2 flex items-center justify-center w-12 h-12 rounded-2xl bg-[#9E3C1C] hover:bg-[#852F15] text-white shadow-lg shadow-[#9E3C1C]/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Create New Moment"
        >
          <Plus className="w-6 h-6" strokeWidth={2.5} />
        </button>

        {/* Archive */}
        <button
          id="nav-btn-archive"
          onClick={() => onSelectTab('archive')}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            activeTab === 'archive'
              ? 'text-[#A8422B] font-medium'
              : 'text-[#8C847E] hover:text-[#2C2825]'
          }`}
        >
          <Archive className="w-5 h-5" strokeWidth={activeTab === 'archive' ? 2.3 : 1.8} />
          <span className="text-[11px] tracking-wide">Archive</span>
        </button>

        {/* Profile */}
        <button
          id="nav-btn-profile"
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
            activeTab === 'profile'
              ? 'text-[#A8422B] font-medium'
              : 'text-[#8C847E] hover:text-[#2C2825]'
          }`}
        >
          <User className="w-5 h-5" strokeWidth={activeTab === 'profile' ? 2.3 : 1.8} />
          <span className="text-[11px] tracking-wide">Profile</span>
        </button>
      </div>
    </nav>
  );
};
