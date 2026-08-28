import React, { useState } from 'react';
import { 
  ShieldCheck, LayoutDashboard, Newspaper, Calendar, Image as ImageIcon, 
  Layers, Users, HeartHandshake, CreditCard, Mail, Settings, Plus, 
  Trash2, Check, Download, Eye, Sun, Moon, BarChart2, TrendingUp, CheckCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';

export const AdminDashboard: React.FC = () => {
  const { 
    newsList, addNewsItem, deleteNewsItem,
    eventsList, addEventItem, deleteEventItem,
    galleryList, addGalleryItem, deleteGalleryItem,
    projectsList, addProjectItem, deleteProjectItem, updateProjectProgress,
    membersList, volunteersList, donationsList, messagesList, markMessageRead,
    isDarkMode, toggleDarkMode, addToast, setSelectedMemberForCard
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'news' | 'events' | 'gallery' | 'projects' | 'members' | 'volunteers' | 'donations' | 'messages' | 'settings'>('overview');

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
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">PMLN Shigar Admin Control Panel</h1>
            <p className="text-xs text-emerald-300">Logged in as Executive Admin • District Secretariat Shigar</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-300 border border-slate-700 transition-colors"
            title="Toggle Admin Theme"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={exportMembersJSON}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-600 text-white shadow flex items-center space-x-1.5 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export Members</span>
          </button>
        </div>
      </div>

      {/* DASHBOARD TABS NAVIGATION */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'overview', label: 'Overview & Charts', icon: LayoutDashboard },
          { id: 'news', label: `News (${newsList.length})`, icon: Newspaper },
          { id: 'events', label: `Events (${eventsList.length})`, icon: Calendar },
          { id: 'projects', label: `Projects (${projectsList.length})`, icon: Layers },
          { id: 'gallery', label: `Gallery (${galleryList.length})`, icon: ImageIcon },
          { id: 'members', label: `Members (${membersList.length})`, icon: Users },
          { id: 'volunteers', label: `Volunteers (${volunteersList.length})`, icon: HeartHandshake },
          { id: 'donations', label: 'Donations', icon: CreditCard },
          { id: 'messages', label: `Messages (${messagesList.length})`, icon: Mail },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
              activeTab === tab.id
                ? 'bg-[#006633] text-white shadow-md'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
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

    </div>
  );
};
