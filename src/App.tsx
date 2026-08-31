import React from 'react';
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
import { AboutPage } from './pages/AboutPage';
import { LeaderProfilePage } from './pages/LeaderProfilePage';
import { NewsPage } from './pages/NewsPage';
import { EventsPage } from './pages/EventsPage';
import { GalleryPage } from './pages/GalleryPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ManifestoPage } from './pages/ManifestoPage';
import { JoinPartyPage } from './pages/JoinPartyPage';
import { VolunteerPage } from './pages/VolunteerPage';
import { DonationPage } from './pages/DonationPage';
import { MediaPage } from './pages/MediaPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { MemberPortalPage } from './pages/MemberPortalPage';

const MainContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'leader':
        return <LeaderProfilePage />;
      case 'news':
        return <NewsPage />;
      case 'events':
        return <EventsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'manifesto':
        return <ManifestoPage />;
      case 'join':
        return <JoinPartyPage />;
      case 'volunteer':
        return <VolunteerPage />;
      case 'donate':
        return <DonationPage />;
      case 'media':
        return <MediaPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminDashboard />;
      case 'member-portal':
        return <MemberPortalPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-emerald-600 selection:text-white transition-colors duration-300">
      <div>
        <Ticker />
        <Header />
        <main className="animate-in fade-in duration-300">
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
