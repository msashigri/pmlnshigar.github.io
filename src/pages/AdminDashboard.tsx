import React, { useState } from 'react';
import { 
  ShieldCheck, LayoutDashboard, Newspaper, Calendar, Image as ImageIcon, 
  Layers, Users, HeartHandshake, CreditCard, Mail, Settings, Plus, 
  Trash2, Check, Download, Eye, Sun, Moon, BarChart2, TrendingUp, CheckCircle,
  LogOut, Globe, Key, Lock, User, Copy, CheckCheck, AlertCircle, FileCheck, MessageSquare,
  CheckCircle2, XCircle, Clock, Send
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';
import { SuperAdminLogin } from '../components/SuperAdminLogin';

export const AdminDashboard: React.FC = () => {
  const { 
    isAdmin, adminUsername, logoutAdmin, updateAdminCredentials, setCurrentPage,
    newsList, addNewsItem, deleteNewsItem,
    eventsList, addEventItem, deleteEventItem,
    galleryList, addGalleryItem, deleteGalleryItem,
    projectsList, addProjectItem, deleteProjectItem, updateProjectProgress,
    membersList, volunteersList, donationsList, messagesList, markMessageRead,
    memberPosts, approveMemberPost, rejectMemberPost, deleteMemberPost,
    mediaHeadMessages, replyMediaHeadMessage, markMediaHeadMessageRead,
    isDarkMode, toggleDarkMode, addToast, setSelectedMemberForCard
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'events' | 'gallery' | 'projects' | 'members' | 'volunteers' | 'donations' | 'messages' | 'member-posts' | 'media-inquiries' | 'settings'>('overview');
  const [postStatusFilter, setPostStatusFilter] = useState<'All' | 'pending' | 'approved' | 'rejected'>('All');
  const [rejectModalPostId, setRejectModalPostId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});

  // Form states for News
  const [newsTitle, setNewsTitle] = useState('');
  const [newsCategory, setNewsCategory] = useState<'Press Releases' | 'Events' | 'Development Projects' | 'Political Activities' | 'Announcements'>('Press Releases');
  const [newsSummary, setNewsSummary] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsImage, setNewsImage] = useState('');

  // Form states for Event
  const [eventTitle, setEventTitle] = useState('');
  const [eventDate, setEventDate] = useState('2026-08-25');
  const [eventTime, setEventTime] = useState('11:00 AM');
  const [eventVenue, setEventVenue] = useState('Shigar Secretariat');
  const [eventDesc, setEventDesc] = useState('');

  // Form states for Gallery
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState<'Rallies' | 'Speeches' | 'Development' | 'Youth' | 'Culture'>('Rallies');
  const [galImage, setGalImage] = useState('');
  const [galCaption, setGalCaption] = useState('');

  // Form states for Project
  const [projTitle, setProjTitle] = useState('');
  const [projCategory, setProjCategory] = useState<'Roads' | 'Education' | 'Health' | 'Youth' | 'Women' | 'Tourism' | 'Water' | 'Infrastructure'>('Roads');
  const [projBudget, setProjBudget] = useState('PKR 100 Million');
  const [projLocation, setProjLocation] = useState('Shigar Valley');
  const [projSummary, setProjSummary] = useState('');

  // Form states for Settings / Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState(adminUsername);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [settingsError, setSettingsError] = useState('');
  const [settingsSuccess, setSettingsSuccess] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);

  // If user is not authenticated, show Super Admin Login
  if (!isAdmin) {
    return <SuperAdminLogin />;
  }

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsTitle && newsSummary) {
      addNewsItem({
        title: newsTitle,
        category: newsCategory,
        summary: newsSummary,
        content: newsContent || newsSummary,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        author: 'District Information Cell',
        imageUrl: newsImage || APP_IMAGES.leaderSpeechRally,
        tags: ['PMLN', 'Shigar']
      });

      setNewsTitle('');
      setNewsSummary('');
      setNewsContent('');
      setNewsImage('');
    }
  };

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (eventTitle && eventVenue) {
      addEventItem({
        title: eventTitle,
        date: eventDate,
        time: eventTime,
        venue: eventVenue,
        description: eventDesc || 'PMLN District Gathering in Shigar',
        imageUrl: APP_IMAGES.heroPmlnShigar,
        lat: 35.4243,
        lng: 75.7328,
        isUpcoming: true
      });

      setEventTitle('');
      setEventVenue('');
      setEventDesc('');
    }
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (galTitle && galImage) {
      addGalleryItem({
        title: galTitle,
        category: galCategory,
        imageUrl: galImage,
        caption: galCaption || galTitle,
        date: '2026'
      });

      setGalTitle('');
      setGalImage('');
      setGalCaption('');
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (projTitle && projSummary) {
      addProjectItem({
        title: projTitle,
        category: projCategory,
        status: 'Ongoing',
        progress: 25,
        budget: projBudget,
        location: projLocation,
        summary: projSummary,
        details: projSummary,
        imageUrl: APP_IMAGES.shigarDevelopment,
        completionYear: '2027'
      });

      setProjTitle('');
      setProjSummary('');
    }
  };

  const totalDonations = donationsList.reduce((acc, d) => acc + d.amount, 0);

  const exportMembersJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(membersList, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `PMLN_Shigar_Members_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast("Members list exported to JSON!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 transition-colors">
      
      {/* ADMIN TOP BANNER */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300 shrink-0">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-white">Super Admin Control Center</h1>
              <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
                Active Session
              </span>
            </div>
            <p className="text-xs text-emerald-300 mt-0.5">
              Logged in as <strong className="text-white font-mono">@{adminUsername}</strong> • District Secretariat Shigar
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setCurrentPage('home')}
            className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            title="View Public Site"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Live Website</span>
          </button>

          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
            title="Toggle Admin Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={exportMembersJSON}
            className="px-3 py-2 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-600 text-white shadow flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="px-3.5 py-2 rounded-xl font-bold text-xs bg-red-900/80 hover:bg-red-800 text-red-100 border border-red-700 flex items-center space-x-1.5 transition-colors shadow"
            title="Log out from Super Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD TABS NAVIGATION */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview', icon: LayoutDashboard },
          { 
            id: 'member-posts', 
            label: `Member Posts (${memberPosts.filter(p => p.status === 'pending').length} Pending)`, 
            icon: FileCheck,
            badge: memberPosts.filter(p => p.status === 'pending').length > 0
          },
          { 
            id: 'media-inquiries', 
            label: `Media Inquiries (${mediaHeadMessages.filter(m => !m.isRead).length} New)`, 
            icon: MessageSquare,
            badge: mediaHeadMessages.filter(m => !m.isRead).length > 0
          },
          { id: 'news', label: `News (${newsList.length})`, icon: Newspaper },
          { id: 'events', label: `Events (${eventsList.length})`, icon: Calendar },
          { id: 'projects', label: `Projects (${projectsList.length})`, icon: Layers },
          { id: 'gallery', label: `Gallery (${galleryList.length})`, icon: ImageIcon },
          { id: 'members', label: `Members (${membersList.length})`, icon: Users },
          { id: 'volunteers', label: `Volunteers (${volunteersList.length})`, icon: HeartHandshake },
          { id: 'donations', label: 'Donations', icon: CreditCard },
          { id: 'messages', label: `Public Inquiries (${messagesList.length})`, icon: Mail },
          { id: 'settings', label: 'Security & Settings', icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 relative ${
              activeTab === tab.id
                ? 'bg-[#006633] text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            )}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          {/* STAT CARDS */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Registered Members</div>
              <div className="text-3xl font-black text-slate-900 dark:text-white">{membersList.length}</div>
              <div className="text-[11px] text-emerald-600 font-bold flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>+18% this month</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Volunteers</div>
              <div className="text-3xl font-black text-[#006633] dark:text-emerald-400">{volunteersList.length}</div>
              <div className="text-[11px] text-slate-500">Active in 9 Union Councils</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Total Donations Raised</div>
              <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">PKR {totalDonations.toLocaleString()}</div>
              <div className="text-[11px] text-slate-500">{donationsList.length} recorded receipts</div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase">Pending Inquiries</div>
              <div className="text-3xl font-black text-rose-600 dark:text-rose-400">
                {messagesList.filter(m => !m.isRead).length}
              </div>
              <div className="text-[11px] text-slate-500">Awaiting secretariat response</div>
            </div>
          </div>

          {/* VISITOR ANALYTICS & REGIONAL PARTICIPATION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <BarChart2 className="w-5 h-5 text-emerald-600" />
                <span>Membership Distribution by Village</span>
              </h3>

              <div className="space-y-3 text-xs">
                {[
                  { village: 'Shigar Town', count: 420, percent: 85 },
                  { village: 'Gulabpur', count: 310, percent: 65 },
                  { village: 'Marapi', count: 280, percent: 55 },
                  { village: 'Basha Valley', count: 210, percent: 45 },
                  { village: 'Tissar', count: 180, percent: 38 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between font-bold text-slate-800 dark:text-slate-200">
                      <span>{item.village}</span>
                      <span>{item.count} Members</span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#006633] h-full rounded-full" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="font-black text-base text-slate-900 dark:text-white flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                <span>Website Visitor Traffic Breakdown</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex justify-between font-bold">
                  <span>Gilgit-Baltistan Visitors</span>
                  <span className="text-emerald-600">68%</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex justify-between font-bold">
                  <span>Islamabad / Rawalpindi</span>
                  <span className="text-[#006633] dark:text-emerald-400">18%</span>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl flex justify-between font-bold">
                  <span>Overseas Pakistanis (UK, UAE)</span>
                  <span className="text-emerald-600">14%</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB CONTENT: NEWS MANAGEMENT */}
      {activeTab === 'news' && (
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center space-x-2">
              <Plus className="w-5 h-5 text-emerald-600" />
              <span>Publish New Press Release / News Post</span>
            </h3>

            <form onSubmit={handleCreateNews} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">News Headline</label>
                <input
                  type="text"
                  required
                  value={newsTitle}
                  onChange={(e) => setNewsTitle(e.target.value)}
                  placeholder="e.g. Leader Muhammad Tahir Unahar Shigri Inspects Road Progress"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={newsCategory}
                    onChange={(e) => setNewsCategory(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                  >
                    <option value="Press Releases">Press Releases</option>
                    <option value="Events">Events</option>
                    <option value="Development Projects">Development Projects</option>
                    <option value="Political Activities">Political Activities</option>
                    <option value="Announcements">Announcements</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Featured Image URL (Optional)</label>
                  <input
                    type="url"
                    value={newsImage}
                    onChange={(e) => setNewsImage(e.target.value)}
                    placeholder="Image URL"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Short Summary</label>
                <input
                  type="text"
                  required
                  value={newsSummary}
                  onChange={(e) => setNewsSummary(e.target.value)}
                  placeholder="Brief summary sentence..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#006633] text-white font-bold text-xs shadow hover:bg-[#004d26] transition-colors"
              >
                Publish News Post
              </button>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Existing Published News</h3>
            <div className="space-y-3">
              {newsList.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white">{item.title}</div>
                    <div className="text-slate-500">{item.category} • {item.date}</div>
                  </div>
                  <button
                    onClick={() => deleteNewsItem(item.id)}
                    className="p-2 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MEMBERS MANAGEMENT */}
      {activeTab === 'members' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-base text-slate-900 dark:text-white">Registered PMLN Shigar Members</h3>
            <button
              onClick={exportMembersJSON}
              className="px-3.5 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-xs shadow hover:bg-emerald-600 flex items-center space-x-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV/JSON</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px]">
                  <th className="py-3 px-2">Member ID</th>
                  <th className="py-3 px-2">Full Name</th>
                  <th className="py-3 px-2">CNIC</th>
                  <th className="py-3 px-2">Village</th>
                  <th className="py-3 px-2">Mobile</th>
                  <th className="py-3 px-2">Joined</th>
                  <th className="py-3 px-2">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-semibold text-slate-800 dark:text-slate-200">
                {membersList.map((mem) => (
                  <tr key={mem.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="py-3 px-2 font-mono text-emerald-700 dark:text-emerald-400">{mem.membershipNo}</td>
                    <td className="py-3 px-2">{mem.fullName}</td>
                    <td className="py-3 px-2">{mem.cnic}</td>
                    <td className="py-3 px-2">{mem.village}</td>
                    <td className="py-3 px-2">{mem.mobile}</td>
                    <td className="py-3 px-2">{mem.joinedDate}</td>
                    <td className="py-3 px-2">
                      <button
                        onClick={() => setSelectedMemberForCard(mem)}
                        className="px-2.5 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-[#006633] dark:text-emerald-400 font-bold hover:underline"
                      >
                        View Card
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MEMBER POSTS MODERATION */}
      {activeTab === 'member-posts' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-[#006633] dark:text-emerald-400" />
                <span>Member & Volunteer Submitted Posts</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Submissions require Super Admin approval before being published to the public news feed and social ticker.
              </p>
            </div>

            {/* Filter pills */}
            <div className="flex items-center space-x-2">
              {(['All', 'pending', 'approved', 'rejected'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setPostStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                    postStatusFilter === st
                      ? 'bg-[#006633] text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {st === 'All' ? `All (${memberPosts.length})` : `${st} (${memberPosts.filter(p => p.status === st).length})`}
                </button>
              ))}
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {memberPosts
              .filter(p => postStatusFilter === 'All' ? true : p.status === postStatusFilter)
              .map((post) => {
                const isPending = post.status === 'pending';
                const isApproved = post.status === 'approved';
                const isRejected = post.status === 'rejected';

                return (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:border-emerald-300 dark:hover:border-slate-700 transition-all space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-[#006633] dark:text-emerald-400 flex items-center justify-center font-black text-sm shrink-0 border border-emerald-300 dark:border-emerald-800">
                          {post.authorName[0]}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="font-extrabold text-sm text-slate-900 dark:text-white">{post.authorName}</span>
                            <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">@{post.authorUsername}</span>
                            <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {post.authorRole}
                            </span>
                            <span className="text-xs text-slate-400">• {post.submittedAt}</span>
                          </div>
                          <div className="text-xs text-slate-500 font-medium mt-0.5">
                            Category: <strong className="text-slate-700 dark:text-slate-300">{post.category}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Status badge */}
                      <div>
                        {isPending && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending Review</span>
                          </span>
                        )}
                        {isApproved && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Published to Public Site</span>
                          </span>
                        )}
                        {isRejected && (
                          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Rejected</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="space-y-2">
                      <h4 className="font-black text-base text-slate-900 dark:text-white">{post.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60">
                        {post.content}
                      </p>

                      {post.imageUrl && (
                        <div className="mt-2">
                          <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="max-h-56 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      )}

                      {isRejected && post.adminFeedback && (
                        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-300">
                          <strong>Admin Feedback to Member:</strong> {post.adminFeedback}
                        </div>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 dark:border-slate-800">
                      <div className="text-xs text-slate-400 font-mono">
                        Submission ID: #{post.id}
                      </div>

                      <div className="flex items-center space-x-2">
                        {isPending && (
                          <>
                            <button
                              onClick={() => approveMemberPost(post.id)}
                              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#006633] hover:bg-[#004d26] shadow-sm flex items-center space-x-1.5 transition-all"
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Approve & Publish</span>
                            </button>

                            <button
                              onClick={() => {
                                setRejectModalPostId(post.id);
                                setRejectReason('');
                              }}
                              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-300 dark:border-rose-800 transition-all flex items-center space-x-1"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Reject...</span>
                            </button>
                          </>
                        )}

                        {isApproved && (
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
                            ✓ Active in Public Feed
                          </span>
                        )}

                        <button
                          onClick={() => deleteMemberPost(post.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          title="Delete draft"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

            {memberPosts.filter(p => postStatusFilter === 'All' ? true : p.status === postStatusFilter).length === 0 && (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 space-y-2">
                <FileCheck className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold">No member submissions match this filter.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REJECTION REASON MODAL */}
      {rejectModalPostId && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 max-w-md w-full rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <h4 className="font-black text-base text-slate-900 dark:text-white">Reject Member Submission</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Provide feedback for the member on why this post cannot be approved (e.g. duplicate news, unverified claim, edit needed).
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="e.g. Please provide high quality source photo and verify date..."
              className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => setRejectModalPostId(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (rejectModalPostId) {
                    rejectMemberPost(rejectModalPostId, rejectReason);
                    setRejectModalPostId(null);
                  }
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white shadow"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: MEDIA HEAD INQUIRIES & DIRECT MESSAGES */}
      {activeTab === 'media-inquiries' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-[#006633] dark:text-emerald-400" />
              <span>Media Cell Desk: Direct Inquiries from Members & Volunteers</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Internal inquiries dispatched directly to the Social Media Team Head by verified portal members.
            </p>
          </div>

          <div className="space-y-4">
            {mediaHeadMessages.map((msg) => {
              const currentReply = replyTextMap[msg.id] || '';

              return (
                <div
                  key={msg.id}
                  className={`p-6 rounded-3xl border transition-all space-y-4 ${
                    msg.isRead 
                      ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' 
                      : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-[#006633] text-white flex items-center justify-center font-black text-sm">
                        {msg.senderName[0]}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-extrabold text-sm text-slate-900 dark:text-white">{msg.senderName}</span>
                          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400">@{msg.senderUsername}</span>
                          <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200">
                            {msg.senderRole}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400">{msg.sentAt}</div>
                      </div>
                    </div>

                    {!msg.isRead && (
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/70 px-3 py-1 rounded-full border border-amber-300 dark:border-amber-800">
                        New Unread Inquiry
                      </span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">{msg.subject}</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-white/70 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                      {msg.message}
                    </p>
                  </div>

                  {/* Previous Reply */}
                  {msg.reply && (
                    <div className="p-4 bg-emerald-100/70 dark:bg-emerald-950/70 rounded-2xl border border-emerald-300 dark:border-emerald-800 text-xs space-y-1">
                      <div className="font-bold text-emerald-900 dark:text-emerald-200 flex items-center justify-between">
                        <span>✓ Response from Media Cell Head:</span>
                        <span className="text-slate-400 font-normal">{msg.repliedAt}</span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{msg.reply}</p>
                    </div>
                  )}

                  {/* Reply Input Box */}
                  <div className="pt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={currentReply}
                        onChange={(e) => setReplyTextMap({ ...replyTextMap, [msg.id]: e.target.value })}
                        placeholder="Type reply to member's portal inbox..."
                        className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        onClick={() => {
                          if (currentReply.trim()) {
                            replyMediaHeadMessage(msg.id, currentReply);
                            setReplyTextMap({ ...replyTextMap, [msg.id]: '' });
                          }
                        }}
                        className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-sm flex items-center space-x-1.5 transition-all"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply</span>
                      </button>
                      {!msg.isRead && (
                        <button
                          onClick={() => markMediaHeadMessageRead(msg.id)}
                          className="px-3 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
                        >
                          Mark Read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {mediaHeadMessages.length === 0 && (
              <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 text-slate-400 space-y-2">
                <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                <p className="text-sm font-semibold">No direct messages received from members yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB CONTENT: CONTACT MESSAGES */}
      {activeTab === 'messages' && (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-black text-base text-slate-900 dark:text-white">Constituent Grievances & Messages</h3>
          <div className="space-y-3">
            {messagesList.map((msg) => (
              <div key={msg.id} className={`p-4 rounded-2xl border transition-colors ${msg.isRead ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700' : 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800'}`}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-slate-900 dark:text-white">{msg.name} ({msg.phone})</span>
                  <span className="text-slate-400">{msg.date} • {msg.village}</span>
                </div>
                <div className="font-bold text-xs text-emerald-800 dark:text-emerald-300 mb-1">{msg.subject}</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{msg.message}</p>
                {!msg.isRead && (
                  <button
                    onClick={() => markMessageRead(msg.id)}
                    className="mt-2 text-[10px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline"
                  >
                    Mark as Answered
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT: SECURITY & SETTINGS */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Change Credentials Form */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider mb-1">
                <Key className="w-4 h-4" />
                <span>Super Admin Authentication</span>
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Change Login ID & Password</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Update the master credentials used to unlock the /superadmin portal.
              </p>
            </div>

            {settingsError && (
              <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-center space-x-2.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span className="font-semibold">{settingsError}</span>
              </div>
            )}

            {settingsSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center space-x-2.5">
                <CheckCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="font-semibold">{settingsSuccess}</span>
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSettingsError('');
                setSettingsSuccess('');

                if (!currentPassword) {
                  setSettingsError("Please enter your current password.");
                  return;
                }
                if (newPassword !== confirmPassword) {
                  setSettingsError("New password and confirm password do not match.");
                  return;
                }

                const result = updateAdminCredentials(currentPassword, newUsername, newPassword);
                if (result.success) {
                  setSettingsSuccess("Super Admin credentials successfully updated!");
                  setCurrentPassword('');
                  setNewPassword('');
                  setConfirmPassword('');
                } else {
                  setSettingsError(result.error || "Failed to update credentials.");
                }
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Current Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Current secret password"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    New Super Admin Login ID *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="e.g. superadmin"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    New Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Minimum 6 characters"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-md transition-all flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Update Credentials</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Sidebar: Direct Link & Portal Stats */}
          <div className="space-y-6">
            {/* Direct Superadmin Link Card */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center space-x-2">
                <Globe className="w-4 h-4 text-emerald-600" />
                <span>Super Admin URL</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                The admin portal is hidden from public navigation menus. Bookmark or use this direct link to open the login portal:
              </p>
              
              <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between font-mono text-xs text-emerald-700 dark:text-emerald-400 break-all">
                <span>{window.location.origin + window.location.pathname}#superadmin</span>
                <button
                  onClick={() => {
                    const url = `${window.location.origin}${window.location.pathname}#superadmin`;
                    navigator.clipboard.writeText(url);
                    setCopiedLink(true);
                    addToast("Super Admin URL copied to clipboard!", "success");
                    setTimeout(() => setCopiedLink(false), 2500);
                  }}
                  className="ml-2 p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-200 transition-colors shrink-0"
                  title="Copy Link"
                >
                  {copiedLink ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="text-[11px] text-slate-400 space-y-1">
                <p>• Supported paths: <code className="text-slate-600 dark:text-slate-300">/superadmin</code>, <code className="text-slate-600 dark:text-slate-300">#superadmin</code></p>
                <p>• Unauthorized visits will always see the login prompt.</p>
              </div>
            </div>

            {/* Storage Info */}
            <div className="bg-slate-50 dark:bg-slate-900/60 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">
                System Storage Status
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px]">MEMBERS</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{membersList.length} records</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px]">VOLUNTEERS</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{volunteersList.length} records</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px]">NEWS POSTS</span>
                  <strong className="text-slate-900 dark:text-white font-mono">{newsList.length} items</strong>
                </div>
                <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <span className="text-slate-400 block text-[10px]">DONATIONS</span>
                  <strong className="text-slate-900 dark:text-white font-mono">PKR {totalDonations.toLocaleString()}</strong>
                </div>
              </div>
              <button
                onClick={exportMembersJSON}
                className="w-full py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" />
                <span>Backup Portal Data (JSON)</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
