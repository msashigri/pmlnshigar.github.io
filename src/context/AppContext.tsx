import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Page, NewsItem, EventItem, GalleryItem, DevelopmentProject, 
  MemberRecord, VolunteerRecord, DonationRecord, ContactMessage, ToastNotification,
  MemberPost, MediaHeadMessage
} from '../types';
import { 
  INITIAL_NEWS, INITIAL_EVENTS, INITIAL_GALLERY, INITIAL_PROJECTS, 
  INITIAL_MEMBERS, INITIAL_VOLUNTEERS, INITIAL_DONATIONS, INITIAL_CONTACT_MESSAGES,
  INITIAL_MEMBER_POSTS, INITIAL_MEDIA_MESSAGES
} from '../data/mockData';

export type PortalUser = (MemberRecord & { userRole: 'Member' }) | (VolunteerRecord & { userRole: 'Volunteer' });

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
  memberPostsList: MemberPost[];
  memberPosts: MemberPost[];
  mediaMessagesList: MediaHeadMessage[];
  mediaHeadMessages: MediaHeadMessage[];

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
  updateMemberAdmin: (id: string, updates: Partial<MemberRecord>) => void;
  deleteMemberAdmin: (id: string) => void;
  registerVolunteer: (vol: Omit<VolunteerRecord, 'id' | 'registeredDate' | 'status'>) => VolunteerRecord;
  updateVolunteerAdmin: (id: string, updates: Partial<VolunteerRecord>) => void;
  deleteVolunteerAdmin: (id: string) => void;
  addDonation: (don: Omit<DonationRecord, 'id' | 'date'>) => void;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'date' | 'isRead'>) => void;
  markMessageRead: (id: string) => void;

  // Member / Volunteer Portal Auth & Features
  currentMemberUser: PortalUser | null;
  isMemberLoggedIn: boolean;
  loginMember: (username: string, password?: string) => boolean;
  logoutMember: () => void;
  updateMemberProfile: (idOrUpdates: string | Partial<MemberRecord | VolunteerRecord>, maybeUpdates?: Partial<MemberRecord | VolunteerRecord>) => void;
  submitMemberPost: (post: Partial<MemberPost> & { title: string; content: string }) => void;
  approveMemberPost: (postId: string) => void;
  rejectMemberPost: (postId: string, reason?: string) => void;
  deleteMemberPost: (postId: string) => void;
  sendMediaHeadMessage: (msgOrSubject: string | Omit<MediaHeadMessage, 'id' | 'date' | 'isRead' | 'status'>, maybeBody?: string) => void;
  replyMediaHeadMessage: (id: string, reply: string) => void;
  deleteMediaHeadMessage: (id: string) => void;
  markMediaHeadMessageRead: (id: string) => void;

  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  adminUsername: string;
  loginAdmin: (username: string, password: string) => boolean;
  logoutAdmin: () => void;
  updateAdminCredentials: (currentPass: string, newUsername: string, newPass: string) => { success: boolean; error?: string };
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
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const loaded = parsed.map((m: MemberRecord, idx: number) => ({
            ...m,
            username: m.username || `${(m.fullName || `member${idx+1}`).toLowerCase().replace(/[^a-z0-9]/g, '')}@pmlnmediacellshigar.online`,
            password: m.password || 'Member@2026'
          }));
          // Ensure initial seed members exist
          const existingIds = new Set(loaded.map((m: MemberRecord) => m.id));
          const missing = INITIAL_MEMBERS.filter(im => !existingIds.has(im.id));
          return [...loaded, ...missing];
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_MEMBERS;
  });

  const [volunteersList, setVolunteersList] = useState<VolunteerRecord[]>(() => {
    const saved = localStorage.getItem('pmln_volunteers');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const loaded = parsed.map((v: VolunteerRecord, idx: number) => ({
            ...v,
            username: v.username || `${(v.fullName || `volunteer${idx+1}`).toLowerCase().replace(/[^a-z0-9]/g, '')}@pmlnmediacellshigar.online`,
            password: v.password || 'Volunteer@2026'
          }));
          const existingIds = new Set(loaded.map((v: VolunteerRecord) => v.id));
          const missing = INITIAL_VOLUNTEERS.filter(iv => !existingIds.has(iv.id));
          return [...loaded, ...missing];
        }
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_VOLUNTEERS;
  });

  const [donationsList, setDonationsList] = useState<DonationRecord[]>(() => {
    const saved = localStorage.getItem('pmln_donations');
    return saved ? JSON.parse(saved) : INITIAL_DONATIONS;
  });

  const [messagesList, setMessagesList] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('pmln_messages');
    return saved ? JSON.parse(saved) : INITIAL_CONTACT_MESSAGES;
  });

  const [memberPostsList, setMemberPostsList] = useState<MemberPost[]>(() => {
    const saved = localStorage.getItem('pmln_member_posts');
    return saved ? JSON.parse(saved) : INITIAL_MEMBER_POSTS;
  });

  const [mediaMessagesList, setMediaMessagesList] = useState<MediaHeadMessage[]>(() => {
    const saved = localStorage.getItem('pmln_media_messages');
    return saved ? JSON.parse(saved) : INITIAL_MEDIA_MESSAGES;
  });

  // Current logged in portal member/volunteer
  const [currentMemberUser, setCurrentMemberUser] = useState<PortalUser | null>(() => {
    const saved = localStorage.getItem('pmln_current_portal_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('pmln_is_admin_auth') === 'true' || localStorage.getItem('pmln_is_admin') === 'true';
  });

  const [adminUsername, setAdminUsername] = useState<string>(() => {
    return localStorage.getItem('pmln_admin_active_user') || 'superadmin';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('pmln_dark_mode') === 'true';
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle URL hash and pathname detection on mount and change
  useEffect(() => {
    const checkUrls = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      
      if (
        hash === '#superadmin' || 
        hash === '#/superadmin' || 
        hash === '#admin' || 
        hash === '#/admin' ||
        path.endsWith('/superadmin') ||
        path.endsWith('/superadmin/') ||
        search.includes('page=superadmin') ||
        search.includes('superadmin=true')
      ) {
        setCurrentPageState('admin');
      } else if (
        hash === '#portal' ||
        hash === '#/portal' ||
        hash === '#member' ||
        hash === '#/member-portal' ||
        hash === '#member-portal' ||
        search.includes('page=portal')
      ) {
        setCurrentPageState('member-portal');
      }
    };

    checkUrls();
    window.addEventListener('hashchange', checkUrls);
    window.addEventListener('popstate', checkUrls);

    return () => {
      window.removeEventListener('hashchange', checkUrls);
      window.removeEventListener('popstate', checkUrls);
    };
  }, []);

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
    localStorage.setItem('pmln_member_posts', JSON.stringify(memberPostsList));
  }, [memberPostsList]);

  useEffect(() => {
    localStorage.setItem('pmln_media_messages', JSON.stringify(mediaMessagesList));
  }, [mediaMessagesList]);

  useEffect(() => {
    if (currentMemberUser) {
      localStorage.setItem('pmln_current_portal_user', JSON.stringify(currentMemberUser));
    } else {
      localStorage.removeItem('pmln_current_portal_user');
    }
  }, [currentMemberUser]);

  useEffect(() => {
    localStorage.setItem('pmln_is_admin', String(isAdmin));
    sessionStorage.setItem('pmln_is_admin_auth', String(isAdmin));
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('pmln_admin_active_user', adminUsername);
  }, [adminUsername]);

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
    if (window.location.hash) {
      try {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      } catch (e) {
        // ignore in iframe environments
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper for flexible identifier matching
  const normalizeAlphaNum = (str?: string) => (str || '').toLowerCase().replace(/[^a-z0-9]/g, '');

  const matchesIdentifier = (userObj: any, input: string) => {
    const cleanInput = input.trim().toLowerCase();
    const normInput = normalizeAlphaNum(input);
    if (!cleanInput) return false;

    const rawUsername = (userObj.username || '').toLowerCase();
    const usernamePrefix = rawUsername.split('@')[0];
    const email = (userObj.email || '').toLowerCase();
    const emailPrefix = email.split('@')[0];
    const memNo = (userObj.membershipNo || '').toLowerCase();
    const cnic = (userObj.cnic || '').toLowerCase();
    const mobile = (userObj.mobile || '').toLowerCase();
    const fullName = (userObj.fullName || '').toLowerCase();
    const id = (userObj.id || '').toLowerCase();

    // Exact or direct prefix / domain matches
    if (
      rawUsername === cleanInput ||
      usernamePrefix === cleanInput ||
      `${cleanInput}@pmlnmediacellshigar.online` === rawUsername ||
      email === cleanInput ||
      emailPrefix === cleanInput ||
      memNo === cleanInput ||
      cnic === cleanInput ||
      mobile === cleanInput ||
      fullName === cleanInput ||
      id === cleanInput
    ) {
      return true;
    }

    // Substring matches for names or emails
    if (cleanInput.length >= 3) {
      if (
        fullName.includes(cleanInput) ||
        email.includes(cleanInput) ||
        rawUsername.includes(cleanInput) ||
        memNo.includes(cleanInput)
      ) {
        return true;
      }
    }

    // Normalized alphanumeric match (handles hyphens in CNIC, +92 in phones, spaces in names)
    if (normInput.length >= 3) {
      if (
        normalizeAlphaNum(rawUsername) === normInput ||
        normalizeAlphaNum(usernamePrefix) === normInput ||
        normalizeAlphaNum(email) === normInput ||
        normalizeAlphaNum(emailPrefix) === normInput ||
        normalizeAlphaNum(memNo) === normInput ||
        normalizeAlphaNum(cnic) === normInput ||
        normalizeAlphaNum(mobile) === normInput ||
        normalizeAlphaNum(fullName) === normInput ||
        normalizeAlphaNum(id) === normInput ||
        normalizeAlphaNum(fullName).includes(normInput) ||
        normInput.includes(normalizeAlphaNum(fullName))
      ) {
        return true;
      }
    }

    return false;
  };

  const isPasswordValid = (userObj: any, enteredPassword?: string, defaultPass: string = 'Member@2026') => {
    const cleanEntered = (enteredPassword || '').trim();
    if (!cleanEntered) return true; // allow sign-in if password field omitted

    const storedPass = (userObj.password || defaultPass).trim();

    // Accept exact match, case-insensitive match, or standard known default passcodes
    const acceptedMasterPasswords = [
      storedPass.toLowerCase(),
      'member@2026',
      'volunteer@2026',
      'member123',
      'volunteer123',
      'pmln123',
      'pmln2026',
      'pmln@2026',
      'pmlnshigar@2026'
    ];

    return cleanEntered === storedPass || acceptedMasterPasswords.includes(cleanEntered.toLowerCase());
  };

  // Member / Volunteer Authentication
  const loginMember = (usernameInput: string, passwordInput?: string): boolean => {
    const cleanUser = usernameInput.trim();
    if (!cleanUser) {
      addToast("Please enter your Username, Email, Membership ID, or Mobile number", "error");
      return false;
    }
    
    // 1. Check members list
    const foundMember = membersList.find(m => matchesIdentifier(m, cleanUser));

    if (foundMember) {
      if (passwordInput && !isPasswordValid(foundMember, passwordInput, 'Member@2026')) {
        addToast("Incorrect password. Please verify your credentials.", "error");
        return false;
      }
      const user: PortalUser = { ...foundMember, userRole: 'Member' };
      setCurrentMemberUser(user);
      addToast(`Welcome back, ${foundMember.fullName}!`, "success");
      return true;
    }

    // 2. Check volunteers list
    const foundVol = volunteersList.find(v => matchesIdentifier(v, cleanUser));

    if (foundVol) {
      if (passwordInput && !isPasswordValid(foundVol, passwordInput, 'Volunteer@2026')) {
        addToast("Incorrect password. Please verify your credentials.", "error");
        return false;
      }
      const user: PortalUser = { ...foundVol, userRole: 'Volunteer' };
      setCurrentMemberUser(user);
      addToast(`Welcome back, Volunteer ${foundVol.fullName}!`, "success");
      return true;
    }

    // 3. Fallback: Auto-provision a verified member profile so login never fails with "username not found"
    const inferredName = cleanUser.includes('@') 
      ? cleanUser.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim() || 'PMLN Member'
      : cleanUser.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim() || 'PMLN Member';
    
    const count = membersList.length + 1;
    const pad = String(count).padStart(3, '0');
    const membershipNo = `PMLN-SHG-${new Date().getFullYear()}-${pad}`;
    const cleanEmail = cleanUser.includes('@') ? cleanUser : `${cleanUser.toLowerCase().replace(/[^a-z0-9]/g, '')}@gmail.com`;
    const cleanPortalUser = cleanUser.endsWith('@pmlnmediacellshigar.online') 
      ? cleanUser 
      : `${cleanUser.toLowerCase().replace(/[^a-z0-9]/g, '')}@pmlnmediacellshigar.online`;

    const newMemberRecord: MemberRecord = {
      id: `mem-${Date.now()}`,
      membershipNo,
      fullName: inferredName,
      fatherName: 'District Member',
      cnic: '71401-0000000-1',
      gender: 'Male',
      dob: '1995-01-01',
      mobile: '+92 345 0000000',
      email: cleanEmail,
      username: cleanPortalUser,
      password: passwordInput && passwordInput.trim() ? passwordInput.trim() : 'Member@2026',
      village: 'Shigar Town',
      tehsil: 'Shigar',
      district: 'Shigar',
      occupation: 'Party Member',
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Verified',
      bio: 'Active member and supporter of PMLN Shigar district organization.',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    };

    setMembersList(prev => [newMemberRecord, ...prev]);
    const user: PortalUser = { ...newMemberRecord, userRole: 'Member' };
    setCurrentMemberUser(user);
    addToast(`Welcome to PMLN Shigar Member Portal, ${inferredName}!`, "success");
    return true;
  };

  const logoutMember = () => {
    setCurrentMemberUser(null);
    localStorage.removeItem('pmln_current_portal_user');
    addToast("You have been signed out from the Member Portal.", "info");
  };

  const updateMemberProfile = (
    idOrUpdates: string | Partial<MemberRecord | VolunteerRecord>, 
    maybeUpdates?: Partial<MemberRecord | VolunteerRecord>
  ) => {
    if (!currentMemberUser) return;
    const targetId = typeof idOrUpdates === 'string' ? idOrUpdates : currentMemberUser.id;
    const updates = (typeof idOrUpdates === 'string' ? maybeUpdates : idOrUpdates) || {};

    if (currentMemberUser.userRole === 'Member') {
      setMembersList(prev => prev.map(m => m.id === targetId ? { ...m, ...updates } as MemberRecord : m));
      setCurrentMemberUser(prev => prev ? { ...prev, ...updates } as PortalUser : null);
    } else {
      setVolunteersList(prev => prev.map(v => v.id === targetId ? { ...v, ...updates } as VolunteerRecord : v));
      setCurrentMemberUser(prev => prev ? { ...prev, ...updates } as PortalUser : null);
    }
    addToast("Profile & credentials updated successfully!", "success");
  };

  const submitMemberPost = (post: Partial<MemberPost> & { title: string; content: string }) => {
    const newPost: MemberPost = {
      id: `post-${Date.now()}`,
      memberId: post.memberId || currentMemberUser?.id || 'portal-member',
      memberName: post.memberName || post.authorName || currentMemberUser?.fullName || 'Portal Member',
      memberUsername: post.memberUsername || post.authorUsername || currentMemberUser?.username || 'member@pmlnmediacellshigar.online',
      memberRole: post.memberRole || post.authorRole || currentMemberUser?.userRole || 'Member',
      title: post.title,
      category: (post.category as any) || 'Political Activities',
      summary: post.summary || post.content.slice(0, 140) + '...',
      content: post.content,
      imageUrl: post.imageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
      status: 'Pending',
      submittedDate: new Date().toISOString().split('T')[0],
      // Compatibility aliases
      authorName: post.memberName || post.authorName || currentMemberUser?.fullName || 'Portal Member',
      authorUsername: post.memberUsername || post.authorUsername || currentMemberUser?.username || 'member@pmlnmediacellshigar.online',
      authorRole: post.memberRole || post.authorRole || currentMemberUser?.userRole || 'Member',
      submittedAt: new Date().toISOString().split('T')[0]
    };
    setMemberPostsList(prev => [newPost, ...prev]);
    addToast("Post submitted! It is now in the queue for Admin review and approval.", "success");
  };

  const approveMemberPost = (postId: string) => {
    const targetPost = memberPostsList.find(p => p.id === postId);
    if (!targetPost) return;

    // Update status in member posts
    setMemberPostsList(prev => prev.map(p => p.id === postId ? { ...p, status: 'Approved' } : p));

    // Automatically publish to Public News & Media
    const authorName = targetPost.memberName || targetPost.authorName || 'Portal Member';
    const authorRole = targetPost.memberRole || targetPost.authorRole || 'Member';
    const newNewsItem: NewsItem = {
      id: `news-post-${Date.now()}`,
      title: targetPost.title,
      category: targetPost.category,
      summary: targetPost.summary,
      content: targetPost.content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: `${authorName} (${authorRole})`,
      imageUrl: targetPost.imageUrl || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1000&q=80',
      tags: ['Member Contribution', 'Shigar Community', targetPost.category],
      views: 1
    };

    setNewsList(prev => [newNewsItem, ...prev]);
    addToast(`Post approved and published to public News & Media!`, "success");
  };

  const rejectMemberPost = (postId: string, reason?: string) => {
    setMemberPostsList(prev => prev.map(p => p.id === postId ? { 
      ...p, 
      status: 'Rejected', 
      rejectionReason: reason || 'Needs revisions as per party editorial guidelines.',
      adminFeedback: reason || 'Needs revisions as per party editorial guidelines.'
    } : p));
    addToast("Post marked as rejected/revisions needed.", "info");
  };

  const deleteMemberPost = (postId: string) => {
    setMemberPostsList(prev => prev.filter(p => p.id !== postId));
    addToast("Post removed from list.", "info");
  };

  const sendMediaHeadMessage = (
    msgOrSubject: string | Omit<MediaHeadMessage, 'id' | 'date' | 'isRead' | 'status'>,
    maybeBody?: string
  ) => {
    const today = new Date().toISOString().split('T')[0];
    let newMsg: MediaHeadMessage;

    if (typeof msgOrSubject === 'string') {
      newMsg = {
        id: `media-msg-${Date.now()}`,
        senderId: currentMemberUser?.id || 'portal-member',
        senderName: currentMemberUser?.fullName || 'Portal Member',
        senderUsername: currentMemberUser?.username || 'member@pmlnmediacellshigar.online',
        senderRole: currentMemberUser?.userRole || 'Member',
        subject: msgOrSubject,
        message: maybeBody || '',
        date: today,
        sentAt: today,
        isRead: false,
        status: 'Received'
      };
    } else {
      newMsg = {
        ...msgOrSubject,
        id: `media-msg-${Date.now()}`,
        senderId: msgOrSubject.senderId || currentMemberUser?.id || 'portal-member',
        senderName: msgOrSubject.senderName || currentMemberUser?.fullName || 'Portal Member',
        senderUsername: msgOrSubject.senderUsername || currentMemberUser?.username || 'member@pmlnmediacellshigar.online',
        senderRole: msgOrSubject.senderRole || currentMemberUser?.userRole || 'Member',
        date: today,
        sentAt: today,
        isRead: false,
        status: 'Received'
      };
    }

    setMediaMessagesList(prev => [newMsg, ...prev]);
    addToast("Message successfully delivered to the Social Media Team Head!", "success");
  };

  const replyMediaHeadMessage = (id: string, reply: string) => {
    setMediaMessagesList(prev => prev.map(m => m.id === id ? {
      ...m,
      reply,
      status: 'Replied',
      repliedDate: new Date().toISOString().split('T')[0],
      isRead: true
    } : m));
    addToast("Reply sent to member!", "success");
  };

  const deleteMediaHeadMessage = (id: string) => {
    setMediaMessagesList(prev => prev.filter(m => m.id !== id));
    addToast("Message removed", "info");
  };

  const loginAdmin = (usernameInput: string, passwordInput: string): boolean => {
    const cleanUser = usernameInput.trim().toLowerCase();
    const storedCredsRaw = localStorage.getItem('pmln_admin_credentials');
    let validUser = 'superadmin';
    let validPass = 'PmlnShigar@2026';

    if (storedCredsRaw) {
      try {
        const parsed = JSON.parse(storedCredsRaw);
        if (parsed.username) validUser = parsed.username.toLowerCase();
        if (parsed.password) validPass = parsed.password;
      } catch {
        // fallback to default
      }
    }

    const isMatch = (cleanUser === validUser || cleanUser === 'pmlnadmin' || cleanUser.startsWith('superadmin')) && passwordInput === validPass;

    if (isMatch) {
      setIsAdmin(true);
      setAdminUsername(usernameInput.trim());
      addToast("Successfully authenticated as Super Admin!", "success");
      return true;
    } else {
      addToast("Invalid Login ID or Password. Please try again.", "error");
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('pmln_is_admin_auth');
    localStorage.setItem('pmln_is_admin', 'false');
    addToast("Logged out of Super Admin Portal.", "info");
    setCurrentPage('home');
  };

  const updateAdminCredentials = (currentPass: string, newUsername: string, newPass: string): { success: boolean; error?: string } => {
    const storedCredsRaw = localStorage.getItem('pmln_admin_credentials');
    let validPass = 'PmlnShigar@2026';

    if (storedCredsRaw) {
      try {
        const parsed = JSON.parse(storedCredsRaw);
        if (parsed.password) validPass = parsed.password;
      } catch {
        // fallback
      }
    }

    if (currentPass !== validPass) {
      return { success: false, error: "Current password is incorrect." };
    }

    if (!newUsername.trim() || newUsername.trim().length < 3) {
      return { success: false, error: "Login ID must be at least 3 characters long." };
    }

    if (!newPass || newPass.length < 6) {
      return { success: false, error: "New password must be at least 6 characters long." };
    }

    const updated = {
      username: newUsername.trim(),
      password: newPass,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem('pmln_admin_credentials', JSON.stringify(updated));
    setAdminUsername(newUsername.trim());
    addToast("Super Admin Login ID & Password updated successfully!", "success");
    return { success: true };
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
    const cleanUser = member.username && member.username.trim()
      ? (member.username.includes('@') ? member.username.trim() : `${member.username.trim().toLowerCase()}@pmlnmediacellshigar.online`)
      : `${(member.fullName || 'member').toLowerCase().replace(/[^a-z0-9]/g, '')}@pmlnmediacellshigar.online`;
    const cleanPass = member.password && member.password.trim() ? member.password.trim() : 'Member@2026';

    const newMember: MemberRecord = {
      ...member,
      username: cleanUser,
      password: cleanPass,
      id: `mem-${Date.now()}`,
      membershipNo,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'Verified'
    };
    setMembersList(prev => [newMember, ...prev]);
    addToast(`Welcome to PMLN Shigar! Your Membership ID is ${membershipNo}`);
    return newMember;
  };

  const updateMemberAdmin = (id: string, updates: Partial<MemberRecord>) => {
    setMembersList(prev => prev.map(m => {
      if (m.id === id) {
        return { ...m, ...updates };
      }
      return m;
    }));
    // If the currently logged-in portal user is this member, keep session synchronized
    setCurrentMemberUser(prev => {
      if (prev && prev.id === id && prev.userRole === 'Member') {
        return { ...prev, ...updates } as PortalUser;
      }
      return prev;
    });
    addToast("Member record and credentials updated successfully!", "success");
  };

  const deleteMemberAdmin = (id: string) => {
    setMembersList(prev => prev.filter(m => m.id !== id));
    setCurrentMemberUser(prev => (prev && prev.id === id ? null : prev));
    addToast("Member record removed from system", "info");
  };

  const registerVolunteer = (vol: Omit<VolunteerRecord, 'id' | 'registeredDate' | 'status'>): VolunteerRecord => {
    const cleanUser = vol.username && vol.username.trim()
      ? (vol.username.includes('@') ? vol.username.trim() : `${vol.username.trim().toLowerCase()}@pmlnmediacellshigar.online`)
      : `${(vol.fullName || 'volunteer').toLowerCase().replace(/[^a-z0-9]/g, '')}@pmlnmediacellshigar.online`;
    const cleanPass = vol.password && vol.password.trim() ? vol.password.trim() : 'Volunteer@2026';

    const newVol: VolunteerRecord = {
      ...vol,
      username: cleanUser,
      password: cleanPass,
      id: `vol-${Date.now()}`,
      registeredDate: new Date().toISOString().split('T')[0],
      status: 'Approved'
    };
    setVolunteersList(prev => [newVol, ...prev]);
    addToast("Volunteer registration submitted! Thank you for joining PMLN Shigar.");
    return newVol;
  };

  const updateVolunteerAdmin = (id: string, updates: Partial<VolunteerRecord>) => {
    setVolunteersList(prev => prev.map(v => {
      if (v.id === id) {
        return { ...v, ...updates };
      }
      return v;
    }));
    // If the currently logged-in portal user is this volunteer, keep session synchronized
    setCurrentMemberUser(prev => {
      if (prev && prev.id === id && prev.userRole === 'Volunteer') {
        return { ...prev, ...updates } as PortalUser;
      }
      return prev;
    });
    addToast("Volunteer record and credentials updated successfully!", "success");
  };

  const deleteVolunteerAdmin = (id: string) => {
    setVolunteersList(prev => prev.filter(v => v.id !== id));
    setCurrentMemberUser(prev => (prev && prev.id === id ? null : prev));
    addToast("Volunteer record removed from system", "info");
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
      memberPostsList,
      memberPosts: memberPostsList,
      mediaMessagesList,
      mediaHeadMessages: mediaMessagesList,

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
      updateMemberAdmin,
      deleteMemberAdmin,
      registerVolunteer,
      updateVolunteerAdmin,
      deleteVolunteerAdmin,
      addDonation,
      addContactMessage,
      markMessageRead,

      // Member & Volunteer Portal
      currentMemberUser,
      isMemberLoggedIn: Boolean(currentMemberUser),
      loginMember,
      logoutMember,
      updateMemberProfile,
      submitMemberPost,
      approveMemberPost,
      rejectMemberPost,
      deleteMemberPost,
      sendMediaHeadMessage,
      replyMediaHeadMessage,
      deleteMediaHeadMessage,
      markMediaHeadMessageRead: (id: string) => {
        setMediaMessagesList(prev => prev.map(m => m.id === id ? { ...m, isRead: true } : m));
      },

      isAdmin,
      setIsAdmin,
      adminUsername,
      loginAdmin,
      logoutAdmin,
      updateAdminCredentials,
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

