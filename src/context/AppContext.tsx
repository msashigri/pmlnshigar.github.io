import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Page, NewsItem, EventItem, GalleryItem, DevelopmentProject, 
  MemberRecord, VolunteerRecord, DonationRecord, ContactMessage, ToastNotification 
} from '../types';
import { 
  INITIAL_NEWS, INITIAL_EVENTS, INITIAL_GALLERY, INITIAL_PROJECTS, 
  INITIAL_MEMBERS, INITIAL_VOLUNTEERS, INITIAL_DONATIONS, INITIAL_CONTACT_MESSAGES 
} from '../data/mockData';

interface AppContextType {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  selectedNews: NewsItem | null;
  setSelectedNews: (news: NewsItem | null) => void;
  selectedProject: DevelopmentProject | null;
  setSelectedProject: (proj: DevelopmentProject | null) => void;
  selectedEvent: EventItem | null;
  setSelectedEvent: (evt: EventItem | null) => void;
  selectedMemberForCard: MemberRecord | null;
  setSelectedMemberForCard: (mem: MemberRecord | null) => void;
  
  newsList: NewsItem[];
  eventsList: EventItem[];
  galleryList: GalleryItem[];
  projectsList: DevelopmentProject[];
  membersList: MemberRecord[];
  volunteersList: VolunteerRecord[];
  donationsList: DonationRecord[];
  messagesList: ContactMessage[];

  addNewsItem: (item: Omit<NewsItem, 'id' | 'views'>) => void;
  deleteNewsItem: (id: string) => void;
  addEventItem: (item: Omit<EventItem, 'id' | 'registeredCount'>) => void;
  deleteEventItem: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  addProjectItem: (item: Omit<DevelopmentProject, 'id'>) => void;
  deleteProjectItem: (id: string) => void;
  updateProjectProgress: (id: string, progress: number, status: 'Completed' | 'Ongoing' | 'Planned') => void;
  
  registerMember: (member: Omit<MemberRecord, 'id' | 'membershipNo' | 'joinedDate' | 'status'>) => MemberRecord;
  registerVolunteer: (vol: Omit<VolunteerRecord, 'id' | 'registeredDate' | 'status'>) => void;
  addDonation: (don: Omit<DonationRecord, 'id' | 'date'>) => void;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;
  markMessageRead: (id: string) => void;

  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  
  toasts: ToastNotification[];
  addToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (val: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<Page>('home');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [selectedProject, setSelectedProject] = useState<DevelopmentProject | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedMemberForCard, setSelectedMemberForCard] = useState<MemberRecord | null>(null);

  const [newsList, setNewsList] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem('pmln_news');
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [eventsList, setEventsList] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('pmln_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [galleryList, setGalleryList] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('pmln_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [projectsList, setProjectsList] = useState<DevelopmentProject[]>(() => {
    const saved = localStorage.getItem('pmln_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [membersList, setMembersList] = useState<MemberRecord[]>(() => {
    const saved = localStorage.getItem('pmln_members');
    return saved ? JSON.parse(saved) : INITIAL_MEMBERS;
  });

  const [volunteersList, setVolunteersList] = useState<VolunteerRecord[]>(() => {
    const saved = localStorage.getItem('pmln_volunteers');
    return saved ? JSON.parse(saved) : INITIAL_VOLUNTEERS;
  });

  const [donationsList, setDonationsList] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem('pmln_donations');
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  const [messagesList, setMessagesList] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('pmln_messages');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_MESSAGES;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem('pmln_is_admin') === 'true';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('pmln_dark_mode') === 'true';
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('pmln_news', JSON.stringify(newsList));
  }, [newsList]);

  useEffect(() => {
    localStorage.setItem('pmln_events', JSON.stringify(eventsList));
  }, [eventsList]);

  useEffect(() => {
    localStorage.setItem('pmln_gallery', JSON.stringify(galleryList));
  }, [galleryList]);

  useEffect(() => {
    localStorage.setItem('pmln_projects', JSON.stringify(projectsList));
  }, [projectsList]);

  useEffect(() => {
    localStorage.setItem('pmln_members', JSON.stringify(membersList));
  }, [membersList]);

  useEffect(() => {
    localStorage.setItem('pmln_volunteers', JSON.stringify(volunteersList));
  }, [volunteersList]);

  useEffect(() => {
    localStorage.setItem('pmln_donations', JSON.stringify(donationsList));
  }, [donationsList]);

  useEffect(() => {
    localStorage.setItem('pmln_messages', JSON.stringify(messagesList));
  }, [messagesList]);

