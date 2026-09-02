import React, { Suspense, lazy } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Ticker } from './components/Ticker';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { WhatsAppButton } from './components/WhatsAppButton';
import { BackToTop } from './components/BackToTop';
import { SearchModal } from './components/SearchModal';
import { MembershipCardModal } from './components/MembershipCardModal';
import { HomePage } from './pages/HomePage';

// Lazy load secondary pages to drastically reduce initial bundle size for weak/2G/3G connections
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const LeaderProfilePage = lazy(() => import('./pages/LeaderProfilePage').then(m => ({ default: m.LeaderProfilePage })));
const NewsPage = lazy(() => import('./pages/NewsPage').then(m => ({ default: m.NewsPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then(m => ({ default: m.EventsPage })));
const GalleryPage = lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const ManifestoPage = lazy(() => import('./pages/ManifestoPage').then(m => ({ default: m.ManifestoPage })));
const JoinPartyPage = lazy(() => import('./pages/JoinPartyPage').then(m => ({ default: m.JoinPartyPage })));
const VolunteerPage = lazy(() => import('./pages/VolunteerPage').then(m => ({ default: m.VolunteerPage })));
const DonationPage = lazy(() => import('./pages/DonationPage').then(m => ({ default: m.DonationPage })));
const MediaPage = lazy(() => import('./pages/MediaPage').then(m => ({ default: m.MediaPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const MemberPortalPage = lazy(() => import('./pages/MemberPortalPage').then(m => ({ default: m.MemberPortalPage })));

// Lightweight Fast Skeleton Loader for Low-Bandwidth Networks
const FastPageLoader: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 space-y-4">
    <div className="w-12 h-12 rounded-full border-3 border-emerald-200 border-t-emerald-700 animate-spin"></div>
    <div className="text-center space-y-1">
      <p className="text-sm font-bold text-[#006633] dark:text-emerald-400 uppercase tracking-widest">PMLN Shigar</p>
      <p className="text-xs text-slate-500 dark:text-slate-400">Loading page content smoothly...</p>
    </div>
  </div>
);

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <AboutPage />
          </Suspense>
        );
      case 'leader':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <LeaderProfilePage />
          </Suspense>
        );
      case 'news':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <NewsPage />
          </Suspense>
        );
      case 'events':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <EventsPage />
          </Suspense>
        );
      case 'gallery':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <GalleryPage />
          </Suspense>
        );
      case 'projects':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <ProjectsPage />
          </Suspense>
        );
      case 'manifesto':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <ManifestoPage />
          </Suspense>
        );
      case 'join':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <JoinPartyPage />
          </Suspense>
        );
      case 'volunteer':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <VolunteerPage />
          </Suspense>
        );
      case 'donate':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <DonationPage />
          </Suspense>
        );
      case 'media':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <MediaPage />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <ContactPage />
          </Suspense>
        );
      case 'admin':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <AdminDashboard />
          </Suspense>
        );
      case 'member-portal':
        return (
          <Suspense fallback={<FastPageLoader />}>
            <MemberPortalPage />
          </Suspense>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-emerald-600 selection:text-white transition-colors duration-300">
      <div>
        <Ticker />
        <Header />
        <main className="animate-in fade-in duration-200">
          {renderPage()}
        </main>
      </div>

      <Footer />
      <ToastContainer />
      <WhatsAppButton />
      <BackToTop />
      <SearchModal />
      <MembershipCardModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
