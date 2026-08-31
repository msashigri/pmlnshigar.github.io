import React, { useState, useRef } from 'react';
import { 
  User, ShieldCheck, CreditCard, FileText, Send, LogOut, CheckCircle2, 
  Clock, AlertCircle, Printer, Download, Eye, EyeOff, Lock, Camera, 
  Upload, Sparkles, MessageSquare, ArrowRight, Check, Image as ImageIcon,
  Flag, HeartHandshake, Home, Edit3, Trash2, RefreshCw, QrCode
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import { useApp } from '../context/AppContext';
import { APP_IMAGES } from '../assets/images';
import { MemberPost } from '../types';

export const MemberPortalPage: React.FC = () => {
  const { 
    currentMemberUser, 
    loginMember, 
    logoutMember, 
    updateMemberProfile, 
    submitMemberPost, 
    sendMediaHeadMessage, 
    memberPostsList, 
    mediaMessagesList,
    deleteMemberPost,
    setCurrentPage,
    addToast
  } = useApp();

  // Login Form States
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Portal Navigation Tabs
  const [activeTab, setActiveTab] = useState<'card' | 'profile' | 'post' | 'messages'>('card');

  // Profile Edit State
  const [profileName, setProfileName] = useState(currentMemberUser?.fullName || '');
  const [profileFather, setProfileFather] = useState(('fatherName' in (currentMemberUser || {}) ? (currentMemberUser as any).fatherName : '') || '');
  const [profileMobile, setProfileMobile] = useState(currentMemberUser?.mobile || '');
  const [profileEmail, setProfileEmail] = useState(currentMemberUser?.email || '');
  const [profileVillage, setProfileVillage] = useState(currentMemberUser?.village || 'Shigar Town');
  const [profileOccupation, setProfileOccupation] = useState(('occupation' in (currentMemberUser || {}) ? (currentMemberUser as any).occupation : '') || '');
  const [profileBio, setProfileBio] = useState(('bio' in (currentMemberUser || {}) ? (currentMemberUser as any).bio : '') || '');
  const [profilePhoto, setProfilePhoto] = useState(currentMemberUser?.photoUrl || '');
  const [profileUsername, setProfileUsername] = useState(currentMemberUser?.username || '');
  const [profilePassword, setProfilePassword] = useState(currentMemberUser?.password || '');
  const [showProfilePassword, setShowProfilePassword] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // New Post Submission State
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<'Press Releases' | 'Events' | 'Development Projects' | 'Political Activities' | 'Announcements'>('Political Activities');
  const [postSummary, setPostSummary] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState('');

  // New Message to Media Head State
  const [msgSubject, setMsgSubject] = useState('');
  const [msgBody, setMsgBody] = useState('');

  // When user logs in or updates, sync form
  React.useEffect(() => {
    if (currentMemberUser) {
      setProfileName(currentMemberUser.fullName || '');
      setProfileFather(('fatherName' in currentMemberUser ? (currentMemberUser as any).fatherName : '') || '');
      setProfileMobile(currentMemberUser.mobile || '');
      setProfileEmail(currentMemberUser.email || '');
      setProfileVillage(currentMemberUser.village || 'Shigar Town');
      setProfileOccupation(('occupation' in currentMemberUser ? (currentMemberUser as any).occupation : '') || '');
      setProfileBio(('bio' in currentMemberUser ? (currentMemberUser as any).bio : '') || '');
      setProfilePhoto(currentMemberUser.photoUrl || '');
      setProfileUsername(currentMemberUser.username || '');
      setProfilePassword(currentMemberUser.password || '');
    }
  }, [currentMemberUser]);

  // Handle Login Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    if (!loginUsername || !loginPassword) {
      setLoginError('Please enter both your Username ID and Password');
      return;
    }

    const success = loginMember(loginUsername, loginPassword);
    if (!success) {
      setLoginError('Invalid Username / ID or Password. Please verify your credentials or register a new account.');
    }
  };

  // Profile Photo Upload from Device
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        addToast("Photo size exceeds 2MB. Please choose a smaller image.", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setProfilePhoto(base64);
        addToast("Photo selected! Click 'Save Profile Changes' to update.", "info");
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Profile Changes
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateMemberProfile({
      fullName: profileName,
      fatherName: profileFather,
      mobile: profileMobile,
      email: profileEmail,
      village: profileVillage,
      occupation: profileOccupation,
      bio: profileBio,
      photoUrl: profilePhoto,
      username: profileUsername.trim(),
      password: profilePassword.trim()
    });
  };

  // Submit Post for Admin Review
  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) {
      addToast("Please provide both a Title and Content for your post.", "error");
      return;
    }

    submitMemberPost({
      title: postTitle.trim(),
      category: postCategory,
      summary: postSummary.trim() || postContent.slice(0, 140) + '...',
      content: postContent.trim(),
      imageUrl: postImage.trim() || APP_IMAGES.heroPmlnShigar
    });

    setPostTitle('');
    setPostSummary('');
    setPostContent('');
    setPostImage('');
  };

  // Send Message to Social Media Team Head
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgSubject.trim() || !msgBody.trim()) {
      addToast("Please enter a subject and your message.", "error");
      return;
    }

    sendMediaHeadMessage(msgSubject.trim(), msgBody.trim());
    setMsgSubject('');
    setMsgBody('');
  };

  // Download PDF Membership Card
  const handleDownloadCardPDF = () => {
    if (!currentMemberUser) return;
    try {
      const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [100, 65] });
      
      // Card Background Green
      doc.setFillColor(0, 102, 51); // PMLN Green
      doc.rect(0, 0, 100, 65, 'F');

      // Top Gold Bar
      doc.setFillColor(245, 158, 11);
      doc.rect(0, 0, 100, 3, 'F');

      // Header Text
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.text("PAKISTAN MUSLIM LEAGUE NAWAZ", 50, 8, { align: 'center' });
      
      doc.setFontSize(7.5);
      doc.setTextColor(245, 158, 11);
      const cardType = currentMemberUser.userRole === 'Volunteer' ? 'OFFICIAL VOLUNTEER PASS' : 'OFFICIAL MEMBERSHIP CARD';
      doc.text(`DISTRICT SHIGAR CHAPTER • ${cardType}`, 50, 12, { align: 'center' });

      // White inner panel
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(4, 15, 92, 45, 2, 2, 'F');

      // Member Details
      doc.setTextColor(0, 102, 51);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.text(currentMemberUser.fullName.toUpperCase(), 8, 23);

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(7);
      doc.setFont('helvetica', 'normal');
      const memId = 'membershipNo' in currentMemberUser ? (currentMemberUser as any).membershipNo : currentMemberUser.id;
      const cnicVal = 'cnic' in currentMemberUser ? (currentMemberUser as any).cnic : 'Registered Volunteer';
      const fatherVal = 'fatherName' in currentMemberUser ? (currentMemberUser as any).fatherName : 'N/A';

      doc.text(`ID Reference: ${memId}`, 8, 28);
      doc.text(`CNIC / Verification: ${cnicVal}`, 8, 33);
      doc.text(`Father/Husband Name: ${fatherVal}`, 8, 38);
      doc.text(`Village / UC: ${currentMemberUser.village}, Shigar`, 8, 43);
      doc.text(`Contact: ${currentMemberUser.mobile}`, 8, 48);
      doc.text(`Portal ID: ${currentMemberUser.username || 'pmlnmediacellshigar.online'}`, 8, 53);

      // Signature / Stamp line
      doc.setFontSize(6);
      doc.setTextColor(0, 102, 51);
      doc.setFont('helvetica', 'bold');
      doc.text("MUHAMMAD TAHIR UNAHAR SHIGRI", 72, 51, { align: 'center' });
      doc.setFontSize(5);
      doc.setTextColor(100, 100, 100);
      doc.text("President, PMLN District Shigar", 72, 54, { align: 'center' });

      doc.save(`PMLN-Shigar-${currentMemberUser.userRole}-${memId}.pdf`);
      addToast("Card PDF downloaded successfully!");
    } catch (err) {
      console.error(err);
      addToast("Failed to generate PDF. You can also use Print view.", "error");
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  // Filter posts & messages for the active logged in member
  const myPosts = (memberPostsList || []).filter(
    p => currentMemberUser && (
      p.memberId === currentMemberUser.id || 
      p.memberUsername === currentMemberUser.username || 
      p.authorUsername === currentMemberUser.username ||
      (currentMemberUser.username && (p.memberUsername?.toLowerCase() === currentMemberUser.username.toLowerCase()))
    )
  );

  const myMessages = (mediaMessagesList || []).filter(
    m => currentMemberUser && (
      m.senderId === currentMemberUser.id || 
      m.senderUsername === currentMemberUser.username ||
      (currentMemberUser.username && (m.senderUsername?.toLowerCase() === currentMemberUser.username.toLowerCase()))
    )
  );

  // -------------------------------------------------------------
  // VIEW 1: LOGIN SCREEN (When Not Logged In)
  // -------------------------------------------------------------
  if (!currentMemberUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-in fade-in duration-300">
        
        {/* Header Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold text-[#006633] dark:text-emerald-300 uppercase tracking-widest shadow-sm">
            <Flag className="w-3.5 h-3.5" />
            <span>PMLN District Shigar Secretariat</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Member & Volunteer Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Welcome to the official digital portal for registered PMLN Shigar members and volunteers. Log in to print your digital ID card, submit articles for publication, and message party leadership.
          </p>
        </div>

        {/* Login Card */}
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
          
          <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-[#006633] flex items-center justify-center text-white shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-slate-900 dark:text-white">Portal Sign In</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">@pmlnmediacellshigar.online</p>
            </div>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 rounded-xl text-xs text-red-700 dark:text-red-300 flex items-start space-x-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Portal Username / ID <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="e.g. aliraza@pmlnmediacellshigar.online"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Enter your full ID or just your username handle.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your portal password"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-lg shadow-emerald-900/20 transition-all flex items-center justify-center space-x-2 uppercase tracking-wider"
            >
              <span>Sign In to Member Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* New Member Registration CTAs */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-4 text-center text-xs text-slate-600 dark:text-slate-400 space-y-2">
            <p>Not registered yet?</p>
            <div className="flex justify-center space-x-3">
              <button
                onClick={() => setCurrentPage('join')}
                className="font-bold text-[#006633] dark:text-emerald-400 hover:underline"
              >
                Register as Member
              </button>
              <span>•</span>
              <button
                onClick={() => setCurrentPage('volunteer')}
                className="font-bold text-[#006633] dark:text-emerald-400 hover:underline"
              >
                Join as Volunteer
              </button>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW 2: LOGGED IN MEMBER/VOLUNTEER PORTAL DASHBOARD
  // -------------------------------------------------------------
  const isVolunteer = currentMemberUser.userRole === 'Volunteer';
  const memNumber = 'membershipNo' in currentMemberUser ? (currentMemberUser as any).membershipNo : `VOL-${currentMemberUser.id.slice(-4)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* PORTAL TOP PROFILE HEADER */}
      <div className="bg-gradient-to-r from-[#006633] via-emerald-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="flex items-center space-x-4">
          {/* Avatar / Photo */}
          <div className="relative group shrink-0">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 border-2 border-emerald-400 overflow-hidden flex items-center justify-center text-white shadow-lg">
              {currentMemberUser.photoUrl ? (
                <img
                  src={currentMemberUser.photoUrl}
                  alt={currentMemberUser.fullName}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-2xl font-black">{currentMemberUser.fullName.charAt(0)}</span>
              )}
            </div>
            <button
              onClick={() => setActiveTab('profile')}
              className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-amber-500 text-slate-950 shadow-md hover:bg-amber-400 transition-colors"
              title="Update Profile Photo"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{currentMemberUser.fullName}</h1>
              <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border shadow-sm ${
                isVolunteer 
                  ? 'bg-amber-400 text-slate-950 border-amber-300' 
                  : 'bg-emerald-400 text-slate-950 border-emerald-300'
              }`}>
                {isVolunteer ? 'Active Volunteer' : 'Registered Member'}
              </span>
            </div>

            <p className="text-xs text-emerald-200 flex flex-wrap items-center gap-x-3 font-mono">
              <span>Ref: {memNumber}</span>
              <span>•</span>
              <span>{currentMemberUser.username || 'Portal User'}</span>
              <span>•</span>
              <span className="font-sans font-semibold text-emerald-100">{currentMemberUser.village}, District Shigar</span>
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setActiveTab('post')}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md flex items-center space-x-1.5 transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Create News / Post</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-700 hover:bg-emerald-600 text-white border border-emerald-500/50 shadow flex items-center space-x-1.5 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Message Media Head</span>
          </button>

          <button
            onClick={logoutMember}
            className="px-3.5 py-2.5 rounded-xl font-bold text-xs bg-red-900/80 hover:bg-red-800 text-red-100 border border-red-700 flex items-center space-x-1.5 transition-colors"
            title="Log out of Member Portal"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>

      </div>

      {/* PORTAL TABS */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200 dark:border-slate-800">
        {[
          { id: 'card', label: '🖨️ Official Card & Print', icon: CreditCard },
          { id: 'profile', label: '👤 Profile & Photo', icon: User },
          { id: 'post', label: `✍️ Submit Post / News (${myPosts.length})`, icon: FileText },
          { id: 'messages', label: `✉️ Message Social Media Head (${myMessages.length})`, icon: Send },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 ${
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

      {/* ========================================================= */}
      {/* TAB 1: DIGITAL CARD & PRINT */}
      {/* ========================================================= */}
      {activeTab === 'card' && (
        <div className="space-y-6">
          
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
                <CreditCard className="w-5 h-5 text-[#006633] dark:text-emerald-400" />
                <span>Your Official PMLN Shigar Digital Card</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Verified digital identification issued by District Secretariat PMLN Shigar under President Muhammad Tahir Unahar Shigri.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrintCard}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-700 text-white flex items-center space-x-1.5 shadow transition-colors"
              >
                <Printer className="w-4 h-4" />
                <span>Print Card</span>
              </button>

              <button
                onClick={handleDownloadCardPDF}
                className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white flex items-center space-x-1.5 shadow-lg shadow-emerald-900/20 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>
          </div>

          {/* CARD CONTAINER (PRINTABLE) */}
          <div className="max-w-xl mx-auto">
            <div id="printable-membership-card" className="bg-gradient-to-br from-[#006633] via-emerald-900 to-emerald-950 rounded-3xl p-1 shadow-2xl border-4 border-amber-400/80 text-white overflow-hidden relative">
              
              {/* Card Gold Header Ribbon */}
              <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 text-slate-950 px-4 py-1.5 flex items-center justify-between text-[11px] font-black uppercase tracking-wider rounded-t-2xl">
                <span>PMLN DISTRICT SHIGAR • GILGIT BALTISTAN</span>
                <span className="font-mono">{memNumber}</span>
              </div>

              {/* Card Inner White Container */}
              <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-5 m-2 rounded-2xl space-y-4 relative">
                
                {/* Header with Logos */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <img
                      src={APP_IMAGES.pmlnLogo}
                      alt="PMLN Shigar"
                      className="w-10 h-10 rounded-full object-cover border border-emerald-600"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <div className="font-serif-editorial font-black text-sm text-[#006633] dark:text-emerald-400 leading-tight">
                        PAKISTAN MUSLIM LEAGUE NAWAZ
                      </div>
                      <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">
                        {isVolunteer ? 'Official Volunteer Accreditation Pass' : 'Official Membership Card'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center space-x-1 bg-emerald-100 dark:bg-emerald-950 text-[#006633] dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verified</span>
                    </span>
                  </div>
                </div>

                {/* Member Details & Photo */}
                <div className="flex items-start gap-4">
                  
                  {/* Photo Badge */}
                  <div className="w-24 h-28 rounded-xl bg-slate-100 dark:bg-slate-800 border-2 border-[#006633] overflow-hidden shrink-0 flex items-center justify-center shadow-md relative">
                    {currentMemberUser.photoUrl ? (
                      <img
                        src={currentMemberUser.photoUrl}
                        alt={currentMemberUser.fullName}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <User className="w-10 h-10 text-slate-400" />
                    )}
                    <div className="absolute bottom-0 inset-x-0 bg-[#006633] text-white text-[8px] font-bold text-center py-0.5 uppercase">
                      {isVolunteer ? 'Volunteer' : 'Member'}
                    </div>
                  </div>

                  {/* Info Column */}
                  <div className="flex-1 space-y-1.5 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block leading-none">Full Name</span>
                      <span className="font-extrabold text-sm text-[#006633] dark:text-emerald-400 uppercase">
                        {currentMemberUser.fullName}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px]">
                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Father / Husband</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {('fatherName' in currentMemberUser ? (currentMemberUser as any).fatherName : 'N/A')}
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">CNIC #</span>
                        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                          {('cnic' in currentMemberUser ? (currentMemberUser as any).cnic : 'Verified')}
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Union Council / Village</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {currentMemberUser.village}, Shigar
                        </span>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Contact</span>
                        <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                          {currentMemberUser.mobile}
                        </span>
                      </div>
                    </div>

                    <div className="pt-1">
                      <span className="text-[9px] font-bold text-slate-400 uppercase block leading-none">Portal Username</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                        {currentMemberUser.username || 'pmlnmediacellshigar.online'}
                      </span>
                    </div>
                  </div>

                </div>

                {/* Card Footer: Signature & Hologram */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-3 flex items-end justify-between text-[10px]">
                  <div className="space-y-0.5">
                    <div className="font-serif italic font-bold text-[#006633] dark:text-emerald-400 text-xs">
                      Muhammad Tahir Unahar Shigri
                    </div>
                    <div className="text-[9px] font-bold text-slate-500 dark:text-slate-400">
                      President, PMLN District Shigar
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-300">
                      <QrCode className="w-7 h-7 text-[#006633] dark:text-emerald-400" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PROFILE & PHOTO EDIT */}
      {/* ========================================================= */}
      {activeTab === 'profile' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
          
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
              <User className="w-5 h-5 text-[#006633] dark:text-emerald-400" />
              <span>Update Your Member Profile & Photo</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Customize your profile information, change your official card photo, and write a bio.
            </p>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-6">
            
            {/* Photo upload section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              
              <div className="w-24 h-24 rounded-2xl bg-white dark:bg-slate-900 border-2 border-emerald-500 overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <User className="w-10 h-10 text-slate-400" />
                )}
              </div>

              <div className="flex-1 space-y-2 text-center sm:text-left">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">Profile Photo</h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Upload a clear portrait from your device or enter a web link. This photo will appear on your official digital ID card.
                </p>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center space-x-1.5 transition-colors"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload from Device</span>
                  </button>

                  {profilePhoto && (
                    <button
                      type="button"
                      onClick={() => setProfilePhoto('')}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-red-100 hover:text-red-700 text-slate-700 dark:text-slate-300 text-xs font-bold transition-colors"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>

            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Father's Name</label>
                <input
                  type="text"
                  value={profileFather}
                  onChange={(e) => setProfileFather(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Contact</label>
                <input
                  type="tel"
                  required
                  value={profileMobile}
                  onChange={(e) => setProfileMobile(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Village / Union Council</label>
                <input
                  type="text"
                  value={profileVillage}
                  onChange={(e) => setProfileVillage(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Occupation</label>
                <input
                  type="text"
                  value={profileOccupation}
                  onChange={(e) => setProfileOccupation(e.target.value)}
                  placeholder="e.g. Student, Teacher, Entrepreneur"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Image URL (Alternative to file upload)</label>
                <input
                  type="url"
                  value={profilePhoto}
                  onChange={(e) => setProfilePhoto(e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              {/* SECTION: MEMBER PORTAL LOGIN CREDENTIALS */}
              <div className="sm:col-span-2 p-4 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-2xl border-2 border-emerald-500/30 dark:border-emerald-800/50 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-900 dark:text-emerald-300">
                  <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="text-xs font-black uppercase tracking-wider">
                    Member Portal Login Credentials
                  </h4>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Your official portal Username ID and Password. You can edit them below to update your login credentials.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Portal Login ID / Username
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={profileUsername}
                        onChange={(e) => setProfileUsername(e.target.value)}
                        placeholder="e.g. member@pmlnmediacellshigar.online"
                        className="w-full pl-9 pr-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-mono font-bold text-emerald-900 dark:text-emerald-300 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Portal Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type={showProfilePassword ? "text" : "password"}
                        value={profilePassword}
                        onChange={(e) => setProfilePassword(e.target.value)}
                        placeholder="Enter your portal password..."
                        className="w-full pl-9 pr-9 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl text-xs font-mono font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowProfilePassword(!showProfilePassword)}
                        className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {showProfilePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">About Me / Political Statement</label>
                <textarea
                  rows={3}
                  value={profileBio}
                  onChange={(e) => setProfileBio(e.target.value)}
                  placeholder="Tell us about your active role and commitment to PMLN Shigar..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-lg shadow-emerald-900/20 transition-all flex items-center space-x-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </button>
            </div>

          </form>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: SUBMIT POST / NEWS (ADMIN APPROVAL WORKFLOW) */}
      {/* ========================================================= */}
      {activeTab === 'post' && (
        <div className="space-y-8">
          
          {/* Admin Approval Notice Callout */}
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl flex items-start space-x-3 text-xs text-emerald-950 dark:text-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold block">Official Admin Approval Workflow</strong>
              <span>
                All posts and news submitted by party members are sent to the <strong>PMLN Shigar Super Admin</strong> for review. Once approved by the administration, your post will be automatically published on the public News & Updates portal!
              </span>
            </div>
          </div>

          {/* New Post Form */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-[#006633] dark:text-emerald-400" />
                <span>Write a New Community Article or Event Story</span>
              </h2>
            </div>

            <form onSubmit={handleSubmitPost} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Post Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder="e.g. PMLN Shigar Youth Wing hosts cleanliness drive in Gulabpur"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as any)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                  >
                    <option value="Political Activities">Political Activities</option>
                    <option value="Events">Events</option>
                    <option value="Development Projects">Development Projects</option>
                    <option value="Press Releases">Press Releases</option>
                    <option value="Announcements">Announcements</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Short Summary / Teaser</label>
                <input
                  type="text"
                  value={postSummary}
                  onChange={(e) => setPostSummary(e.target.value)}
                  placeholder="One sentence summary of the news story..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Article Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Write detailed event highlights, quotes, attendees, and key decisions..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  value={postImage}
                  onChange={(e) => setPostImage(e.target.value)}
                  placeholder="Paste image link or leave empty for default"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-lg shadow-emerald-900/20 transition-all flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Post for Admin Review</span>
                </button>
              </div>

            </form>
          </div>

          {/* Submissions List */}
          <div className="space-y-4">
            <h3 className="font-black text-base text-slate-900 dark:text-white">
              My Submitted Posts ({myPosts.length})
            </h3>

            {myPosts.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500 space-y-2">
                <FileText className="w-8 h-8 mx-auto text-slate-400" />
                <p>You have not submitted any posts yet. Use the form above to submit your first story!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {myPosts.map((post) => (
                  <div 
                    key={post.id} 
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                          {post.category}
                        </span>
                        <span className="text-[11px] text-slate-400">{post.submittedDate}</span>
                      </div>

                      {/* Status Tag */}
                      <div>
                        {post.status === 'Pending' && (
                          <span className="inline-flex items-center space-x-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5" />
                            <span>Pending Admin Review</span>
                          </span>
                        )}
                        {post.status === 'Approved' && (
                          <span className="inline-flex items-center space-x-1 bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold px-3 py-1 rounded-full">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approved & Published</span>
                          </span>
                        )}
                        {post.status === 'Rejected' && (
                          <span className="inline-flex items-center space-x-1 bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300 text-xs font-bold px-3 py-1 rounded-full">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Needs Revision</span>
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-black text-sm text-slate-900 dark:text-white">{post.title}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">{post.summary}</p>
                    </div>

                    {post.status === 'Approved' && (
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                        <span>🎉 This post is live on the public website!</span>
                        <button
                          onClick={() => setCurrentPage('news')}
                          className="font-bold underline hover:text-emerald-950 dark:hover:text-emerald-100"
                        >
                          View in News Feed
                        </button>
                      </div>
                    )}

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => deleteMemberPost(post.id)}
                        className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center space-x-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete Draft</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 4: DIRECT MESSAGE TO SOCIAL MEDIA TEAM HEAD */}
      {/* ========================================================= */}
      {activeTab === 'messages' && (
        <div className="space-y-8">
          
          {/* Media Cell Contact Info */}
          <div className="bg-gradient-to-r from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/30 border border-emerald-400 flex items-center justify-center text-emerald-300 shrink-0">
                <Send className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-black">District Shigar Social Media & Press Cell</h3>
                <p className="text-xs text-emerald-200 mt-0.5">
                  Direct communication channel with Muhammad Tahir Unahar Shigri & District Media Coordinators.
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-emerald-300 font-mono">
              <span className="block font-bold text-white">Official Secretariat Line</span>
              <span>media@pmlnmediacellshigar.online</span>
            </div>
          </div>

          {/* New Message Composer */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-3">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#006633] dark:text-emerald-400" />
                <span>Send Message to Social Media Team Head</span>
              </h2>
            </div>

            <form onSubmit={handleSendMessage} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject / Topic <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={msgSubject}
                  onChange={(e) => setMsgSubject(e.target.value)}
                  placeholder="e.g. Social media coverage for upcoming Union Council meeting in Marapi"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={msgBody}
                  onChange={(e) => setMsgBody(e.target.value)}
                  placeholder="Type your message, suggestions, rally video links, or media questions here..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 font-semibold leading-relaxed"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl font-bold text-xs bg-[#006633] hover:bg-[#004d26] text-white shadow-lg shadow-emerald-900/20 transition-all flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message to Media Cell</span>
                </button>
              </div>
            </form>
          </div>

          {/* Conversation History */}
          <div className="space-y-4">
            <h3 className="font-black text-base text-slate-900 dark:text-white">
              Message History ({myMessages.length})
            </h3>

            {myMessages.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-500 space-y-2">
                <Send className="w-8 h-8 mx-auto text-slate-400" />
                <p>No messages sent yet. Use the composer above to communicate directly with the Social Media Team Head.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                      <div>
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{msg.subject}</span>
                        <div className="text-[11px] text-slate-400">{msg.date}</div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
                        {msg.status}
                      </span>
                    </div>

                    <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs text-slate-700 dark:text-slate-300">
                      {msg.message}
                    </div>

                    {msg.reply && (
                      <div className="p-4 bg-emerald-500/10 border-l-4 border-[#006633] rounded-r-xl space-y-1 text-xs">
                        <div className="flex items-center space-x-1.5 text-[#006633] dark:text-emerald-400 font-bold">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Official Reply from Social Media Team Head:</span>
                        </div>
                        <p className="text-slate-800 dark:text-slate-200 leading-relaxed pl-5">
                          "{msg.reply}"
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