  useEffect(() => {
    localStorage.setItem('pmln_is_admin', String(isAdmin));
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('pmln_dark_mode', String(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const setCurrentPage = (page: Page) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Actions
  const addNewsItem = (item: Omit<NewsItem, 'id' | 'views'>) => {
    const newItem: NewsItem = {
      ...item,
      id: `news-${Date.now()}`,
      views: 1
    };
    setNewsList(prev => [newItem, ...prev]);
    addToast("News published successfully!");
  };

  const deleteNewsItem = (id: string) => {
    setNewsList(prev => prev.filter(n => n.id !== id));
    addToast("News item deleted", "info");
  };

  const addEventItem = (item: Omit<EventItem, 'id' | 'registeredCount'>) => {
    const newEvent: EventItem = {
      ...item,
      id: `event-${Date.now()}`,
      registeredCount: 0
    };
    setEventsList(prev => [newEvent, ...prev]);
    addToast("Event scheduled successfully!");
  };

  const deleteEventItem = (id: string) => {
    setEventsList(prev => prev.filter(e => e.id !== id));
    addToast("Event removed", "info");
  };

  const addGalleryItem = (item: Omit<GalleryItem, 'id'>) => {
    const newGal: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`
    };
    setGalleryList(prev => [newGal, ...prev]);
    addToast("Photo added to gallery!");
  };

  const deleteGalleryItem = (id: string) => {
    setGalleryList(prev => prev.filter(g => g.id !== id));
    addToast("Photo removed from gallery", "info");
  };

  const addProjectItem = (item: Omit<DevelopmentProject, 'id'>) => {
    const newProj: DevelopmentProject = {
      ...item,
      id: `proj-${Date.now()}`
    };
    setProjectsList(prev => [newProj, ...prev]);
    addToast("Development project recorded!");
  };

  const deleteProjectItem = (id: string) => {
    setProjectsList(prev => prev.filter(p => p.id !== id));
    addToast("Project deleted", "info");
  };

  const updateProjectProgress = (id: string, progress: number, status: 'Completed' | 'Ongoing' | 'Planned') => {
    setProjectsList(prev => prev.map(p => p.id === id ? { ...p, progress, status } : p));
    addToast("Project progress updated!");
  };

  const registerMember = (member: Omit<MemberRecord, 'id' | 'membershipNo' | 'joinedDate' | 'status'>): MemberRecord => {
    const count = membersList.length + 1;
    const pad = String(count).padStart(3, '0');
    const membershipNo = `PMLN-SHG-${new Date().getFullYear()}-${pad}`;
    const newMember: MemberRecord = {
      ...member,
      id: `mem-${Date.now()}`,
      membershipNo,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Verified'
    };
    setMembersList(prev => [newMember, ...prev]);
    addToast(`Welcome to PMLN Shigar! Your Membership ID is ${membershipNo}`);
    return newMember;
  };

  const registerVolunteer = (vol: Omit<VolunteerRecord, 'id' | 'registeredDate' | 'status'>) => {
    const newVol: VolunteerRecord = {
      ...vol,
      id: `vol-${Date.now()}`,
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'Approved'
    };
    setVolunteersList(prev => [newVol, ...prev]);
    addToast("Volunteer registration submitted! Thank you for joining PMLN Shigar.");
  };

  const addDonation = (don: Omit<DonationRecord, 'id' | 'date'>) => {
    const newDon: DonationRecord = {
      ...don,
      id: `don-${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    setDonationsList(prev => [newDon, ...prev]);
    addToast(`Thank you! Your donation of PKR ${don.amount.toLocaleString()} has been recorded.`);
  };

  const addContactMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      isRead: false
    };
    setMessagesList(prev => [newMsg, ...prev]);
    addToast("Message sent to PMLN Shigar Secretariat. We will respond shortly!");
  };

  const markMessageRead = (id: string) => {
    setMessagesList(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      selectedNews,
      setSelectedNews,
      selectedProject,
      setSelectedProject,
      selectedEvent,
      setSelectedEvent,
      selectedMemberForCard,
      setSelectedMemberForCard,

      newsList,
      eventsList,
      galleryList,
      projectsList,
      membersList,
      volunteersList,
      donationsList,
      messagesList,

      addNewsItem,
      deleteNewsItem,
      addEventItem,
      deleteEventItem,
      addGalleryItem,
      deleteGalleryItem,
      addProjectItem,
      deleteProjectItem,
      updateProjectProgress,

      registerMember,
      registerVolunteer,
      addDonation,
      addContactMessage,
      markMessageRead,

      isAdmin,
      setIsAdmin,
      isDarkMode,
      toggleDarkMode,

      toasts,
      addToast,
      removeToast,

      isSearchOpen,
      setIsSearchOpen,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
